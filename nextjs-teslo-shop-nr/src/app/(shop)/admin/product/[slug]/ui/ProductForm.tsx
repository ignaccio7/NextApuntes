"use client";

import { createUpdateProduct } from "@/actions";
import { Category, Product, ProductImage } from "@/interfaces";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface Props {
  // Para añadir adicionalemente una propiedad extra a nuestra interfaz
  // product: Product & { nueva?:string };
  product: Partial<Product> & { ProductImage?: ProductImage[] };
  categories: Category[];
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

interface FormInputs {
  title: string;
  slug: string;
  description: string;
  price: number;
  inStock: number;
  sizes: string[];
  tags: string;
  gender: string | undefined;
  categoryId: string;

  //Todo Images
  images?: FileList;
}

export const ProductForm = ({ product, categories }: Props) => {
  const {
    handleSubmit,
    register,
    formState: { isValid },
    getValues, // para obtener valores del reacthookform
    setValue, // para asignar valores al reacthookform
    watch, // // para observar valores del reacthookform y rerenderizar
  } = useForm<FormInputs>({
    defaultValues: {
      ...product,
      tags: product.tags ? JSON.parse(product.tags) : "",
      sizes: product.sizes ?? [],

      images: undefined,
    },
  });

  watch("sizes");

  const router = useRouter();

  const onSubmit = async (data: FormInputs) => {
    console.log({ data });

    const formData = new FormData();

    const { images, ...productsToSave } = data;

    productsToSave.gender = productsToSave.gender ? productsToSave.gender : "";

    if (product.id) {
      formData.append("id", product.id ?? "");
    }

    formData.append("title", productsToSave.title);
    formData.append("slug", productsToSave.slug);
    formData.append("description", productsToSave.description);
    formData.append("inStock", productsToSave.inStock.toString());
    formData.append("price", productsToSave.price.toString());
    formData.append("tags", productsToSave.tags);
    formData.append("gender", productsToSave.gender);
    formData.append("categoryId", productsToSave.categoryId);
    formData.append("sizes", productsToSave.sizes.toString());

    // console.log(images)
    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }
    }

    const res = await createUpdateProduct(formData);
    console.log({ res });

    if (!res?.ok) {
      alert("Producto nose pudo registrar");
      return;
    }

    router.replace(`/admin/product/${res.product?.slug}`);
  };

  const onSizeChange = (size: string) => {
    /*const sizes = getValues('sizes')
    console.log(sizes);
    let newSizes:string[] = []
    if(sizes.includes(size))
      newSizes = sizes.filter(s=>s!== size)
    else{
      sizes.push(size)
      newSizes = [...sizes ]
    }
    setValue('sizes',newSizes)*/

    const newSizes = new Set(getValues("sizes"));
    newSizes.has(size) ? newSizes.delete(size) : newSizes.add(size);

    setValue("sizes", Array.from(newSizes));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3"
    >
      {/* Textos */}
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Titulo</span>
          <input
            {...register("title", { required: true })}
            type="text"
            className="p-2 border rounded-md bg-gray-200"
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Slug</span>
          <input
            {...register("slug", { required: true })}
            type="text"
            className="p-2 border rounded-md bg-gray-200"
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Descripcion</span>
          <input
            {...register("description", { required: true })}
            type="text"
            className="p-2 border rounded-md bg-gray-200"
          />
        </div>

        <div className="w-full">
          <div className="flex flex-col mb-2">
            <span>Price</span>
            <input
              {...register("price", { required: true })}
              type="text"
              className="p-2 border rounded-md bg-gray-200"
            />
          </div>

          <div className="flex flex-col mb-2">
            <span>Tags</span>
            <input
              {...register("tags", { required: true })}
              type="text"
              className="p-2 border rounded-md bg-gray-200"
            />
          </div>

          <div className="flex flex-col mb-2">
            <span>Genero</span>
            <select
              {...register("gender", { required: true })}
              className="p-2 border rounded-md bg-gray-200"
            >
              <option value="a">[Seleccione]</option>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="kid">Kid</option>
              <option value="unisex">Unisex</option>
            </select>
          </div>
        </div>

        <div className="w-full">
          <div className="flex flex-col mb-2">
            <span>Categoria</span>
            <select
              {...register("categoryId", { required: true })}
              className="p-2 border rounded-md bg-gray-200"
            >
              <option value="">[Seleccione]</option>
              {categories.map((category) => {
                return (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                );
              })}
            </select>
          </div>

          <button className="btn-primary w-full">Guardar</button>
        </div>
      </div>

      {/*Selector de tallas y fotos  */}

      <div className="w-full">
        {/* Stock */}
        <div className="flex flex-col mb-2">
          <span>Stock</span>
          <input
            {...register("inStock", { required: true, min: 0 })}
            type="text"
            className="p-2 border rounded-md bg-gray-200"
          />
        </div>

        {/* As CheckBoxes */}
        <div className="flex flex-col">
          <span>Tallas</span>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <div
                key={size}
                onClick={() => {
                  onSizeChange(size);
                }}
                className={clsx(
                  "flex items-center justify-center w-12 h-10 border border-gray-300 rounded-sm transition-all cursor-pointer",
                  {
                    // el react hook form tiene la posibilidad de evaluar valores para aplicar diferentes estilos depende de lo que nosotros coloquemos
                    "bg-blue-500 text-white": getValues("sizes").includes(size),
                  }
                )}
              >
                <span className="">{size}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Fotos */}
        <div className="flex flex-col mb-2">
          <span>Fotos</span>
          <input
            {...register("images")}
            type="file"
            multiple
            className="p-2 border rounded-md bg-gray-200"
            accept="image/png, image/jpeg"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {product.ProductImage?.map((image) => {
          
          const newUrl = image.url.startsWith('http') ? image.url : `/products/${image.url}`

          return(
            <div key={image.id}>
              <img
                src={newUrl}
                alt={`Imagen del producto ${product.title}`}
                className="w-[300px] h-auto object-cover rounded-md rounded-t-sm shadow-md"
              />
              <button
                type="button"
                onClick={(e) => {
                  console.log({ id: image.id, url: image.url });
                }}
                className="btn-danger rounded-b w-full"
              >
                Eliminar
              </button>
            </div>
          )})}
        </div>
      </div>
    </form>
  );
};
