"use client"
import { QuantitySelector, Title } from "@/components";

import { initialData } from "@/seed/seed";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ProductInCart } from "./ui/ProductInCart";
import { useCartStore } from "@/store";
import { OrderSummary } from "./ui/OrderSummary";

// const products = initialData.products.slice(0, 3);

export default function CartPage() {

  // redirect('/empty')
  const products = useCartStore(state => state.cart)

  if(products.length === 0) redirect("/empty")

  return (
    <div className="max-w-[1200px] h-auto m-auto px-5 mb-10">
      <Title title="Carrito de compra" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* LISTADO DE PRODUCTOS */}
        <div className="products col-span-2">
          Agregar más items <br />
          <Link className="underline" href={"/"}>Continua comprando...</Link>
          <ul className="flex flex-col gap-4 mt-4">
            {products.map((product) => {
              return (
                <ProductInCart 
                  product={product} 
                  key={`${product.size}-${product.slug}`}
                />
              );
            })}
          </ul>
        </div>

        {/* ORDEN DE COMPRA */}
        <div className="checkout col-span-1 px-4 py-8 rounded bg-white shadow-xl h-fit">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
