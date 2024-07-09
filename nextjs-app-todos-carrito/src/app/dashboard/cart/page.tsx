import { WidgetItem } from "@/components/WidgetItem"
import { Product, products } from "@/products/data/products"
import { ItemCard } from "@/shopping-cart"
import { cookies } from "next/headers"

export const metadata = {
  title:'Productos de compras',
  description: 'Productos en el carrito'
}

interface ProductInCart {
  product: Product
  quantity: number
}

const getProductsInCart = (cart : { [id:string]:number }) : ProductInCart[] => {
  const productsInCart: ProductInCart[] = []

  for(const id of Object.keys(cart)) {
    const product = products.find(prod => prod.id === id)    
    if(product){
      productsInCart.push({ product, quantity: cart[id] })
    }
  }

  return productsInCart

}

export default function Cart() {

  const cookiesStore = cookies()
  const cart = JSON.parse( cookiesStore.get('cart')?.value ?? '{}') as { [id:string]:number }
  
  const productsInCart = getProductsInCart(cart)

  const totalToPay = productsInCart.reduce((prev, current) => {
    return (current.quantity * current.product.price) + prev
  }, 0)

  return(
    <>
      <h2 className="text-5xl">Productos en el carrito</h2>
      <hr className="mb-2" />

      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <div className="flex flex-col gap-2 w-full sm:w-8/12">
          {
            productsInCart.map(({ product,quantity }) => {
              return(
                <ItemCard key={product.id} product={product} quantity={quantity} />
              )
            })
          }
        </div>
        <div className="flex flex-col w-full sm:w-4/12">
          <WidgetItem title="Total a pagar"> 
            <div className="mt-2 flex justify-center text-gray-800">
              <h3 className="font-bold text-3xl">{(totalToPay * 1.15).toFixed(2)} $</h3>
            </div>
            <span className="font-bold text-center text-gray-500">Impuestos 15%: {(totalToPay * 0.15).toFixed(2)} $</span>
            
          </WidgetItem>
        </div>
      </div>
    </>
  )
}