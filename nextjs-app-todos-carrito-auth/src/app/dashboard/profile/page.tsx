'use client'

import { useSession } from "next-auth/react";
import { useEffect } from "react"

export default function ProfilePage() {

  const { data: session } = useSession()

  useEffect(() => {
    console.log('clientSide');
    
  }, [])

  return(
    <div>
      <h1>Profile - ClientSide</h1>
      <hr className="mb-4" />

      <div className="flex flex-col gap-2">
        <span>{session?.user?.name ?? 'no name'}</span>
        <span>{session?.user?.email ?? 'no email'}</span>
        <span>{session?.user?.image ?? 'no image'}</span>
        <span>{session?.user?.id ?? 'no id'}</span>
        <span>{session?.user?.role ?? 'no role'}</span>
      </div>

    </div>
  )
}