import Product from "@/components/Product"
import Buttons from "./Buttons"

async function loadProduct(productId) {
  const res = await fetch(`http://localhost:3000/api/products/${productId}`)  
  const data = await res.json()
  return data
}

export default async function ProductEdit({ params }){
  const { id } = params
  const {data:product} = await loadProduct(id)
  return(
    <div className="max-w-[500px] m-auto pt-4">
      <h1 className="text-2xl font-bold">Info Product</h1>
      <div className="pointer-events-none">
        <Product product={product}/>
      </div>        
      <Buttons productId={id} />
    </div>
  )
}