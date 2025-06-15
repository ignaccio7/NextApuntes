"use client"
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/firebase";

export default function Dashboard () {
  return (
    <>
      <header>
        <nav>
          <Button
            onClick={() => signOut()}
          >Salir</Button>
        </nav>
      </header>
      <h1>Dashboard</h1>
    </>
  )
}