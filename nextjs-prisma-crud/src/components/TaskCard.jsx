'use client'

import { useRouter } from "next/navigation";

export default function TaskCard({ task }) {
  const router = useRouter()
  const redirectEdit = () => {
    router.push(`/new/${task.id}`)
  }

  return (
    <div className="task bg-slate-600 p-4 rounded-sm cursor-pointer" onClick={redirectEdit}>
      <h2 className="text-rose-400">{task.title}</h2>
      <p>{task.description}</p>
    </div>
  );
}
