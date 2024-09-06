"use server";
import { Gender } from "@/interfaces";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import z from "zod";
import { v2 as cloudinary } from 'cloudinary';

// Configuration
cloudinary.config({ 
  cloud_name: 'dogfyrsop', 
  api_key: '764629866954919', 
  api_secret: 'qYQ6yV0oMAxowRFpWGqSTsj-PJk' // Click 'View API Keys' above to copy your API secret
});



const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string(),
  price: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(2))),
  inStock: z.coerce.number().min(0),
  categoryId: z.string().uuid(),
  sizes: z.coerce.string().transform((val) => val.split(",")),
  tags: z.string(),
  gender: z.nativeEnum(Gender),
});

export async function 

createUpdateProduct(formData: FormData) {
  console.log(formData);
  const data = Object.fromEntries(formData);
  console.log(data);
  const productParsed = productSchema.safeParse(data);

  if (!productParsed.success) {
    console.log(productParsed.error);
    return {
      ok: false,
      message: 'Datos invalidos'
    };
  }

  const product = productParsed.data;
  product.slug = product.slug.toLowerCase().replace(/ /g, "-").trim();

  if (!product) return;
  const { id, ...rest } = product;

  let newProduct

  const tagsArray = rest.tags.split(",").map((tag) => tag.trim().toLowerCase());

  const prismaTx = await prisma.$transaction(async (tx) => {
    if (id) {
      // Actualizar
      console.log("==================ACTUALIZAR=================");
      console.log(tagsArray);
      console.log(id);
      console.log(JSON.stringify(rest.gender))
      console.log(JSON.stringify(rest.sizes))
      console.log(JSON.stringify(tagsArray))

      newProduct = await tx.product.update({
        where: {
          id,
        },
        data: {
          title:rest.title,
          description:rest.description,
          slug:rest.slug,
          price:rest.price,
          inStock: rest.inStock,
          categoryId: rest.categoryId,          
          gender: rest.gender.toString(),
          sizes: JSON.stringify(rest.sizes),
          tags: JSON.stringify(tagsArray),
        },
      });

      console.log({ updatedProduct: newProduct });      
    } else {
      // Crear
      console.log("==================CREAR=================");
      newProduct = await tx.product.create({
        data: {          
          title:rest.title,
          description:rest.description,
          slug:rest.slug,
          price:rest.price,
          inStock: rest.inStock,
          categoryId: rest.categoryId,          
          gender: rest.gender.toString(),
          sizes: JSON.stringify(rest.sizes),
          tags: JSON.stringify(tagsArray),
        }        
      })

      console.log(newProduct)
    }


    // Proceso de carga y guardado de imagenes
    // Recorrer las imagenes y guardarlas
    if(formData.getAll('images')){
      // console.log(formData.getAll('images'))
      const images = await uploadImages(formData.getAll('images') as File[])
      if(!images) {
        throw new Error('Nose pudo cargar las imagenes, rollingback')
      }

      await tx.productImage.createMany({
        data: images.map(image => ({
          url:image!,
          productId: newProduct!.id
        }))
      })
    }


    // RevalidatePaths
    revalidatePath('/admin/products')
    revalidatePath(`/admin/product/${newProduct.slug}`)
    revalidatePath(`/product/${newProduct.slug}`)    

    return {
      ok: true,
      message: "Su producto fue registrado exitosamente",
      newProduct
    };
  });

  return {
    ok: true,
    message: "Producto",
    product: prismaTx.newProduct
  };
}


const uploadImages = async(images:File[]) => {
  try {
    const uploadPromises = images.map(async(image) => {
      try {
        const buffer = await image.arrayBuffer()
        const base64Image = Buffer.from(buffer).toString('base64')

        return cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`)
          .then(r => r.secure_url)

      } catch (error) {
        console.log(error)
        return null
      }
    })

    const uploadedImages = await Promise.all(uploadPromises)
    return uploadedImages
  } catch (error) {
    console.log(error)
    return null
  }
}
