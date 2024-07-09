import Link from "next/link";

import api from "@/api";

import Card from "../components/Card";
import {IconHome} from "../components/Icons";

export async function generateMetadata({params: {id}}: {params: {id: string}}) {
  const restaurant = await api.fetch(id);

  return {
    title: `${restaurant.name} - Restaurancy`,
    description: restaurant.description,
  };
}

export default async function RestaurantPage({params: {id}}: {params: {id: string}}) {
  // const restaurant = await api.fetch(id);
  const restaurant = await api.fetchWithGoogleSheets(id);

  return (
    <>
      <Card restaurant={restaurant} />
      <Link className="mt-8 flex justify-center gap-4 text-xl text-slate-200" href="/">
        Volver a la lista <IconHome />
      </Link>
    </>
  );
}
