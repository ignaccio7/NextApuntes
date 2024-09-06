import { QuantitySelector } from "@/components";
import { CartProduct } from "@/interfaces";
import { useCartStore } from "@/store";
import Link from "next/link";

interface Props {
  product: CartProduct;
}

export function ProductInCart({ product }: Props) {

  const updateProductInCart = useCartStore(state => state.updateProductInCart)
  const removeProductInCart = useCartStore(state => state.removeProductInCart)

  return (
    <li key={product.slug} className="flex gap-4 items-start">
      <img
        src={`products/${product.image}`}
        alt={`Imagen del producto: ${product.title}`}
        className="w-28 h-28 object-cover"
      />
      <div className="content">
        <Link
          href={`/product/${product.slug}`}
        >{`${product.size}-${product.slug}`}</Link>
        <p>$ {product.price}</p>
        <QuantitySelector 
          quantity={product.quantity}
          // ESTO VER INTERESANTE: Como una funcion que se ejecuta en el componente hijo devuelve el valor al padre actualizado
          onQuantityChange={(quantity) => {
            // console.log(quantity) // aqui llega el nuevo valor
            updateProductInCart(product, quantity)
          }}
        />
        <button
          onClick={()=> {
            removeProductInCart(product)
          }}
        >Remover</button>
      </div>
    </li>
  );
}
