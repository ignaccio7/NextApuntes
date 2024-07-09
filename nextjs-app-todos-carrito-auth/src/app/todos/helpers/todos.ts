import { Todo } from "@prisma/client";

const sleep = (seconds: number = 0):Promise<boolean> => {
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve(true)
    }, seconds *  1000)
  })
}

// tendra las instrucciones para realizar el posteo http
export const updateTodo = async(id:string, complete:boolean) : Promise<Todo> => {
  await sleep(2)
  const body = { complete }
  const todo = await fetch(`/api/todos/${id}`,{
    method: 'PUT',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then( res => res.json() )

  console.log(todo);  
  return todo

}

export const createTodo = async(description:string) : Promise<Todo> => {
  const body = { description }
  const todo = await fetch(`/api/todos/`,{
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then( res => res.json() )

  console.log(todo);  
  return todo

}

export const deleteCompletedTodos = async() => {
  const response = await fetch('/api/todos', {
    method: 'DELETE'
  })
  const data = await response.json()

  console.log(data);
  return data  
}