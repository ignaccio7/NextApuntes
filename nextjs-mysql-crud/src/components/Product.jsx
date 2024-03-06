import Link from "next/link";

export default function Product({ product }) {
  return (
    <Link
      className="product flex flex-col bg-slate-200 rounded-md text-black/80 p-4 cursor-pointer"
      href={`/products/${product.id}`}
    >
      <header>
        <h3 className="font-bold">{product.name}</h3>
        <p>{product.description}</p>
      </header>
      <div className="content">
        { product.image && <img className="w-full h-[250px] object-cover aspect-square object-left-top" src={product.image} alt={product.name} /> }
      </div>
      <footer className="text-right font-semibold">{product.price} Bs.</footer>
    </Link>
  );
}
