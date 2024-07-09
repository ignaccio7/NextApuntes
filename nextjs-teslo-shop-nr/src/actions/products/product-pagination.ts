"use server"

import prisma from "@/lib/prisma";
import { Gender } from "@/types";

interface PaginationOptions {
  page?: number
  take?: number
  gender?: Gender
}

export async function getPaginatedProductsWithImages ({
  page = 1,
  take = 4,
  gender,
} : PaginationOptions) {

  if (isNaN(Number(page))) page = 1
  if (page < 1) page = 1  

  console.log({gender});
  console.log({ page });
  

  try {

    // 1. Obtener los productos
    const products = await prisma.product.findMany({
      take: take,
      skip: (page - 1) * take,
      // para sacar las imagenes que tiene este producto
      include: {
        ProductImage: {
          // esto para que tome 2 registros(imagenes) de esa tabla
          take:2,
          select:{
            // los campos que quiere
            url: true
          }
        }
      },
      where: {
        gender: gender
      }
      
    })

    // console.log(products);

    // 2. Obtener el total de paginas
    const totalCount = await prisma.product.count({
      where: {
        gender: gender
      }
    })
    const totalPages = Math.ceil(totalCount / take)
    console.log({totalPages});
    

    return {
      currentPage: page,
      totalPages,
      products: products.map(({ProductImage, sizes, tags,...product}) => ({
        ...product,
        sizes: JSON.parse(sizes),
        tags: JSON.parse(tags),
        images: ProductImage.map(image => image.url)        
      }))
    }

  } catch (error) {
    console.log(error);
    throw new Error('No se puede acceder a los productos')
    
  }
}