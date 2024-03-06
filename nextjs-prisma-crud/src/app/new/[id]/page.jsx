// **** ESTA SERIA LA MANERA DE COMO OBTENER LOS PARAMS DESDE SERVIDOR


// de esta manera obtenemos los parametros de busqueda automaticamente desde el servidor
//export default function EditPage({ searchParams }){

/*import NewPage from "../page";

// y de esta a los parametros en la url
export default function EditPage({ params }){
  console.log(params);
  return(
    <>
      <NewPage/>
    </>
  )
}*/

// **** ESTA SERIA LA MANERA DE COMO OBTENER LOS PARAMS DESDE CLIENTE
/*'use client'
import NewPage from "../page";

export default function EditPage({ params }){  
  console.log(params);

  return(
    <>
      <NewPage/>
    </>
  )
}*/

import NewPage from "../page";

export default function EditPage(){  
  return(
    <>
      <NewPage/>
    </>
  )
}