import { Title } from "@/components";
import Link from "next/link";
import { IoCardOutline } from "react-icons/io5";

export default function OrdersPage() {
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
                  <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      1
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      Mark
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      <span className="flex gap-2 items-center text-green-700">
                        <IoCardOutline size={20} />
                        Pagado
                      </span>
                    </td>
                    <td className="text-sm text-blue-700 font-light px-6 py-4 whitespace-nowrap">
                      <Link 
                        href={`/orders/${123}`}
                        className="underline"
                      >
                        Ver orden
                      </Link>
                    </td>
                  </tr>
                  <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      2
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      Mark
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      <span className="flex gap-2 items-center text-red-500">
                        <IoCardOutline size={20} />
                        No Pagado
                      </span>
                    </td>
                    <td className="text-sm text-blue-700 font-light px-6 py-4 whitespace-nowrap">
                      <Link 
                        href={`/orders/${123}`}
                        className="underline"
                      >
                        Ver orden
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
