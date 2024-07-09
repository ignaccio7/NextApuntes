
// en las rutas paralelas podemos cargar las carpetas
// @chat @analitycs @video
// y estan no seran rutas localhost:3000/@chat o localhost:3000/
// sino solamente seran carpetas que nosotros podremos integrar en nuestro layout
export default function Layout({ children, chat, video, analytics }){
  return(
    <>
      <h1>Layout Dashboard</h1>      
      {children}
      {chat}
      {video}
      {analytics}
    </>
  )
}