// import Image from "next/image";

import AuthButtonServer from "@/components/auth-button-server";
import TwitterCards from "@/components/TwitterCards";
import TwitterForm from "@/components/TwitterForm";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()    

  if (!user) {
    redirect('/login')
  }
 
  // const { data } = await supabase.from('posts').select('*')
  const { data } = await supabase.
    from('posts')
    .select('*, users(*)')
    // .select('*, users(user,user_name,avatar_url)')

  return (
    <>
      <h1>APP</h1>
      <AuthButtonServer />
      <div className="max-w-3xl mx-auto px-4 py-2">
        <TwitterForm />
      </div>
      <main className="max-w-3xl mx-auto px-4">
        <TwitterCards  data={data ?? []} />
      </main>
      {/* <pre>{JSON.stringify(data, null, 2)} </pre> */}
    </>
  );
}

