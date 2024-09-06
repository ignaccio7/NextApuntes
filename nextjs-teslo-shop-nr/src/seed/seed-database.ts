import { initialData } from "./seed";
import prisma from "../lib/prisma";
import { countries } from "./seed-countries";

interface Abc {
  as: "abc";
}

async function main() {
  const { categories, products, users } = initialData

  // 1. Borrar registros previos
  // await Promise.all([
  //   prisma.productImage.deleteMany(),
  //   prisma.product.deleteMany(),
  //   prisma.category.deleteMany(),
  // ]);

  await prisma.orderAddress.deleteMany()
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()

  await prisma.productImage.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()


  //
  await prisma.userAddress.deleteMany()
  await prisma.orderAddress.deleteMany()
  //
  await prisma.country.deleteMany()

  await prisma.user.deleteMany()

  // countries
  await prisma.country.createMany({
    data: countries
  })

  // users
  await prisma.user.createMany({
    data: users
  })

  // 2. Seed de categorias
  const categoriesData = categories.map(cat => ({
    name: cat
  }))

  await prisma.category.createMany({
    data: categoriesData
  })

  const categoriesDB = await prisma.category.findMany()
  const categoriesIdMap = categoriesDB.reduce((map, category) => {
    map[category.name.toLocaleLowerCase()] = category.id

    return map
  },{} as Record<string,string>) //<string=shirt, categoryID>
  
  // 3. Seed de productos
  products.forEach(async (product) => {
    
    const { type: categoryOfProduct,
      images,
      tags, 
      sizes, 
      ...restProduct } = product
    
    const dbProduct = await prisma.product.create({
      data:{
        ...restProduct,
        tags: JSON.stringify(tags),
        sizes: JSON.stringify(sizes),
        categoryId: categoriesIdMap[categoryOfProduct]
      }
    })

    // 4. Seed de Images
    const imagesData = images.map(image => ({
      url: image,
      productId: dbProduct.id
    }))

    await prisma.productImage.createMany({
      data: imagesData
    })    

  })


  console.log("seed executed");
}

(() => {
  if (process.env.NODE_ENV == "production") return;

  main();
})();
