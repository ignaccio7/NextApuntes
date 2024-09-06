"use client";
import { titleFont } from "@/config/fonts";
import { useCartStore, useUIStore } from "@/store";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";

export function TopMenu() {
  const openMenu = useUIStore((state) => state.openSideMenu);
  const totalItemsIntCart = useCartStore((state) => state.getTotalItems());

  // hacemos esto ya que al mostrar el total de productos del carrito
  // next dara error por la hidratacion(lo que renderiza el servidor es diferente a lo del cliente)
  // esto porque estamos almacenando en el localstorage para eso creamos este estado
  // asi en el effect estara cargado el componente se podria decir y next entiende que todo lo siguiente es de lado del cliente
  const [loaded, setLoaded] = useState(false)

  useEffect(()=>{
    setLoaded(true)
  },[])

  return (
    <nav className="flex flex-row justify-between items-center px-5">
      {/* LOGO */}
      <div>
        <Link href="/">
          <span className={`${titleFont.className} antialiased font-bold`}>
            Teslo
          </span>
          <span> | Shop</span>
        </Link>
      </div>

      {/* CENTER MENU */}
      <div className="hidden sm:block">
        <Link
          href="/category/men"
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-300"
        >
          Hombres
        </Link>
        <Link
          href="/category/women"
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-300"
        >
          Mujeres
        </Link>
        <Link
          href="/category/kid"
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-300"
        >
          Niños
        </Link>
      </div>

      {/* SEARCH, CART, MENU */}
      <div className="flex items-center">
        <Link href="/search" className="m-2">
          <IoSearchOutline className="w-5 h-5" />
        </Link>
        <Link href={
          totalItemsIntCart === 0 && loaded
          ? '/empty'
          : '/cart'
        } className="m-2">
          <div className="relative">
            {loaded && totalItemsIntCart > 0 && (
              <span className="fade-in absolute -top-2 -right-2 text-xs rounded-full px-1 font-bold bg-blue-500 text-white">
                {totalItemsIntCart}
              </span>
            )}
            <IoCartOutline className="w-5 h-5" />
          </div>
        </Link>
        <button
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-300"
          onClick={openMenu}
        >
          Menu
        </button>
      </div>
    </nav>
  );
}
