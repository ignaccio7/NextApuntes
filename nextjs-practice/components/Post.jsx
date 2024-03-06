"use client"

import Link from "next/link";

// este seria un React Client Component -> RCC
export default function Post({post}) {

  const handleClick = () => {
    alert(`Clien en post ${post.id}`)
  }

  return (
    <div className="post p-4 bg-gray-900 rounded-sm">
      <h3 className="text-slate-300 font-semibold">
        <Link href={`/posts/${post.id}`} >
          {post.id}. {post.title}
        </Link>
      </h3>
      <p>{post.body}</p>
      <button className="bg-cyan-600 p-2 rounded-md" onClick={handleClick}>Alerta</button>
    </div>
  );
}
