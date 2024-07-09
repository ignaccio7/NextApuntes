'use server'

import prisma from "@/lib/prisma"
import { Todo } from "@prisma/client"
import { revalidatePath } from "next/cache"

const sleep = (seconds : number = 0) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    },  seconds * 1000)
  })
}

export const toggleTodo = async (id:string, complete:boolean) : Promise<Todo|undefined> => {
  // 'use server'

  await sleep(2)

  const todo = await prisma.todo.findFirst({ where: {id} })

  if(!todo) {
    throw new Error(`Todo con id ${id} no encontrado`)
  }  

  const updatedTodo = await prisma.todo.update({ where:{id}, data:{complete} })

  revalidatePath('/dashboard/server-todos')

  return updatedTodo
}

export const createTodo = async (description:string) => {
  const todo = await prisma.todo.create({ data: {description} })
  revalidatePath('/dashboard/server-todos')

  return todo
}

export const deleteCompleted = async () => {
  const res = await prisma.todo.deleteMany({ where: { complete:true } })
  revalidatePath('/dashboard/server-todos')

  return res
}