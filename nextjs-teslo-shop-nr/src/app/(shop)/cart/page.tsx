import { QuantitySelector, Title } from "@/components";

import { initialData } from "@/seed/seed";
import Link from "next/link";
import { redirect } from "next/navigation";

const products = initialData.products.slice(0, 3);

export default function CartPage() {

  // redirect('/empty')

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
                <li key={product.slug} className="flex gap-4 items-start">
                  <img
                    src={`products/${product.images[0]}`}
                    alt={`Imagen del producto: ${product.title}`}
                    className="w-28 h-28 object-cover"
                  />
                  <div className="content">
                    <h3>{product.title}</h3>
                    <p>$ {product.price}</p>
                    <QuantitySelector quantity={3} />
                    <button>Remover</button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* ORDEN DE COMPRA */}
        <div className="checkout col-span-1 px-4 py-8 rounded bg-white shadow-xl h-fit">
          <h3 className="font-semibold text-2xl">Resumen de orden</h3>
          <div className="flex justify-between">
            <span>Nro. Productos</span>
            <span>3 articulos</span>
          </div>
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>$ 0.00</span>
          </div>
          <div className="flex justify-between">
            <span>Impuestos (15%)</span>
            <span>$ 0.00</span>
          </div>
          {/* TOTAL */}
          <div className="total">
            <div className="flex justify-between font-bold text-xl">
              <span>Total:</span>
              <span>$ 0.00</span>
            </div>
            {/* COMPRAR */}
            <Link className="block mt-4 w-full text-center btn-primary"
              href="/checkout/address"
            >
              CHECKOUT
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
