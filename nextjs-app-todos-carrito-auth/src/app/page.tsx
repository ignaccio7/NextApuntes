import { redirect } from "next/navigation";

export default function Home() {

  redirect('/dashboard')

  return (
    <main>
      <h1>Inicio de la pagina</h1>
    </main>
  );
}
