import NavBar from "../components/NavBar.jsx";

export const metadata = {
  title: 'Tienda Page'
}

export default function LayoutStore({children}){  

  const links = [
    { href: "store", name: "Store index" },
    { href: "store/categories", name: "Categirues" }
  ];

  return(
    <>
      <NavBar links={links} />
      {children}
    </>
  )
}