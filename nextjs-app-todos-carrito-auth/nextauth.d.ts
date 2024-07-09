// nextauth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";

interface IUser extends DefaultUser {
  // roles del usuario
  role?: string;
  isActive?: boolean
  // cualquier otro rol que queramos
}

declare module "next-auth" {
  interface User extends IUser{}

  interface Session {
    user?: User
  }
}

declare module "next-auth/jwt" {
  interface JWT extends IUser {}
}