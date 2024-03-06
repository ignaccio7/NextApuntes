import Product from "@/components/Product";

export default async function Products() {
  const res = await fetch("http://localhost:3000/api/products")
  const data = await res.json()

  return (
    <main className="p-4 ">
      <h1 className="text-3xl font-bold pb-2">List of Products</h1>
      <div className="products grid grid-cols-3 gap-4">
        {data.map((product) => {
          return (
            <Product product={product} key={product.id} />
          );
        })}
      </div>
    </main>
  );
}
