import { Title } from "@/components";
import Link from "next/link";

export default function AddressPage() {
  return(
    <div className="max-w-[1000px] m-auto px-5 mb-10">
      <Title 
        title="Dirección"
        subtitle="Dirección de entrega"
      />
      <form action=""
      className="flex flex-row flex-wrap">
        <label htmlFor="nombre"
        className="flex-1 basis-full md:basis-1/2 pb-4">
          Nombres
          <input type="text" name="nombre" id="nombre" className="block w-full md:w-11/12 p-2 bg-gray-400"/>
        </label>
        <label htmlFor="apellidos"
        className="flex-1 basis-full md:basis-1/2 pb-4">
          Apellidos
          <input type="text" name="apellidos" id="apellidos" className="block w-full md:w-11/12 p-2 bg-gray-400"/>
        </label>
        <label htmlFor="direccion"
        className="flex-1 basis-full md:basis-1/2 pb-4">
          Direccion
          <input type="text" name="direccion" id="direccion" className="block w-full md:w-11/12 p-2 bg-gray-400"/>
        </label>
        <label htmlFor="direccion2"
        className="flex-1 basis-full md:basis-1/2 pb-4">
          Direccion 2 (opcional)
          <input type="text" name="direccion2" id="direccion2" className="block w-full md:w-11/12 p-2 bg-gray-400"/>
        </label>
        <label htmlFor="postal"
        className="flex-1 basis-full md:basis-1/2 pb-4">
          Codigo postal
          <input type="text" name="postal" id="postal" className="block w-full md:w-11/12 p-2 bg-gray-400"/>
        </label>
        <label htmlFor="cuidad"
        className="flex-1 basis-full md:basis-1/2 pb-4">
          Ciudad
          <input type="text" name="cuidad" id="cuidad" className="block w-full md:w-11/12 p-2 bg-gray-400"/>
        </label>
        <label htmlFor="pais"
        className="flex-1 basis-full md:basis-1/2 pb-4">
          Pais          
          <select name="pais" id="pais" className="block w-full md:w-11/12 p-2 bg-gray-400">
            <option value="">[Seleccione]</option>
            <option value="uno">Pais 1</option>
            <option value="dos">Pais 2</option>
            <option value="tres">Pais 3</option>
          </select>
        </label>
        <label htmlFor="direccion"
        className="flex-1 basis-full md:basis-1/2 pb-4">
          Telefono
          <input type="text" name="direccion" id="direccion" className="block w-full md:w-11/12 p-2 bg-gray-400"/>
        </label>
        <Link href="/checkout" className="btn-primary mt-4 p-3 w-2/3 md:w-1/3">
          Siguiente
        </Link>
      </form>
    </div>
  )
}