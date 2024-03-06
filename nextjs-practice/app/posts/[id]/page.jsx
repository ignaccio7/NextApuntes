import { Suspense } from "react"
import Posts from "../page"

async function LoadPost({id}){
  const res = await fetch('https://jsonplaceholder.typicode.com/posts/'+id)
  const data = await res.json()
  return data
}

export default async function PostId({ params }){

  const { id } = params
  const post = await LoadPost({id})

  return(
    <>
      <h2>Estas en el post {id} {post.title} </h2>
      <p>{post.body}</p>
      <hr />
      <h3>Cargando otras publicaciones prueba Suspense</h3>
      <Suspense fallback={ <div> Cargando publicaciones ... </div> }>
        <Posts/>
      </Suspense>
    </>
  )
}