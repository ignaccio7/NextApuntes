import { auth } from "@/auth.config"
import { redirect } from "next/navigation"

export default async function LayoutCheckout({
  children
}:{
  children:React.ReactNode
}){

  const session = await auth()
  if(!session?.user) redirect('/auth/login')

  return(
    <>
      {children}
    </>
  )
}