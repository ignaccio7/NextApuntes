import TaskCard from "@/components/TaskCard";
import { prisma } from "@/libs/prisma";
import Link from "next/link";

async function getTasks() {
  /*const response = await fetch("http://localhost:3000/api/tasks/", {
    method: "GET",
  });
  const data = await response.json();
  return data;*/
  // tambien se puede hacer consultando directamente al cliente de prisma
  const tasks = await prisma.task.findMany()
  return tasks
}

export default async function Home() {
  const tasks = await getTasks();
  console.log(tasks);

  return (
    <>
      <main className="w-full h-svh flex flex-col items-center justify-start">
        <h1 className="text-2xl font-bold">List of Tasks</h1>
        <div className="tasks w-full grid grid-cols-3 p-10 gap-4">
          {tasks.map((task) => {
            return (
              // <div className="task bg-slate-600 p-4 rounded-sm" key={task.id}>
              //   <h2 className="text-rose-400">{task.title}</h2>
              //   <p>{task.description}</p>
              // </div>
              <TaskCard task={task} key={task.id}/>
            );
          })}
        </div>
      </main>
    </>
  );
}
