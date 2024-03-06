/** aqui usaremos cloudinary */
import { connection } from "@/libs/mysql";
import { NextResponse } from "next/server";
// para almacenar las imagenes
import fs from 'node:fs/promises'
import path from 'node:path'

import cloudinary from "@/libs/cloudinary";


export async function GET() {
  const query = "SELECT * FROM product";
  const result = await connection.query(query);

  // return NextResponse.json({ message: "listado de productos" });
  return NextResponse.json(result);
}

export async function POST(request) {
  // const data = await request.json()
  // console.log(data);
  try {
    /******************** Esto cuando NO enviavamos imagen */
    // const { name, description, price } = await request.json();
    
    // const result = await connection.query("INSERT INTO product SET ?", {
    //   name,
    //   description,
    //   price,
    // });
    /******************** Esto cuando SI enviavamos imagen */
    const data = await request.formData();
    // console.log("DATA---------------");
    // console.log(data);
    // console.log(data.get('image'));
    // console.log(data.get('name'));
    
    // almacenamos la imagen
    // obtenemos la imagen del formdata recibido
    const image = data.get('image')
    // obtenemos los datos binarios de la imagen 
    const bytes = await image.arrayBuffer();
    // creamos un objeto buffer de node para manipular esta informacion
    const buffer = Buffer.from(bytes)

    // de esta manera almacenariamos la imagen en nuestra carpeta public
    const filePath = path.join(process.cwd(),'public', image.name)
    await fs.writeFile(filePath, buffer)
    //subimos el archivo a cloudinary
    const resCloud = await cloudinary.uploader.upload(filePath)
    console.log(resCloud);

    // Nota una vez subida la imagen no la necesitamos en local
    if (resCloud) {
      fs.unlink(filePath)
    }

    // almacenamos en la base de datos
    const result = await connection.query("INSERT INTO product SET ?", {
      name: data.get('name'),
      description: data.get('description'),
      image: resCloud.secure_url,
      price: data.get('price'),
    });

    //console.log(result);
    if (result.affectedRows === 0) {
      throw new Error('Error al crear el producto')
      return
    }
    return NextResponse.json({
      message:'Producto creado',
      data: {
        name: data.get('name'),
        description: data.get('description'),
        image: resCloud.secure_url,
        price: data.get('price'),
        id:result.insertId
      }
    });
  } catch (error) {
    console.log("ERROR---------------");
    console.log(error);
    return NextResponse.json({
      message: error
    })
  }
}
