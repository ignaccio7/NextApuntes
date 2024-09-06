// Para que siempre sea dinamico de lado del servidor
export const revalidate = 0;

import { getPaginatedOrders, getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductImage, Title } from "@/components";
import Link from "next/link";
import { redirect } from "next/navigation";
import { IoCardOutline } from "react-icons/io5";

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function ProductsPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const {
    products = [],
    currentPage,
    totalPages,
  } = await getPaginatedProductsWithImages({ page });

  if (products.length === 0) redirect("/auth/login");

  return (
    <div className="max-w-[1200px] m-auto px-5 mb-10">
      <Title title="Mantenimiento de Productos" />

      <div className="flex flex-row justify-end">
        <Link href="/admin/product/new" className="btn-primary">
          Nuevo Producto
        </Link>
      </div>

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
                      Imagen
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium px-6 py-4 text-left"
                    >
                      Titulo
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium px-6 py-4 text-left"
                    >
                      Precio
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium px-6 py-4 text-left"
                    >
                      Génereo
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium px-6 py-4 text-left"
                    >
                      Tallas
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => {
                    console.log({ sizes: product.sizes });
                    return (
                      <tr
                        key={product.id}
                        className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          <Link href={`/admin/product/${product.slug}`}>
                            <ProductImage
                              className="w-20 h-20 object-cover rounded-md"
                              url={product.images[0]}
                              alt={`Imagen del producto ${product.title}`}
                            />
                          </Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          <Link href={`/admin/product/${product.slug}`}>
                            {product.title}
                          </Link>
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {product.price}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {product.gender}
                        </td>
                        <td className="text-sm text-gray-700 font-bold px-6 py-4 whitespace-nowrap">
                          {product.sizes.join(",")}
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

      <Pagination totalPages={totalPages} />
    </div>
  );
}
