import { Metadata } from "next"
import RecoverPasswordForm from "../components/recoverPasswordForm"
// import LoginForm from "./components/loginForm"

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Olvidaste tu contraseña?"
}

export default function AuthPage() {

  return (
    <main className="flex justify-center items-center w-full h-screen grid-cols-2">
      <div className="form basis-md grid place-content-center p-8 border border-gray-300 rounded-xl shadow-xl">
        <h1 className="font-semibold text-3xl text-center mb-2">Olvidaste tu contraseña?
          <small className="block text-sm text-muted-foreground">Recupera tu cuenta te enviaremos un correo</small>
        </h1>
        {/* <LoginForm /> */}
        <RecoverPasswordForm />
      </div>
    </main>
  )
} 