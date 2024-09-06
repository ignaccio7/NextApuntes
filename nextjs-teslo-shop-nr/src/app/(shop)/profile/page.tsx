import { auth } from "@/auth.config";
import { Title } from "@/components";
import { redirect } from "next/navigation";

export default async function Profile() {
  const session = await auth();

  // if(!session?.user) redirect('auth/login?returnTo=/profile')
  if (!session?.user) redirect("auth/login");

  return (
    <>
      <main className="max-w-[1200px] m-auto p-">
        <Title title="Perfil" subtitle="Datos del usuario" />
        <pre>{JSON.stringify(session.user, null, 2)}</pre>
        <h3 className="text-3xl font-bold">{session.user.role}</h3>
      </main>
    </>
  );
}
