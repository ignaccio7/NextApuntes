import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(request, {params}){
  //return NextResponse.json("Obteniendo tareas")

  const tasks = await prisma.task.findMany();
  
  return NextResponse.json(tasks)  

}

export async function POST(request){
  // return NextResponse.json("creando tareas")
  const payload = await request.json()
  const { title, description } = payload

  const newTask = await prisma.task.create({
    data:{
      title,
      description
    }
  })

  return NextResponse.json(newTask)
}