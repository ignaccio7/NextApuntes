"use server"
import prisma from "@/lib/prisma"

export async function deleteUserAddress(userId:string) {

  try {
    const response = await prisma.userAddress.delete({
      where:{
        userId
      },
    })

    return{
      ok:true
    }    
  } catch (error) {
    console.log(error)
    return{
      ok:false,
      message:'Nose pudo eliminar su direccion'
    }
  }
}