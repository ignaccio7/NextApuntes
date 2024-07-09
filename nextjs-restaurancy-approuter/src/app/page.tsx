import api from "@/api";

import Card from "./components/Card";

export default async function Home() {
  // const restaurants = await api.list();
  const restaurants = await api.listWithGoogleSheets();

  return (
    <section className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
      {restaurants.map((restaurant) => {
        return (
          <Card key={restaurant.id} restaurant={restaurant} />
          // <article key={restaurant.id}>
          //   <img
          //     alt={restaurant.name}
          //     className="mb-3 h-[300px] w-full object-cover"
          //     src={restaurant.image}
          //   />
          //   <h2 className="inline-flex gap-2 text-lg font-bold">
          //     <span>{restaurant.name}</span>
          //     <small className="inline-flex gap-1">
          //       <span>⭐</span>
          //       <span>{restaurant.score}</span>
          //       <span className="font-normal opacity-75">({restaurant.ratings})</span>
          //     </small>
          //   </h2>
          //   <p className="opacity-90">{restaurant.description}</p>
          // </article>
        );
      })}
    </section>
  );
}
