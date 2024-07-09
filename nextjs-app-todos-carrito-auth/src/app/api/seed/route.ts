import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req:Request) {  

  // await prisma.todo.deleteMany() // delete * from todo XD

  // const todo = await prisma.todo.create({
  //   data: {
  //     description: 'Piedra del alma 2',
  //     complete: true
  //   }
  // })
  // console.log(todo);

  // await prisma.todo.createMany({
  //   data: [
  //     { description: 'Piedra del alma', complete: true },
  //     { description: 'Piedra del poder'},
  //     { description: 'Piedra del tiempo'},
  //     { description: 'Piedra del espacio'},
  //     { description: 'Piedra del realidad'},
  //   ]
  // })

  /* Lo nuevo seria */

  await prisma.todo.deleteMany() // delete * from todo XD
  await prisma.user.deleteMany()

  const salt = bcrypt.genSaltSync(10);
  const user = await prisma.user.create({
    data: {
      email: 'test1@gmail.com',
      password: bcrypt.hashSync('123456',salt).toString(),
      role: 'admin',
      todos: {
        create: [
          { description: 'Piedra del alma', complete: true },
          { description: 'Piedra del poder'},
          { description: 'Piedra del tiempo'},
          { description: 'Piedra del espacio'},
          { description: 'Piedra del realidad'},
        ]
      }
    }
  })


  return NextResponse.json({ message:'Seed executed' })
}