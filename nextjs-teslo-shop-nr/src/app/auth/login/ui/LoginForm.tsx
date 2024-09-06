"use client";

import { authenticate } from "@/actions";
import { titleFont } from "@/config/fonts";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { IoInformationOutline } from "react-icons/io5";

export function LoginForm() {
  const [state, dispatch] = useFormState(authenticate, undefined);
  // const router = useRouter()

  // console.log(state);
  useEffect(() => {
    if(state==='Success') {
      // router.replace('/')
      window.location.replace('/')
    }
  },[state])

  return (
    <form action={dispatch} className="flex flex-col gap-4">
      <legend className={`${titleFont.className} font-bold text-3xl`}>
        Ingresar
      </legend>
      <label htmlFor="correo">
        Correo electronico
        <input
          type="email"
          name="email"
          className="block w-full p-3 bg-gray-400 rounded-md"
        />
      </label>
      <label htmlFor="password">
        Contraseña
        <input
          type="password"
          name="password"
          className="block w-full p-3 bg-gray-400 rounded-md"
        />
      </label>

      <div
        className="flex h-4 items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {state === "CredentialsSignin" && (
          <>
            <IoInformationOutline className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">Credenciales incorrectas</p>
          </>
        )}
      </div>

      <LoginButton />

      <div className="separator flex gap-2 items-center">
        <div className="line flex-1 border border-gray-400 h-[1px] bg-gray-400"></div>
        <div className="circle border border-gray-400 p-2 rounded-full"></div>
        <div className="line flex-1 border border-gray-400 h-[1px] bg-gray-400"></div>
      </div>
      <Link
        href="/auth/new-account"
        className="text-center text-gray-600 text-sm hover:underline"
      >
        Crea una nueva cuenta
      </Link>
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button 

      className={
        clsx(
          "w-full p-3",
          {
            "btn-primary": !pending,
            "btn-disabled": pending
          }
        )
      } 
      disabled={pending}
      type="submit" 
      aria-disabled={pending}
    >
      Ingresar
    </button>
  );
}
