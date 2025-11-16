// import { Button } from "@/components/ui/button";
// import { signOut } from "@/lib/firebase";
import TopMenu from "@/app/dashboard/components/top-menu"

export const metadata = {
  title: "Dashboard",
  description: 'Gestiona los productos'
}

export default function Dashboard () {
  return (
    <>
          {/* <Button
            onClick={() => signOut()}
          >Salir</Button> */}
      <TopMenu />
      <h1>Dashboard</h1>
    </>
  )
}