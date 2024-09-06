// "use server"
// import { signOut } from "@/auth.config";
import { signOut } from "next-auth/react" // hacemos esto porque mandando el signOut del servidor no recargaba el componente y no era correcto seguir viendo el boton de salir cuando ya no habia usuario logeado

export async function logout () {
  console.log("SALIENDO")
  return(
    signOut()    
  )
}