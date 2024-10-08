"use server"
import { auth } from "@/auth.config"
import prisma from "@/lib/prisma"

export async function getPaginatedOrders() {
  const session = await auth()

  if(session?.user.role !== 'admin') {
    return {
      ok: false,
      message: 'Debe estar administrador'
    }
  }

  try {

    const orders = await prisma.order.findMany({
      orderBy:{
        createAt: 'desc'
      },
      include: {
        OrderAddress: {
          select: {
            firstName: true,
            lastName: true
          }
        }
      }
    })

    return {
      ok: true,
      orders
    }
    
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'Error al obtener las ordenes'
    }
  }

}