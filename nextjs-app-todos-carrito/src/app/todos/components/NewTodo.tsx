'use client';

import { FormEvent, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";

import * as todosApi from '@/app/todos/helpers/todos'
import * as todoActions from '@/app/todos/actions/todo-actions'

// import { useRouter } from "next/navigation";

export const NewTodo = () => { 
  // // const router = useRouter()

  const [ description, setDescription ] = useState('')


  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()

    if (description.trim().length === 0) {
      return
    }

    // const newTodo = await todosApi.createTodo(description)
    const newTodo = await todoActions.createTodo(description)

    console.log('newTodo:', newTodo);
    setDescription('')
    // router.refresh()    
  }

  // const deleteCompleted = async () => {
  //   const response = await todosApi.deleteCompletedTodos()
  //   console.log(response);    
  //   // router.refresh()    
  // }

  return (
    <form className='flex w-full' onSubmit={onSubmit}>
      <input type="text"
        onChange={(event) => { setDescription(event.target.value) }}
        value={description}
        className="w-6/12 -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all"
        placeholder="¿Qué necesita ser hecho?" />

      <button type='submit' className="flex items-center justify-center rounded ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all">
        Crear
      </button>
      
      <span className='flex flex-1'></span>

      <button 
        //TODO: onClick={ () => deleteCompleted() }
        // onClick={ () => deleteCompleted() }
        onClick={() => todoActions.deleteCompleted()}
        type='button' className="flex items-center justify-center rounded ml-2 bg-red-400 p-2 text-white hover:bg-red-700 transition-all">
        <IoTrashOutline />
        Borrar completados
      </button>


    </form>
  )
}