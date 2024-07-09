import { signInEmailPassword } from "@/auth/actions/auth-actions";
import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { AuthOptions, SessionStrategy } from "next-auth";
import { Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  // Configure adapter
  adapter: PrismaAdapter(prisma) as Adapter,

  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),

    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Correo Electronico", type: "email", placeholder: "user@gmail.com" },
        password: { label: "Contraseña", type: "password", placeholder: "******" },
      },
      async authorize(credentials, req) {

        const email = credentials?.email ?? ''
        const password = credentials?.password ?? ''

        const user = await signInEmailPassword(email, password)

        // If no error and we have user data, return it
        if (user) {
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),

    // ...add more providers here
  ],

  // NOTA: todo esto es en el backend
  // para indicarle que la sesion este manejada con jwt
  session: {
    strategy: "jwt" as SessionStrategy,
  },
  // callbacks para tener como middlewares
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log(user);
      return true;
    },

    // 1ro se ejecuta este
    async jwt({ token, user, account, profile }) {
      // aqui podemos volver a firmar el token
      console.log("token in jwt");
      console.log(token);

      // para verificar el email
      const dbUser = await prisma.user.findUnique({
        where: { email: token.email ?? "no-email" },
      });
      if (dbUser?.isActive === false) {
        throw new Error("Usuario no esta activo");
      }

      token.role = dbUser?.role ?? "no-role";
      token.id = dbUser?.id ?? "no-id";

      return token;
    },
    // 2do se ejecuta este
    async session({ session, token, user }) {
      // aqui podriamos modificar los valores en la session
      console.log("token in session");
      console.log(token);

      if (session && session.user) {
        session.user.role = token.role;
        session.user.id = token.id;
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
