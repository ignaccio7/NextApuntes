import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  /* Si tuvieramos la url del tipo
  https://jsonplaceholder.typicode.com/users/${userId}?nombre=nestor&apellido=rojas  
  */
  const { searchParams } = new URL(request.url);
  console.log(searchParams.get("nombre"));
  console.log(searchParams.get("apellido"));

  const { userId } = params;
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );
  const data = await res.json();
  return NextResponse.json(data);
}
