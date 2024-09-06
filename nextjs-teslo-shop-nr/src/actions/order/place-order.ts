"use server";

import { auth } from "@/auth.config";
import { Address, Size } from "@/interfaces";
import prisma from "@/lib/prisma";

interface ProductsToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

export async function placeOrder(
  cartProducts: ProductsToOrder[],
  address: Address
) {
  const session = await auth();

  const userId = session?.user?.id;
  if (!userId)
    return {
      ok: false,
      message: "No hay session de usuario",
    };

  // console.log({ cartProducts, address, userId })

  try {
    // recordar que podemos llevar 2 o mas productos con el mismo ID pero diferente talla
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: cartProducts.map((p) => p.productId),
        },
      },
    });
    console.log(products);

    // Calcular los montos
    const itemsInOrder = cartProducts.reduce((total, p) => {
      return total + p.quantity;
    }, 0);
    console.log({ itemsInOrder });

    // Los totales de tax, subtotal y total
    const { subTotal, tax, total } = cartProducts.reduce(
      (totals, item) => {
        const productQuantity = item.quantity;
        const product = products.find(
          (product) => product.id === item.productId
        );

        if (!product)
          throw new Error(`${item.productId} no existe en la Base de datos`);

        const subTotal = product.price * productQuantity;

        totals.subTotal += subTotal;
        totals.tax += subTotal * 0.15;
        totals.total += subTotal * 1.15;

        return totals;
      },
      { subTotal: 0, tax: 0, total: 0 }
    );

    console.log({ subTotal, tax, total });

    // Para devolver en la respuesta de esta action
    let orderId = ''

    // CREAR LA TRANSACCION A LA BASE DE DATOS
    const prismaTx = await prisma.$transaction(async (tx) => {
      // 1. Actualizar el stock de los productos
      const promisesUpdatedProducts = products.map((product) => {
        const productQuantity =
          cartProducts.find((p) => p.productId === product.id)?.quantity || 0;
        if (productQuantity === 0)
          throw new Error(`${product.title} no tiene cantidad`);

        return tx.product.update({
          where: {
            id: product.id,
          },
          data: {
            inStock: {
              decrement: productQuantity,
            },
          },
        });
      });

      const updatedProducts = await Promise.all(promisesUpdatedProducts);

      // Verificamos que ningun producto en la base de datos sea negativo
      updatedProducts.forEach((product) => {
        if (product.inStock < 0)
          throw new Error(
            `${product.title} no tiene suficiente stock para la compra :/`
          );
      });

      // 2. Crear la orden - Encabezado - Detalle
      const order = await tx.order.create({
        data: {
          userId: userId,
          itemsInOrder: itemsInOrder,
          subTotal: subTotal,
          tax: tax,
          total: total,
          // aqui ya se crea los productos en la tabla OrderItem
          OrderItem: {
            createMany: {
              data: cartProducts.map((p) => ({
                quantity: p.quantity,
                size: p.size ?? "",
                productId: p.productId,
                price:
                  products.find((product) => product.id === p.productId)
                    ?.price ?? 0,
              })),
            },
          },
        },
      });

      orderId = order.id

      // 3. Crear la direccion de la orden
      const { country, ...restAddress } = address;
      const orderAddress = await tx.orderAddress.create({
        data: {
          firstName: restAddress.firstName,
          lastName: restAddress.lastName,
          address: restAddress.address,
          address2: restAddress.address2,
          postalCode: restAddress.postalCode,
          phone: restAddress.phone,
          city: restAddress.city,
          countryId: country,
          orderId: order?.id,
        },
      });

      // Cuando llegue aqui sino hay un error entonces se guarda en la base de datos   
      // esto de aqui abajo por alguna razon no me esta funcionando
      return {
        ok: true,
        order:order,
        orderAddress,
        updatedProducts
      }   
    });
    // NOS QUEDAMOS EN EL VIDEO 16
    console.log('LA TRANSACCION DE PRISMA ES: ================')
    console.log(prismaTx) // <- eso da undefined

    if(orderId === '') throw new Error('Error al crear la orden')

    return {
      ok: true,
      message: 'Su pedido fue registrado exitosamente',
      orderId
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: `Error al registrar el pedido: ${error}`,
    };
  }
}
