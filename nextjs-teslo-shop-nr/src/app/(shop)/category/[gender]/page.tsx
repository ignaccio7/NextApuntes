// para revalidar el cache
export const revalidate = 60  // 60 segundos

import { notFound, redirect } from "next/navigation"
import { initialData } from "@/seed/seed"
import { titleFont } from "@/config/fonts"
import { Pagination, ProductGrid } from "@/components"
import { Category } from "@/interfaces"
import { getPaginatedProductsWithImages } from "@/actions"
import { Gender } from "@/types"

interface Props {
  params: {
    // gender: Category
    gender: string
  },
  searchParams: {
    page?: string
  }
}

// const products = structuredClone(initialData.products)

export default async function CategoryPage({ params, searchParams }:Props) {

  const { gender:category } = params

  // const filteredProducts = products.filter(product => product.gender === category)

  const page = searchParams.page ? parseInt(searchParams.page) : 1

  const { products = [], currentPage, totalPages } = await getPaginatedProductsWithImages({ page, gender: category as Gender })

  if(products.length === 0) redirect("/")


  // const labels:{ [key: Category]:string } = {
  const labels: Record<string, string> = {
    'men': 'Hombres',
    'women': 'Mujeres',
    'kid': 'Niños',
    'unisex': 'Todos'
  }

  // if (id === 'kids') {
  //   notFound()
  // }

  return(
    <div className="px-5 py-2 max-w-[1000px] m-auto">
      <h1 className={`${titleFont.className} text-2xl font-bold`}>
        Articulos para <span className="uppercase">{ labels[category] }</span>
      </h1>
      <div className="products">
        <ProductGrid products={products} />
      </div>
      <Pagination totalPages={totalPages} />
    </div>
  )
}