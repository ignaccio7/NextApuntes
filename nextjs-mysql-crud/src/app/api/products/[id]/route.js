import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json("obteniendo un producto");
}

export function DELETE() {
  return NextResponse.json("eliminando un producto");
}

export function PUT() {
  return NextResponse.json("modificando un producto");
}
