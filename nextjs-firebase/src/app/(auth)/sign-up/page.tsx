import { Metadata } from "next"
import LoginRegister from "../components/loginRegister"


export const metadata: Metadata = {
  title: "Sign Up",
  description: "Accede a tu cuenta"
}

export default function RegisterPage() {

  return (
    <main className="flex justify-center items-center w-full h-screen grid-cols-2">
      <div className="form basis-md grow grid place-content-center">
        <h1 className="font-semibold text-3xl text-center mb-2">Registrate
          <small className="block text-sm text-muted-foreground">Ingresa tus datos para crear una cuenta</small>
        </h1>
        <LoginRegister />
      </div>
      <div className="image w-full h-full basis-md grow relative hidden md:block">
        <div className="background bg-auth w-full h-full"></div>
        <div className="absolute inset-0 grid place-content-center text-4xl font-extrabold text-white">Nextjs - Firebase</div>
      </div>
    </main>
  )
} 