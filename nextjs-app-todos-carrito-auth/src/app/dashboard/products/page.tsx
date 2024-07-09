import { products } from '@/products/data/products'
import { ProductCard } from "@/products"

export default function ProductsPage() {
  return (
    <>
      <h1>Products Page</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-2">
         {
          products.map(product => {
            return(
              <ProductCard key={product.id} {...product} />
            )
          })
         }
      </div>
    </>
  );
}
