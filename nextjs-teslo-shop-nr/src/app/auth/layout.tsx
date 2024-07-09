import React from "react"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}){
  return(
    <main className="min-h-screen w-full flex justify-center items-center">
      {children}
    </main>
  )
}