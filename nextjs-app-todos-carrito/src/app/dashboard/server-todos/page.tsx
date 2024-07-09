// Para no tener problemas de caching con nextjs si no manejamos un fetch
// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
export const dynamicParams = true

import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "../../todos";

export const metadata = {
  title:"Server Actions",
  description:"SEO title de listado de todos"
};


export default async function RestTodosPage() {

  const todos = await prisma.todo.findMany({ orderBy: { description: 'asc' } });  
  
  return (
    <>
      <span className="text-3xl mb-4">SERVER ACTIONS</span>
      <div className="w-full px-3 mx-5 mb-5">
        <NewTodo />
      </div>
      
      <TodosGrid todos={ todos } />
    </>
  );
}