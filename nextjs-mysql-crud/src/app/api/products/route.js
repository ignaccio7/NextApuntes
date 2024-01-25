import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({ message: "listado de productos" });
}

export async function POST(request) {
  // const data = await request.json()
  // console.log(data);
  const { name, description, price } = await request.json();

  const result = await connection.query("INSERT INTO product SET ?", {
    name,
    description,
    price,
  });

  console.log(result);

  return NextResponse.json("Creando producto");
}
