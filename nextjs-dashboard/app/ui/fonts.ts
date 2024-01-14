
import { Lusitana, Montserrat } from 'next/font/google'
/* De esta forma podriamos importar cualquier fuente de google ya que vercel nos permite importar de esta manera */

export const monserrat = Montserrat({ subsets:['latin'], weight:['400','700','900'] })

export const lusitana = Lusitana({
    weight:['400'],
    subsets:['latin']
})