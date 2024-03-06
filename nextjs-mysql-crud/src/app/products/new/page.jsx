"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const initialProduct = {
  name: "",
  description: "",
  price: "",
};

export default function NewProduct({ title = "Crear producto" }) {
  const router = useRouter();
  const params = useParams(); // obtenemos el params en el cliente

  const [product, setProduct] = useState(initialProduct);

  console.log(params);
  useEffect(() => {
    if (params.id) {
      fetch("http://localhost:3000/api/products/" + params.id)
        .then((response) => response.json())
        .then((data) => {
          console.log(data.data);
          setProduct({
            name: data.data.name,
            description: data.data.description,
            price: data.data.price,
            image: data.data.image ? data.data.image : ''
          });
        });
    }
  }, []);

  const handleChange = (event) => {
    setProduct((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const form = new FormData(event.target)
    // console.log(form.get('name'));
    // console.log(form.get('description'));
    /*const res = await fetch('/api/products',{
      method:'POST',
      headers:{
        'Content-type':'application-json'
      },
      body: JSON.stringify(product)
    })
    const data = await res.json()
    console.log(data);    
    setProduct({...initialProduct})
    router.push('/products')*/

    /********************** eso para cuando enviamos un JSON */
    /*if (params.id) {
      //modifica PUT
      const res = await fetch(`/api/products/${params.id}`,{
        method:'PUT',
        headers:{
          'Content-type':'application-json'
        },
        body: JSON.stringify(product)
      })
      const data = await res.json()
    }else{
      //crea POST
      const res = await fetch('/api/products',{
        method:'POST',
        headers:{
          'Content-type':'application-json'
        },
        body: JSON.stringify(product)
      })
      const data = await res.json()
    }*/

    /********************** eso para cuando enviamos un form ya que tiene la imagen */
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);

    if (image) {
      formData.append("image", image);
    }

    if (params.id) {
      //modifica PUT
      const res = await fetch(`/api/products/${params.id}`, {
        method: "PUT",
        body: JSON.stringify(product),
      });

      const data = await res.json();
    } else {
      //crea POST
      const res = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
    }

    setProduct({ ...initialProduct });
    router.push("/products");
    router.refresh();
  };

  console.log(product);

  const [image, setImage] = useState(null);
  console.log(image);

  return (
    <main className="flex justify-center items-center w-full h-[100vh] flex-col p-4">
      <h1 className="text-3xl font-bold pb-2">{title}</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-[400px] w-full bg-slate-100 p-4 text-black rounded-md"
      >
        <label htmlFor="name" className="font-semibold">
          Product name:
        </label>
        <input
          type="text"
          name="name"
          id="name"
          required
          placeholder="product 1, product 2, product..."
          className="block w-full text-black p-1 border-2 border-gray-500/50 rounded-md"
          value={product.name}
          // onChange={(event)=>{ setProduct((prevState)=>{return({...prevState, name:event.target.value})}) }}
          onChange={handleChange}
        />
        <label htmlFor="description" className="font-semibold">
          Product description:
        </label>
        <textarea
          name="description"
          id="description"
          cols="30"
          rows="5"
          required
          className="block w-full text-black p-1 border-2 border-gray-500/50 rounded-md"
          placeholder="new product of the U...."
          value={product.description}
          onChange={handleChange}
        ></textarea>
        <label htmlFor="price" className="font-semibold">
          Product price:
        </label>
        <input
          type="number"
          name="price"
          id="price"
          required
          placeholder="100, 200.25, ..."
          className="block w-full text-black p-1 border-2 border-gray-500/50 rounded-md"
          value={product.price}
          onChange={handleChange}
        />
        <label htmlFor="price" className="font-semibold">
          Product image:
        </label>
        <input
          type="file"
          name="price"
          id="price"
          required
          placeholder="100, 200.25, ..."
          className="block w-full text-black p-1 border-2 border-gray-500/50 rounded-md"
          onChange={(event) => {
            setImage(event.target.files[0]);
          }}
        />
        {image && (
          <img
            className="w-full max-h-[200px] object-cover aspect-square"
            src={URL.createObjectURL(image)}
            alt="Imagen seleccionada"
          />
        )}
        <button className="bg-blue-500 p-2 rounded-md mt-2 text-slate-50 font-bold">
          {params.id ? "Updated Product" : "Save Product"}
        </button>
      </form>
    </main>
  );
}
