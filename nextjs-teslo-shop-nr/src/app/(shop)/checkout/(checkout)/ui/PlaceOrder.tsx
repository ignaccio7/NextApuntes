"use client";

import { placeOrder } from "@/actions";
import { useAddressStore, useCartStore } from "@/store";
import { currencyFormat, sleep } from "@/utils";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function PlaceOrder() {
  const [loaded, setLoaded] = useState(false);
  const address = useAddressStore((state) => state.address);
  const { itemsInCart, tax, subTotal, total } = useCartStore((state) =>
    state.getSummaryInformation()
  );
  const cart = useCartStore((state) => state.cart);

  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const [errorMessage,setErrorMessage] = useState('')

  const clearCart = useCartStore(state => state.clearCart)
  const router = useRouter()

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return "cargando..."; // Esto para no tener problemas con la hidratacion ya que si es componente de cliente el servidor puede renderizar algo y el cliente otra cosa y ahi hay choque

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);

    const productsToOrder = cart.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size,
    }));

    // ! SERVER ACTION
    console.log({ address, productsToOrder });
    const res = await placeOrder(productsToOrder, address)
    console.log({res})

    if(!res.ok){
      setIsPlacingOrder(false);
      setErrorMessage(res.message)
      return
    }

    // await sleep(2);
    // setIsPlacingOrder(false);

    // En este punto todo salio bien
    clearCart()
    router.replace('/orders/'+res.orderId)

  };

  return (
    <>
      <div className="checkout col-span-3 px-4 py-8 rounded bg-white shadow-xl h-fit">
        <h3 className="font-semibold text-2xl">Dirección de entrega</h3>
        <h4 className="text-xl">
          {address.firstName} {address.lastName}
        </h4>
        <p>
          {address.postalCode} <br />
          {address.address} <br />
          {address.address2 ? `${address.address2} <br />` : ""}
          {address.country} <br />
          {address.city} <br />
          {address.phone}
        </p>

        <hr className="my-2" />

        <h3 className="font-semibold text-2xl">Resumen de orden</h3>
        <div className="flex justify-between">
          <span>Nro. Productos</span>
          <span>
            {itemsInCart === 1 ? "1 articulo" : `${itemsInCart} articulos`}{" "}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span> {currencyFormat(subTotal)}</span>
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
        </div>
        <p className="text-sm my-4">
          Al hacer click en {`"Colocar Orden"`}, aceptas nuestros{" "}
          <span className="underline">términos y condiciones</span> y{" "}
          <span className="underline">politicas de privacidad</span>
        </p>
        <span
          className="text-red-500 text-center block"        
        >
          {errorMessage}
        </span>
        <button
          onClick={onPlaceOrder}
          className={clsx("w-full", {
            "btn-primary": !isPlacingOrder,
            "btn-disabled": isPlacingOrder,
          })}
        >
          Colocar orden
        </button>
      </div>
    </>
  );
}
