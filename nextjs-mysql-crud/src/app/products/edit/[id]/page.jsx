import NewProduct from "../../new/page";

export default function EditProduct({ params }){
  console.log(params); //obtenemos el params en el servidor
  return(
    <>
      <NewProduct title="Editar producto"/> 
    </>
  )
}