"use client";

import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

export function OrderSummary() {

  const [loaded, setLoaded] = useState(true)
  const { itemsInCart, tax, subTotal, total } = useCartStore(state => state.getSummaryInformation())

  useEffect(()=>{
    setLoaded(false)
  },[])

  if(loaded) { return(<div>Cargando Summary...</div>) }

  return (
    <>
      <h3 className="font-semibold text-2xl">Resumen de orden</h3>
      <div className="flex justify-between">
        <span>Nro. Productos</span>
        <span>{ 
          itemsInCart === 1
          ? "1 articulo"
          : `${itemsInCart} articulos`
        } </span>
      </div>
      <div className="flex justify-between">
        <span>Subtotal</span>
        <span> { currencyFormat(subTotal) }</span>
      </div>
      <div className="flex justify-between">
        <span>Impuestos (15%)</span>
        <span> {currencyFormat(tax)}</span>
      </div>
      {/* TOTAL */}
      <div className="total">
        <div className="flex justify-between font-bold text-xl">
          <span>Total:</span>
          <span> {currencyFormat(total)}</span>
        </div>
        {/* COMPRAR */}
        <Link
          className="block mt-4 w-full text-center btn-primary"
          href="/checkout/address"
        >
          CHECKOUT
        </Link>
      </div>
    </>
  );
}
