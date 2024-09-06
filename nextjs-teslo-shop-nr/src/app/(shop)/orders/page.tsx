// Para que siempre sea dinamico de lado del servidor
export const revalidate = 0;

import { getOrdersByUser } from "@/actions";
import { Title } from "@/components";
import Link from "next/link";
import { redirect } from "next/navigation";
import { IoCardOutline } from "react-icons/io5";

export default async function OrdersPage() {
  const { ok, orders = [] } = await getOrdersByUser();

  if (!ok) redirect("/auth/login");

  return (
    <div className="max-w-[1200px] m-auto px-5 mb-10">
      <Title title="Orders" />

      <div className="flex flex-col">
        <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
          <div className="py-2 inline-block min-w-full">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-gray-900 text-white border-b">
                  <tr>
                    <th
                      scope="col"
                      className="text-sm font-medium px-6 py-4 text-left"
                    >
                      ID #
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium px-6 py-4 text-left"
                    >
                      Nombre completo
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium px-6 py-4 text-left"
                    >
                      Estado
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium px-6 py-4 text-left"
                    >
                      Opciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => {
                    return (
                      <tr
                        key={order.id}
                        className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {order.id.split("-").at(-1)}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {`${order.OrderAddress?.firstName} ${order.OrderAddress?.lastName}`}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {order.isPaid ? (
                            <span className="flex gap-2 items-center text-green-700">
                              <IoCardOutline size={20} />
                              Pagado
                            </span>
                          ) : (
                            <span className="flex gap-2 items-center text-red-500">
                              <IoCardOutline size={20} />
                              No Pagado
                            </span>
                          )}
                        </td>
                        <td className="text-sm text-blue-700 font-light px-6 py-4 whitespace-nowrap">
                          <Link href={`/orders/${order.id}`} className="underline">
                            Ver orden
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
