import Post from "../components/Post"

async function loadPosts (){
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  const data = await res.json()
  /*return new Promise((resolve)=>{
    setTimeout(()=>{
      resolve(data)
    },3000)
  })*/
  return data
}
// este seria un React Server Component -> RSC
export default async function Posts(){

  const posts = await loadPosts()

  return(
    <>
      <h1>List of Posts</h1>
      <div className="container-posts grid grid-cols-3 gap-4">
        {
          posts.map(post=>{
            return(
              <Post key={post.id} post={post} />
            )
          })
        }
      </div>
    </>
  )
}