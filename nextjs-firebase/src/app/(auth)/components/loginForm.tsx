"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";

import * as zod from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "@/lib/firebase";
import { useState } from "react";

export default function LoginForm() {

  const [isLoding, setIsLoding] = useState(false)

  const loginFormSchema = zod.object({
    email: zod.string().email("Ingresa un correo electronico valido").min(1, "Ingresa un correo electronico valido"),
    password: zod.string().min(6, "La contraseña debe tener al menos 6 caracteres")
  })

  const form = useForm<zod.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const { register, handleSubmit, formState } = form
  const { errors } = formState

  const onSubmit = async (user: zod.infer<typeof loginFormSchema>) => {
    console.log(user);    
    setIsLoding(true)
    try {

      const response = await signIn(user.email, user.password)
      console.log(response);
      
    } catch (error) {
      console.log(error);
      
    }finally {
      setIsLoding(false)
    }
  }

  return(
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 px-4 min-w-sm">
    <div className="group-form flex flex-col gap-2">
      <Label>Correo electronico</Label>
      <Input
        {...register("email")}
        type="email"
        placeholder="admin@example.com"
        />
        <p className="form-error">{errors.email?.message}</p>
    </div>
    <div className="group-form flex flex-col gap-2">
      <Label>Constraseña</Label>
      <Input
        {...register("password")}
        type="password"
        placeholder="****"
        />
        <p className="form-error">{errors.password?.message}</p>
    </div>
    <div className="group-form text-end">
      <Link
        href={"forgot-password"}
        className="text-sm text-muted-foreground"
      >
        Olvidaste tu contraseña?
      </Link>
    </div>
    <Button
      type="submit"
      className="w-full"
      disabled={isLoding}
    >
      {
        isLoding ?
        (
          <div role="status">
              <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              <span className="sr-only">Enviando...</span>
          </div>
          )
        : "Acceder"
      }
    </Button>
    <div className="group-form text-sm text-muted-foreground">
      No tienes cuenta?  
      <Link
        href={"sign-up"}
      >
        Registrate
      </Link>
    </div>
  </form>
  )
}