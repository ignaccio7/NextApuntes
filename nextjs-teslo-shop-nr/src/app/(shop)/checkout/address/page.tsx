import { Title } from "@/components";
import { AddressForm } from "./ui/AddressForm";
import { getCountries, getUserAddress } from "@/actions";
import { auth } from "@/auth.config";

export default async function AddressPage() {

  const countries = await getCountries()

  const session = await auth()

  if(!session?.user){
    return (
      <h3 className="text-5xl">500 - NO hay session de usuario</h3>
    )
  }

  const userId = session.user.id ?? ''
  const userAddress = await getUserAddress(userId)

  return(
    <div className="max-w-[1000px] m-auto px-5 mb-10">
      <Title 
        title="Dirección"
        subtitle="Dirección de entrega"
      />
      <AddressForm countries={countries} userStoreAddress={userAddress}/>
    </div>
  )
}