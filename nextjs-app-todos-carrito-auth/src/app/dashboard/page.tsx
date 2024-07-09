import { WidgetItem } from "@/components/WidgetItem";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        <WidgetItem title="Usuario Conectado Server-Side">
          <div className="flex flex-col gap-2">
            <span>{session.user?.id}</span>
            <span>{session.user?.name}</span>
            <span>{session.user?.email}</span>
            <img
              src={session.user?.image}
              alt="Imagen del usuario"
              className="w-full block h-auto"
            />
            <p>{JSON.stringify(session.user)}</p>
          </div>
        </WidgetItem>
      </div>
    </>
  );
}
