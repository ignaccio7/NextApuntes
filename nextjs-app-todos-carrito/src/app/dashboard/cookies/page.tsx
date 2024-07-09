import { TabBar } from "@/app/todos/components";

// Como leer las cokkies desde el servidor
import { cookies } from "next/headers";

export const metadata = {
  title: "Cookies Page",
  description: "Seo Cookies",
};

export default function CookiesPage() {

  // como leemos las cookies
  const cookieStore = cookies()
  const cookieTab = cookieStore.get('selectedTab')?.value ?? '1'

  return (
    <div>
      <h1>Page Cookies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <span className="text-3xl">TABS</span>
          <TabBar currentTab={+cookieTab} />
        </div>
      </div>
    </div>
  );
}
