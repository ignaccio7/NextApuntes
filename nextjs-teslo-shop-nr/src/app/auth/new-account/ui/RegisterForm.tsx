"use client";
import { login, register as registerUser } from "@/actions";
import { titleFont } from "@/config/fonts";
import { clsx } from "clsx";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface FormInputs {
  name: string;
  email: string;
  password: string;
}

export function RegisterForm() {

  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit = async (data: FormInputs) => {
    setError("");
    const { name, email, password } = data;
    console.log({ name, email, password });

    //ServerAction
    const response = await registerUser(name, email, password);

    if (!response.ok) {
      setError(response.message);
      return;
    }

    console.log({ response });
    await login(email.toLowerCase(), password);

    window.location.replace('/')
    
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <legend className={`${titleFont.className} font-bold text-3xl`}>
        Registrate
      </legend>
      <label htmlFor="nombre">
        Nombre Completo
        <input
          type="text"
          className={clsx("block w-full p-3 bg-gray-400 rounded-md", {
            "border border-red-500": !!errors.name,
          })}
          {...register("name", { required: true })}
          autoFocus
        />
      </label>
      <label htmlFor="correo">
        Correo electronico
        <input
          type="email"
          className={clsx("block w-full p-3 bg-gray-400 rounded-md", {
            "border border-red-500": !!errors.email,
          })}
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
        />
      </label>
      <label htmlFor="password">
        Contraseña
        <input
          type="password"
          className={clsx("block w-full p-3 bg-gray-400 rounded-md", {
            "border border-red-500": !!errors.password,
          })}
          {...register("password", { required: true, minLength: 6 })}
        />
      </label>
      {error && (
        <span className="text-xl font-bold text-center text-red-400">
          {error}
        </span>
      )}
      <button className="btn-primary w-full p-3">Registrar</button>
      <div className="separator flex gap-2 items-center">
        <div className="line flex-1 border border-gray-400 h-[1px] bg-gray-400"></div>
        <div className="circle border border-gray-400 p-2 rounded-full"></div>
        <div className="line flex-1 border border-gray-400 h-[1px] bg-gray-400"></div>
      </div>
      <Link
        href="/auth/login"
        className="text-center text-gray-600 text-sm hover:underline"
      >
        Ingresar
      </Link>
    </form>
  );
}
