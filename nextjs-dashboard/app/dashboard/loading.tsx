// este componente loading es algo por defecto que tiene NextJs para que cuando nosotros tengamos

import DashboardSkeleton from "../ui/skeletons";

// componentes que van a tardar en devolvernos los datos podriamos mostrar este componente
export default function Loading(){
    return(
        // <div>Cargando...</div>
        <DashboardSkeleton/>
    )
}