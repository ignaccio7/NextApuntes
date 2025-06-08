"use client"

import { createClient } from "@/utils/supabase/client"
import { GithubIcon } from "./icons"
import { type User } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"

export function AuthButtonClient({ session }: { session: User | null }) {

  const router = useRouter()

  const supabase = createClient()

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: 'http://localhost:3000/auth/callback'
      }
    })
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <div className="buttons w-full text-center mt-4">
      {
        !session 
          ?
          (<button onClick={handleSignIn} type="button" className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2">
            <GithubIcon />
            Sign in with Github
          </button>)
          :
          (
            <button type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={handleSignOut}>
            Salir
          </button>)
      }


    </div>
  )
}