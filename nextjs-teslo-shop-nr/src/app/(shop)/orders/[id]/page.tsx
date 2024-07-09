import { QuantitySelector, Title } from "@/components";

import { initialData } from "@/seed/seed";
import clsx from "clsx";
import Link from "next/link";
import { IoCardOutline } from "react-icons/io5";

const products = initialData.products.slice(0, 3);

interface Props {
  params: {
    id: string;
  };
}

export default function OrdersPage({ params }: Props) {
  const { id } = params;

  return (
    <div className="max-w-[1200px] h-auto m-auto px-5 mb-10">
      <Title title={`Orden #${id}`} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* LISTADO DE PRODUCTOS */}
        <div className="products col-span-2">
          {/* CHECK SI ESTA O NO PAGADO */}
          <div
            className={clsx(
              "px-4 py-2 rounded-md text-slate-50 flex gap-4 items-center font-bold",
              {
                "bg-red-500": false,
                "bg-green-800": true,
              }
            )}
          >
            <IoCardOutline size={30} />
            Pagado
          </div>

          <ul className="flex flex-col gap-4 mt-4">
            {products.map((product) => {
              return (
                <li key={product.slug} className="flex gap-4 items-start">
                  <img
                    src={`/products/${product.images[0]}`}
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

          <h3 className="font-semibold text-2xl">Dirección de entrega</h3>
          <h4 className="text-xl">Oscar Curi</h4>
          <p>
            Av.Siempre viva 123 <br />
            Col. centro <br />
            Alcaldia Cuachectuanec <br />
            Ciudad de Mexico <br />
            CP 123123
          </p>

          <br />

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

            {/* CHECK SI ESTA O NO PAGADO */}
            <div
              className={clsx(
                "px-4 py-2 rounded-md text-slate-50 flex gap-4 items-center font-bold",
                {
                  "bg-red-500": false,
                  "bg-green-800": true,
                }
              )}
            >
              <IoCardOutline size={30} />
              Pagado
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
