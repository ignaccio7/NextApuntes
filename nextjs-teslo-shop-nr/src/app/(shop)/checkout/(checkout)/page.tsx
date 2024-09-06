import { Title } from "@/components";
import { ProductsInCart } from "./ui/ProductsInCart";
import { PlaceOrder } from "./ui/PlaceOrder";

export default function CheckoutPage() {  

  return(
    <div className="max-w-[1200px] h-auto m-auto px-5 mb-10">
      <Title title={`Verificar orden`} />
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        {/* LISTADO DE PRODUCTOS */}
        <ProductsInCart />
        

        {/* RESUMEN DE LA ORDEN */}
        <PlaceOrder />
      </div>
    </div>
  )
}