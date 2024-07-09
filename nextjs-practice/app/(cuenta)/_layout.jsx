"use client"
// con un layout el estado se mantiene cuando cambiamos entre registro y login
// con un template se borra el estado
import { useState } from "react";

export default function ProfileTemplate({ children }){
  const [input, setInput] = useState('')

  return(
    <div>
      <input style={{color:'black'}} type="text" placeholder="input..." value={input} onChange={(e)=>{setInput(e.target.value)}} />
      { children }
    </div>
  )

}