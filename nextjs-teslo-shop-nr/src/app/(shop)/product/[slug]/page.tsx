export const revalidate = 604800; // 7 dias 60seg*60min*24h*7d

import { getProductBySlug } from "@/actions";
import { MobileSlideShow, QuantitySelector, SizeSelector, SlideShow, StockLabel } from "@/components";
import { titleFont } from "@/config/fonts";
import { initialData } from "@/seed/seed";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { AddToCart } from "./ui/AddToCart";

interface Props {
  params:{
    slug: string;
  }
}

export async function generateMetadata(
  {
    params
  } : Props,
  parent: ResolvingMetadata
): Promise<Metadata> {

  const slug = params.slug

  const product = await getProductBySlug(slug)

  return {
    title: product?.title ?? 'Producto no encontrado',
    description: product?.description ?? '',
    openGraph: {
      title: product?.title ?? 'Producto no encontrado',
      description: product?.description ?? '',
      //images:[], // https://uno.com/product/imagen1.png se necesita todo el url
      images: [`/products/${product?.images[1]}`]
    }
  }
};

export default async function ProductPage({ params }: Props) {
  const { slug } = params;

  // const product = initialData.products.find((p) => p.slug === slug);
  const product = await getProductBySlug(slug)

  if(!product){
    notFound()
  }
  
  console.log(product );  

  return (
    <div className="px-0 md:px-5 mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* SlideShow */}
      <div className="col-span-1 md:col-span-2">
        {/* MOBILE SLIDESHOW */}
        <MobileSlideShow images={product.images} title={product.title} 
          className="block md:hidden"
        />

        {/* DESKTOP SLIDESHOW */}
        <SlideShow images={product.images} title={product.title} 
          className="hidden md:block"
        />
      </div>
      {/* Details */}
      <div className="col-span1 px-5">
        <h1
          className={`${titleFont.className} antialiased font-bold text-xl`}
        >
          {product.title}
        </h1>

        <StockLabel slug={product.slug} />

        <p className="text-lg mb-5">
          $ {product.price}
        </p>

        <AddToCart product={product} />

        {/* Descripcion */}
        <h3 className="font-bold text-sm">Descipción</h3>
        <p className="font-light">
          { product.description }
        </p>

      </div>
    </div>
  );
}
