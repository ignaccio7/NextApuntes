"use client"
import { Todo } from "@prisma/client"
import { TodoItem } from "./TodoItem";

// import * as todosApi from '@/app/todos/helpers/todos'
import { toggleTodo } from '@/app/todos/actions/todo-actions'

import { useRouter } from "next/navigation";

interface Props {
  todos?: Todo[]
}

export function TodosGrid({ todos = [] } : Props ) {
  console.log(todos);

  const router = useRouter()

  // const toggleTodo = async(id:string, complete:boolean) => {
  //   const updateTodo = await todosApi.updateTodo(id, complete)
  //   console.log(updateTodo);
    
  //   router.refresh()
  // }  
  
  return(
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {
        todos.map(todo => {
          return( <TodoItem key={todo.id} todo={todo} toggleTodo={ toggleTodo } /> )
        })
      }
    </div>
  )
}