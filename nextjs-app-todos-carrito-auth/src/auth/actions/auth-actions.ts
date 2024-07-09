import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import prisma from "@/lib/prisma"
import bcrypt from 'bcrypt'
import { getServerSession } from "next-auth"


// para obtener las credenciales de nuesta autenticacion
export async function getUserSessionServer() {
  const session = await getServerSession(authOptions)
  return session?.user
}

export const signInEmailPassword = async (email:string, password:string) => {

  if(!email || !password) return null

  const user = await prisma.user.findUnique({ where: { email } })

  if(!user) {
    const dbUser = await createUser(email, password)
    return dbUser
  }

  if(!bcrypt.compareSync(password, user.password ?? '')) {
    return null
  }
  return user
}

async function createUser(email:string, password:string) {
  const salt = bcrypt.genSaltSync(10);
  const user = await prisma.user.create({
    data:{
      email,
      password: bcrypt.hashSync(password,salt).toString(),
      name: email.split("@")[0]
    }
  })
  return user
}