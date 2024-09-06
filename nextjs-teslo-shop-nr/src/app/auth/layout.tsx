import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import React from "react"

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}){

  const session = await auth()

  console.log("La sesion es:");
  console.log({session})

  // para redireccionar al inicio si esque ya hubiera iniciado sesion
  if(session?.user){
    redirect('/')
  }

  return(
    <main className="min-h-screen w-full flex justify-center items-center">
      {children}
    </main>
  )
}