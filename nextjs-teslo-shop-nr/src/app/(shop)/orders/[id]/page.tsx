import { getOrderById } from "@/actions/order/get-order-by-id";
import { QuantitySelector, Title } from "@/components";

import { initialData } from "@/seed/seed";
import { currencyFormat } from "@/utils/currencyFormatter";
import clsx from "clsx";
import Link from "next/link";
import { redirect } from "next/navigation";
import { IoCardOutline } from "react-icons/io5";

const products = initialData.products.slice(0, 3);

interface Props {
  params: {
    id: string;
  };
}

export default async function OrdersPage({ params }: Props) {
  const { id } = params;
  const { ok, order } = await getOrderById(id);
  console.log("=========ORDER=========");
  console.log(order);

  if (!ok) {
    redirect("/");
  }

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
                "bg-red-500": !order!.isPaid,
                "bg-green-800": order!.isPaid,
              }
            )}
          >
            <IoCardOutline size={30} />
            { order!.isPaid ? 'Pagado' : 'No pagado' }
          </div>

          <ul className="flex flex-col gap-4 mt-4">
            {order!.OrderItem.map((item) => {
              return (
                <li
                  key={`${item.product.slug}-${item.product.sizes}`}
                  className="flex gap-4 items-start"
                >
                  <img
                    src={`/products/${item.product.ProductImage[0].url}`}
                    alt={`Imagen del producto: ${item.product.title}`}
                    className="w-28 h-28 object-cover"
                  />
                  <div className="content">
                    <h3>{item.product.title}</h3>
                    <p>
                      {currencyFormat(item.price)} x {item.quantity}
                    </p>
                    <p className="font-bold">
                      Subtotal:
                      {currencyFormat(item.price * item.quantity)}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* ORDEN DE COMPRA */}
        <div className="checkout col-span-1 px-4 py-8 rounded bg-white shadow-xl h-fit">
        <h3 className="font-semibold text-2xl">Dirección de entrega</h3>
        <h4 className="text-xl">
          {order?.OrderAddress?.firstName} {order?.OrderAddress?.lastName}
        </h4>
        <p>
          {order?.OrderAddress?.postalCode} <br />
          {order?.OrderAddress?.address} <br />
          {order?.OrderAddress?.address2 ? `${order?.OrderAddress?.address2} - ` : ""}
          {order?.OrderAddress?.countryId} <br />
          {order?.OrderAddress?.city} <br />
          {order?.OrderAddress?.phone}
        </p>

        <hr className="my-2" />

        <h3 className="font-semibold text-2xl">Resumen de orden</h3>
        <div className="flex justify-between">
          <span>Nro. Productos</span>
          <span>
            {order?.itemsInOrder === 1 ? "1 articulo" : `${order?.itemsInOrder} articulos`}{" "}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span> {currencyFormat(order!.subTotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Impuestos (15%)</span>
          <span> {currencyFormat(order!.subTotal * 0.15)}</span>
        </div>
        {/* TOTAL */}
        <div className="total">
          <div className="flex justify-between font-bold text-xl">
            <span>Total:</span>
            <span> {currencyFormat(order!.total)}</span>
          </div>
        </div>

            {/* CHECK SI ESTA O NO PAGADO */}
            <div
              className={clsx(
                "px-4 py-2 rounded-md text-slate-50 flex gap-4 items-center font-bold",
                {
                  "bg-red-500": !order!.isPaid,
                "bg-green-800": order!.isPaid,
                }
              )}
            >
              <IoCardOutline size={30} />
              { order!.isPaid ? 'Pagado' : 'No pagado' }
            </div>
          </div>
        </div>
      </div>    
  );
}
