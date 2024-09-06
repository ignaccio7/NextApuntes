"use server"

import prisma from "@/lib/prisma";

export async function getProductBySlug (slug: string){
  try {
    
    const product = await prisma.product.findFirst({
      where:{
        slug:slug
      },
      include: {
        ProductImage: {
          select:{
            url: true,
            id: true
          }
        }
      }
    })

    if(!product) return null

    return {
      ...product,
      sizes: JSON.parse(product.sizes),
      images: product.ProductImage.map(image => image.url)
    }

  } catch (error) {
    console.log(error);
    throw new Error('Error al obtener producto por slug')
  }
}