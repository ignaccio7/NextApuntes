import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "../../todos";
import { getUserSessionServer } from "@/auth/actions/auth-actions";
import { redirect } from "next/navigation";

export const metadata = {
  title:"Listado de todos",
  description:"SEO title de listado de todos"
};


export default async function RestTodosPage() {

  const user = await getUserSessionServer()

  if(!user) {
    redirect('/api/auth/signin')
  }

  const todos = await prisma.todo.findMany({ where:{ userId: user.id } ,orderBy: { description: 'asc' } });  
  
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