import { titleFont } from "@/config/fonts";
import Link from "next/link";

export default function Home() {
  return (
    <form action="" className="flex flex-col gap-4">
      <legend className={`${titleFont.className} font-bold text-3xl`}>Ingresar</legend>
      <label htmlFor="correo">
        Correo electronico
        <input type="email" className="block w-full p-3 bg-gray-400 rounded-md"/>
      </label>
      <label htmlFor="password">
        Contraseña
        <input type="password" className="block w-full p-3 bg-gray-400 rounded-md"/>
      </label>
      <button className="btn-primary w-full p-3">
        Ingresar
      </button>
      <div className="separator flex gap-2 items-center">
        <div className="line flex-1 border border-gray-400 h-[1px] bg-gray-400"></div>
        <div className="circle border border-gray-400 p-2 rounded-full"></div>
        <div className="line flex-1 border border-gray-400 h-[1px] bg-gray-400"></div>
      </div>
      <Link href="/auth/new-account" className="text-center text-gray-600 text-sm hover:underline">
        Crea una nueva cuenta    
      </Link>
    </form>
  );
}
