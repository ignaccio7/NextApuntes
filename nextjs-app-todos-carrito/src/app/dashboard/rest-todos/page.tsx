import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "../../todos";

export const metadata = {
  title:"Listado de todos",
  description:"SEO title de listado de todos"
};


export default async function RestTodosPage() {

  const todos = await prisma.todo.findMany({ orderBy: { description: 'asc' } });  
  
  return (
    <div>
      <span className="text-3xl mb-4">REST - TODOS</span>
      <div className="w-full px-3 mx-5 mb-5">
        <NewTodo />
      </div>
      
      <TodosGrid todos={ todos } />
    </div>
  );
}