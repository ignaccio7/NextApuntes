"use client";
import { useUIStore } from "@/store";
import clsx from "clsx";
import Link from "next/link";
import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline,
} from "react-icons/io5";

interface Props {}

export function Sidebar({}: Props) {
  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
  const closeMenu = useUIStore((state) => state.closeSideMenu);

  return (
    <div className="">
      {/* Background black */}
      {isSideMenuOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30" />
      )}
      {/* Blur */}
      {isSideMenuOpen && (
        <div className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm" />
      )}

      {/* NavBar - SideMenu */}
      <nav 
        className={
          clsx("fixed p-5 right-0 top-0 w-[400px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
            {
              "translate-x-full": !isSideMenuOpen
            }
          )
        }>
        {/* Boton para cerrar el menu */}
        <IoCloseOutline
          size={30}
          className="absolute top-5 right-5 cursor-pointer"
          onClick={() => closeMenu()}
        />

        {/* Input Search */}
        <div className="relative mt-10">
          <IoSearchOutline size={20} className="absolute top-2 left-2" />
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full bg-gray-50 rounded pl-10 py-1 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Options Menu */}
        <Link
          href="/profile"
          className="flex items-center w-full hover:bg-gray-200 p-2 rounded mt-5"
        >
          <IoPersonOutline size={20} />
          <span className="ml-3 text-xl">Perfil</span>
        </Link>

        <Link
          href="/orders
          "
          className="flex items-center w-full hover:bg-gray-200 p-2 rounded mt-5"
        >
          <IoTicketOutline size={20} />
          <span className="ml-3 text-xl">Ordenes</span>
        </Link>

        <Link
          href="/auth/login"
          className="flex items-center w-full hover:bg-gray-200 p-2 rounded mt-5"
        >
          <IoLogInOutline size={20} />
          <span className="ml-3 text-xl">Ingresar</span>
        </Link>

        <Link
          href="/auth/logout"
          className="flex items-center w-full hover:bg-gray-200 p-2 rounded mt-5"
        >
          <IoLogOutOutline size={20} />
          <span className="ml-3 text-xl">Salir</span>
        </Link>

        {/* Line Separator */}
        <div className="w-full h-px bg-gray-300 my-10" />

        <Link
          href="/"
          className="flex items-center w-full hover:bg-gray-200 p-2 rounded mt-5"
        >
          <IoShirtOutline size={20} />
          <span className="ml-3 text-xl">Productos</span>
        </Link>

        <Link
          href="/"
          className="flex items-center w-full hover:bg-gray-200 p-2 rounded mt-5"
        >
          <IoTicketOutline size={20} />
          <span className="ml-3 text-xl">Ordenes</span>
        </Link>

        <Link
          href="/"
          className="flex items-center w-full hover:bg-gray-200 p-2 rounded mt-5"
        >
          <IoPeopleOutline size={20} />
          <span className="ml-3 text-xl">Usuarios</span>
        </Link>
      </nav>
    </div>
  );
}
