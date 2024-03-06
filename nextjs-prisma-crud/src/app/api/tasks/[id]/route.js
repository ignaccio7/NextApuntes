import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(request, { params }) {
  //return NextResponse.json("Obteniendo tareas")
  const { id } = params;
  const task = await prisma.task.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  return NextResponse.json(task);
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const deletedTask = await prisma.task.delete({
      where: {
        id: parseInt(id),
      },
    });
    return NextResponse.json(deletedTask);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error)
  }
}

export async function PUT(request, { params }) {
  const data = await request.json()
  const { id } = params

  const taskUpdated = await prisma.task.update({
    data:data,
    where:{
      id: parseInt(id)
    }
  })
  return NextResponse.json(taskUpdated)
}
