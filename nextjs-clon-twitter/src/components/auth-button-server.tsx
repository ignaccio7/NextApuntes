import { createClient } from "@/utils/supabase/server";
import { AuthButtonClient } from "./auth-button-client";

export default async function AuthButtonServer() {

  const supabase = await createClient()
  // const { data: { session } } = await supabase.auth.getSession()   <- Inseguro porque no valida la sesion con el token en supabase
  const { data: { user } } = await supabase.auth.getUser()    
  console.log(user);
 
  return (
    <AuthButtonClient session={user} />
  )
}