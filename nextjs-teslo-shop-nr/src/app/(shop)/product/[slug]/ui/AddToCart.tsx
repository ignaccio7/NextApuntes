"use client"
import { QuantitySelector, SizeSelector } from "@/components";
import { CartProduct, Product } from "@/interfaces";
import { Size } from "@/interfaces";
import { useCartStore } from "@/store";
import { useState } from "react";

interface Props {
  product:Product
}

export function AddToCart({ product }:Props) {

  const addProductToCart = useCartStore(state => state.addProductToCart)

  const [size, setSize] = useState<Size|undefined>()
  const [quantity, setQuantity] = useState<number>(1)
  const [posted, setPosted] = useState(false)

  const AddToCart = () => {
    setPosted(true)
    if(!size) return

    // console.log({size,quantity})

    const cartProduct:CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity: quantity,
      size: size,
      image: product.images[0]
    }

    addProductToCart(cartProduct)
    setPosted(false)
    setSize(undefined)
    setQuantity(1)
  }

  return (
    <>
      {/* Error message */}
      {
        (posted && !size) &&(
          <span className="error mt-2 text-red-500 fade-in">
            Debe seleccionar una talla
          </span>
        )
      }

      {/* Selector de Tallas */}
      <SizeSelector
        selectedSize={size}
        availableSizes={product.sizes}
        // onSizeChanged={console.log}
        // onSizeChanged={(size)=>setSize(size)}
        onSizeChanged={setSize}
      />

      {/* Selector de Cantidad */}
      <QuantitySelector 
        quantity={quantity} 
        // onQuantityChange={(quantity) => setQuantity(quantity)}
        onQuantityChange={setQuantity}
      />

      {/* Boton */}
      <button 
        onClick={AddToCart}
        className="btn-primary my-5">Agregar al carrito</button>
    </>
  );
}
