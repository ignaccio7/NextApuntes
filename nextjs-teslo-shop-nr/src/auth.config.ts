import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import z from "zod";
import prisma from "./lib/prisma";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/new-account",
  },

  callbacks: {
    // los callbacks serian como nuestros middlewares
    jwt({ token, user }) {
      console.log("Callback JWT");
      console.log({ token, user });

      // Para agregar informacion del usuario en el token
      if (user) {
        token.data = user;
      }

      return token;
    },

    session({ session, token, user }) {
      console.log("Callback session");
      console.log({ session, token, user });

      session.user = token.data as any;

      return session;
    },

    authorized({ auth, request: { nextUrl } }) {
      // const isLoggedIn = !!auth?.user;
      // const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      // if (isOnDashboard) {
      //   if (isLoggedIn) return true;
      //   return false; // Redirect unauthenticated users to login page
      // } else if (isLoggedIn) {
      //   return Response.redirect(new URL('/dashboard', nextUrl));
      // }
      console.log("Auth in autorized");
      console.log(auth);
      const isLoggedIn = !!auth?.user;
      console.log(isLoggedIn);
      const isOnDashboard = nextUrl.pathname.startsWith("/orders");
      console.log(isOnDashboard);
      console.log(nextUrl);
      

      // AQUI DEBERIAMOS VALIDAR NUESTRAS RUTAS
      if (isOnDashboard && !isLoggedIn) {
        return Response.redirect(new URL("/auth/login", nextUrl));
      }
      return true
    },
  },

  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        console.log("AuthConfig");
        console.log({ email, password });

        // BUscar el correo
        const user = await prisma.user.findUnique({
          where: {
            email: email.toLowerCase(),
          },
        });

        if (!user) return null;

        // COmparar contraseñas
        if (!bcrypt.compareSync(password, user.password)) return null;

        // Regresar el usuario
        const { password: _, ...rest } = user;

        return rest;
        //return null //<- null diria que no esta autenticado
      },
    }),
  ],
});
