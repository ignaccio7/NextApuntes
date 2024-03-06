"use client";

import { useRouter } from "next/navigation";

export default function Buttons({ productId }) {

  const router = useRouter()

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this product?")) {
      const pet = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });
      const res = await pet.json();
      alert(res.message)
      router.push('/products')
      router.refresh()
    }
  };

  return (
    <div className="flex justify-end mt-2 gap-2">
      <button className="px-4 py-2 rounded-md bg-blue-400 hover:bg-blue-300 font-bold cursor-pointer"
        onClick={()=>{ router.push('/products/edit/'+productId) }}
      >
        Edit
      </button>
      <button
        className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-400 font-bold cursor-pointer"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
}
