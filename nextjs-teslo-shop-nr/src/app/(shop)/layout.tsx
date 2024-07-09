import { Footer, Sidebar, TopMenu } from "@/components";
import React from "react";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen w-full flex flex-col">
      <TopMenu />
      <div className="flex-1">
        <Sidebar />
        {children}
      </div>
      <Footer />
    </main>
  );
}
