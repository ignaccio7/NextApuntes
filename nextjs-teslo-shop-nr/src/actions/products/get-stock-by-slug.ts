"use server"
import prisma from "@/lib/prisma";

export async function getStockBySlug(slug: string) {
  try{
    const stock = await prisma.product.findFirst({
      where:{
        slug:slug
      },
      select: {
        inStock: true
      }
    })
    console.log('El stock es ::::::::::::::::::s')
    console.log(stock)
    return stock?.inStock ?? 0
  }catch(e){
    console.log(e)
    return 0
    // throw new Error('No se pudo obtener el Stock')
  }
}