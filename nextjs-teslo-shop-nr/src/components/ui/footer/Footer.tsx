import { titleFont } from "@/config/fonts"
import Link from "next/link"

interface Props {
}

export function Footer({ }:Props) {
  return(
    <footer className="flex justify-center py-8 items-center gap-4 text-gray-600">
      <Link href="/" className="font-bold">
        <span className={`${titleFont.className}`}>
          Teslo
        </span> | Shop © { new Date().getFullYear() }
      </Link>
      <Link href="/" className="hover:underline">
        Tus Ordenes
      </Link>
      <Link href="/" className="hover:underline">
        Ingresar
      </Link>
    </footer>
  )
}