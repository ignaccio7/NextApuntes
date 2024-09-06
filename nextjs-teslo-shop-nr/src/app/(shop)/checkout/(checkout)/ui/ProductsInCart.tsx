"use client";
import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import Link from "next/link";

export function ProductsInCart() {
  const products = useCartStore((state) => state.cart);

  return (
    <div className="products col-span-4">
      Ajustar elementos <br />
      <Link
        href="/cart"
        className="inline-block border-b border-dashed border-black my-1 hover:border-solid"
      >
        Editar carrito
      </Link>
      <ul className="flex flex-col gap-4 mt-4">
        {products.map((product) => {
          return (
            <li
              key={`${product.slug}-${product.size}`}
              className="flex gap-4 items-start"
            >
              <img
                src={`/products/${product.image}`}
                alt={`Imagen del producto: ${product.title}`}
                className="w-28 h-28 object-cover"
              />
              <div className="content">
                <h3>{product.title}</h3>
                <p>
                  {currencyFormat(product.price)} x {product.quantity}
                </p>
                <p className="font-bold">
                  Subtotal: ${currencyFormat(product.price * product.quantity)}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
