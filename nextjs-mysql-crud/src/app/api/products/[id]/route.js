import { connection } from "@/libs/mysql";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  // return NextResponse.json("obteniendo un producto");
  // console.log(params);
  try {
    const { id } = params;
    const query = "SELECT * FROM product WHERE id = ?";
    const result = await connection.query(query, [id]);
    // console.log(result);

    if (result.length === 0) {
      return NextResponse.json({
        message: "Producto no encontrado",
        data: result,
        status: 404,
      },
      { status: 404 });
    }

    return NextResponse.json({
      message: "Producto obtenido",
      data: result[0],
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: error.message,
      status: 500,
    });
  }
}

export async function DELETE(_, { params }) {
  try {
    // return NextResponse.json("eliminando un producto");
    const { id } = params;
    const query = "DELETE FROM product WHERE id = ?";
    const result = await connection.query(query, [id]);
    // console.log(result);
    if (result.affectedRows === 0) {
      return NextResponse.json({
        message: 'Producto no encontrado',
        status: 404
      })
    }
    return NextResponse.json({
      message: 'Producto eliminado',
      status: 204
    })
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: error.message,
      status:404
    })
  }
}

export async function PUT(request, {params}) {
  const body = await request.json()
  // console.log(body);
  // console.log(params);
  const result = await connection.query('UPDATE product SET ? WHERE id = ?',[
    body,
    params.id
  ]);

  if (result.affectedRows === 0) {
    return NextResponse.json({
      message:'Producto no encontrado'
    },{ status: 404 })
  }

  return NextResponse.json({
    message: 'Producto modificado',
    data: body
  })

  return NextResponse.json("modificando un producto");
}
