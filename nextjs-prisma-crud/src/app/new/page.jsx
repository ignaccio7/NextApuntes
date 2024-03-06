/**************** HOW use con SSC */
/*
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
export default async function New() {
  async function create(formData) {
    'use server';
    // podria ser un sql
    // llamar a una api con un fetch -> lo que queramos
    //const id = await createItem(formData);
    // console.log(formData);
    const title = formData.get('title')
    const description = formData.get('description')
    // console.log({title, description});
    const data = { title, description }
    const response = await fetch('http://localhost:3000/api/tasks/',{
      method: 'POST',
      body: JSON.stringify(data),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    console.log(response);
    revalidatePath('/')
    redirect('/')
  }
 
  return (
    <form action={create}
        className="max-w-[500px] m-auto bg-slate-800 flex flex-col gap-4 p-4 rounded-md"
      >
        <legend className="text-2xl font-bold text-center">Create Task</legend>
        <label className="flex flex-col gap-2">
          Title:
          <input
            type="text"
            name="title"
            placeholder="Introduce title"
            className="p-2"
            required
          />
        </label>
        <label className="flex flex-col gap-2">
          Description:
          <textarea
            name="description"
            cols="30"
            rows="10"
            placeholder="Introduce description"
            className="p-2"
            required
          ></textarea>
        </label>
        <button className="w-full bg-blue-700 p-2">Create</button>
      </form>
  );
}

/**************** HOW use client */
"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// como usaremos este mismo componente para editar cambia
//export default function NewPage(){
export default function NewPage() {
  const router = useRouter();
  // hacemos esto ya que estamos modificando tambien
  const [title, setTitle] = useState("");
  const [description, setDesciption] = useState("");
  const params = useParams();

  useEffect(() => {
    // console.log(params);
    if (params.id) {
      fetch(`/api/tasks/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          setTitle(data.title);
          setDesciption(data.description);
        });
    }
  }, []);

  const create = async (event) => {
    event.preventDefault();
    //****** tambien editaremos esto ya que el comp va editar mas */
    //const form = new FormData(event.target)
    //const data = { title:form.get('title'), description:form.get('description') }
    const data = { title, description };
    let response = "";
    // PARA CREAR
    if (!params.id) {
      response = await fetch("/api/tasks/", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Conten-Type": "application/json",
        },
      });
    } else {
      // PARA MODIFICAR
      response = await fetch(`/api/tasks/${params.id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Conten-Type": "application/json",
        },
      });
    }
    console.log(response);
    // para refrescar la pagina de su cacho
    router.push("/");
    router.refresh();
  };

  return (
    // hacemos esto ya que estamos modificando tambien
    /*<form onSubmit={create}
        className="max-w-[500px] m-auto bg-slate-800 flex flex-col gap-4 p-4 rounded-md"
      >
        <legend className="text-2xl font-bold text-center">Create Task</legend>
        <label className="flex flex-col gap-2">
          Title:
          <input
            type="text"
            name="title"
            placeholder="Introduce title"
            className="p-2"
            required
          />
        </label>
        <label className="flex flex-col gap-2">
          Description:
          <textarea
            name="description"
            cols="30"
            rows="10"
            placeholder="Introduce description"
            className="p-2"
            required
          ></textarea>
        </label>
        <button className="w-full bg-blue-700 p-2">Create</button>
      </form>*/
    <form
      onSubmit={create}
      className="max-w-[500px] m-auto bg-slate-800 flex flex-col gap-4 p-4 rounded-md"
    >
      <legend className="text-2xl font-bold text-center">Create Task</legend>
      <label className="flex flex-col gap-2">
        Title:
        <input
          type="text"
          name="title"
          placeholder="Introduce title"
          className="p-2"
          required
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </label>
      <label className="flex flex-col gap-2">
        Description:
        <textarea
          name="description"
          cols="30"
          rows="10"
          placeholder="Introduce description"
          className="p-2"
          required
          value={description}
          onChange={(e) => {
            setDesciption(e.target.value);
          }}
        ></textarea>
      </label>
      <div className="botones flex items-center justify-between">
        <button type="submit" className="bg-blue-700 p-2 px-4">
          {params.id ? "Modify" : "Create"}
        </button>
        {
          params.id && (
            <button 
              onClick={async ()=>{
                const res = await fetch(`/api/tasks/${params.id}`,{
                  method: 'DELETE'
                })
                const dat = await res.json()
                console.log(dat);
                router.push('/')
                router.refresh()
              }}
              type="button" className="px-4 py-2 bg-red-500 text-slate-50" >
              Eliminar
            </button>
          )
        }
      </div>
    </form>
  );
}
