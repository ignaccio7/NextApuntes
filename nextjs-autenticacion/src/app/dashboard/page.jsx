"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState({
    email: "",
    username: "",
  });

  const handleClick = async () => {
    const res = await fetch("/api/profile", {
      method: "GET",
    });
    const data = await res.json();
    setUser(data);
    console.log(data);
  };

  const handleLogout = async () => {
    const res = await fetch("/api/logout", {
      method: "GET",
    });
    const data = await res.json();
    console.log(data);
    router.push('/login')
  }

  return (
    <main>
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <pre>{JSON.stringify(user)}</pre>
      <button className="p-2 rounded-md bg-blue-400" onClick={handleClick}>
        Get Data
      </button> <br /> <br />
      <button className="p-2 rounded-md bg-red-400" onClick={handleLogout}>
        Logout
      </button>
    </main>
  );
}
