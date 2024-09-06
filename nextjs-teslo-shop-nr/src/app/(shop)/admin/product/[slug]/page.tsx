import { getCategories, getProductBySlug } from "@/actions"
import { Title } from "@/components"
import { redirect } from "next/navigation"
import { ProductForm } from "./ui/ProductForm"

interface Props {
  params: {
    slug: string
  }
}

export default async function ProductPage({ params }: Props) {

  const { slug } = params

  // const product = await getProductBySlug(slug)
  // const categories = await getCategories()
  const [product, categories ] = await Promise.all([
    getProductBySlug(slug),
    getCategories()
  ])

  // TODO: NEW
  if(!product && slug !== 'new') {
    redirect('/admin/products')
  }

  const title = slug === 'new' ? 'Nuevo producto' : 'Editar producto'

  return(
    <div className="mx-5">
      <Title title={title} />
      <ProductForm product={product ?? {}} categories={categories}/>
    </div>
  )
}