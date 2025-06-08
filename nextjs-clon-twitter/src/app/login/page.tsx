import AuthButtonServer from "@/components/auth-button-server";

export default function Login() {
  return(
    <div className="flex flex-col items-center justify-center h-screen w-full h-screen">
      <h1 className="text-2xl text-center text-gray-600">Login</h1>
      <AuthButtonServer />
    </div>
  )
}