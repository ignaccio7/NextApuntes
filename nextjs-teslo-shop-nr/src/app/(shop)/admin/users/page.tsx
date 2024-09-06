// Para que siempre sea dinamico de lado del servidor
export const revalidate = 0;

import { getPaginatedUsers } from "@/actions";
import { Title } from "@/components";
import Link from "next/link";
import { redirect } from "next/navigation";
import { IoCardOutline } from "react-icons/io5";
import { UsersTable } from "./UsersTable";

export default async function OrdersPage() {
  const { ok, users = [] } = await getPaginatedUsers();

  if (!ok) redirect("/auth/login");

  return (
    <div className="max-w-[1200px] m-auto px-5 mb-10">
      <Title title="Mantenimiento de usuarios" />

      <div className="flex flex-col">
        <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
          <div className="py-2 inline-block min-w-full">
            <div className="overflow-hidden">
              <UsersTable users={users} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
