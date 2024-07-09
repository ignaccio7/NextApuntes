"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter()
  const [credentials, setCredentials] = useState({
    email:'',
    password:''
  })

  const handleChange = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value
    })
  };

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(credentials);
    try {
      const res = await fetch('/api/login',{
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      })
      const data = await res.json()
      console.log(data);
      if (!data.error) {
        router.push('/dashboard')        
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-[350px] h-auto m-auto mt-16 flex flex-col gap-4 border border-red-100 p-4 rounded-md"
    >
      <label className="">
        Email:
        <input type="email" 
          name="email"
          placeholder="Email...." 
          className="w-full text-black rounded-md p-2"
          onChange={handleChange} 
        />
      </label>
      <label>
        Password:
        <input type="password" 
          name="password"
          placeholder="Pasword..." 
          className="w-full text-black rounded-md p-2"
          onChange={handleChange}
        />
      </label>
      <button className="bg-blue-800 text-white rounded-md">Login</button>
    </form>
  );
}
