// para revalidar el cache
export const revalidate = 60  // 60 segundos

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { redirect } from "next/navigation";
// import { initialData } from "@/seed/seed";

// const products = initialData.products

//Como obtenemos los parametros desde el servidor searchParams
interface Props {
  searchParams:{
    page?: string
  }
}

export default async function Home({ searchParams }: Props) {
  
  const page = searchParams.page ? parseInt(searchParams.page) : 1

  const { products = [], currentPage, totalPages } = await getPaginatedProductsWithImages({ page })

  // console.log(products)
  // console.log(searchParams)

  if(products.length === 0) redirect("/")

  console.log(currentPage);
  console.log(totalPages);
  

  return (
    <main>
      <Title
        title="Tienda"
        subtitle="Todos los productos"
        className="mb-2"
      />

      <ProductGrid products={products} />

      <Pagination totalPages={totalPages} />

    </main>
  );
}
