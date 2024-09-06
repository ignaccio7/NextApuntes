"use server"

import { auth } from "@/auth.config"
import prisma from "@/lib/prisma"

export async function getOrderById(id:string){  
  try {

    const session = await auth()
    if(!session?.user) {
      return{
        ok:false,
        mesage:'Debe estar autenticado'
      }
    }

    console.log('=========USER=========')
    console.log(session?.user)

    const order = await prisma.order.findUnique({
      where:{
        id
      },
      include:{
        OrderAddress:true,
        OrderItem: {
          select:{
            price:true,
            quantity:true,
            size:true,

            product:{
              select:{
                title:true,
                slug:true,
                sizes:true,

                ProductImage:{
                  select:{
                    url:true
                  },
                  take:1
                }
              }
            }
          }
        }
      }
    })
    // console.log('=========ORDER=========')
    // console.log(order)

    if(!order) throw new Error('No se encuentra la orden')

    // Verificamos si la orden le pertenece al usuario
    if(session.user.role === 'user') {
      if(session.user.id !== order.userId){
        throw `${id} no es de este usuario`
      }
    }    

    return{
      ok:true,
      order
    }
    
  } catch (error) {
    return {
      ok:false,
      message: `Hubo un error al conectarse con la base de datos. ${error}`
    }
  }
}