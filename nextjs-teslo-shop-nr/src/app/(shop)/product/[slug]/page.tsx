import { MobileSlideShow, QuantitySelector, SizeSelector, SlideShow } from "@/components";
import { titleFont } from "@/config/fonts";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props {
  params:{
    slug: string;
  }
}

export default function ProductPage({ params }: Props) {
  const { slug } = params;

  const product = initialData.products.find((p) => p.slug === slug);

  if(!product){
    notFound()
  }

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

        <p className="text-lg mb-5">
          $ {product.price}
        </p>

        {/* Selector de Tallas */}
        <SizeSelector 
          selectedSize={product.sizes[0]}
          availableSizes={product.sizes}
        />

        {/* Selector de Cantidad */}
        <QuantitySelector
          quantity={2}
        />

        {/* Boton */}
        <button className="btn-primary my-5">
          Agregar al carrito
        </button>

        {/* Descripcion */}
        <h3 className="font-bold text-sm">Descipción</h3>
        <p className="font-light">
          { product.description }
        </p>

      </div>
    </div>
  );
}
