import { Todo } from "@prisma/client";
import stylesTodoItem from "./TodoItem.module.css";
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

interface Props {
  todo: Todo;
  // TODO: Acciones que quiero llamar
  toggleTodo: (id: string, complete: boolean) => Promise<Todo | void>;
}

export function TodoItem({ todo, toggleTodo }: Props) {

  const router = useRouter()
  const [ isFetching, setIsFetching] = useState(false)

  // isPending devuelve un boleano si dice que la transicion esta pasando
  // startTransition es una transicion para llamar a algun tipo de proceso
  const [isPending, startTransition] = useTransition()
  
  // Para saber el valor que esta pasando
  const isCompleteOptimistic = ( isFetching || isPending ) ? !todo.complete : todo.complete

  const onToggleTodo = async () => {
    setIsFetching(true)
    await toggleTodo(todo.id, !todo.complete)
    setIsFetching(false)

    startTransition(() => {
      // Actualiza la ruta actual
      // - Hace una nueva solicitud al servidor para la ruta actual
      // - Vuelve  a buscar solicitudes de datos y vuelve a renderizar los componentes del servidor
      // - Envia el payload actualizado del componente de server component al cliente
      // - El cliente fusiona el payload sin perder ningun estado
      router.refresh()
    })
  }

  return (
    <div
      className={
        // todo.complete ? stylesTodoItem.todoDone : stylesTodoItem.todoPending
        isCompleteOptimistic ? stylesTodoItem.todoDone : stylesTodoItem.todoPending
      }
    >
      <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
        <div
        // ${todo.complete ? "bg-blue-200" : "bg-red-200"}
          className={`
          flex p-2 rounded-md cursor-pointer
          hover:bg-opacity-60
          ${isCompleteOptimistic ? "bg-blue-200" : "bg-red-200"}
        `}
        // onClick={() => toggleTodo(todo.id, !todo.complete)}
          onClick={() => onToggleTodo()}
        >
          {/* {todo.complete ? ( */}
          {isCompleteOptimistic ? ( 
            <IoCheckboxOutline size={25} />
          ) : (
            <IoSquareOutline size={25} />
          )}
        </div>

        <div className="text-center sm:text-left">{todo.description}</div>
      </div>
    </div>
  );
}
