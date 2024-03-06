// https://nextjs.org/docs/app/building-your-application/routing/route-handlers
import { NextResponse } from 'next/server'

export async function GET() {
  // return new Response("Hello world")

  // extract params
  // query database
  // communicate with other services

  // return NextResponse.json({
  //   message:"Hello world con GET"
  // })

  const res = await fetch('https://jsonplaceholder.typicode.com/users')
  const data = await res.json()

  //Para obtener las variables de entorno
  const token = process.env.TOKEN ? process.env.TOKEN :'sintoken'
  console.log(token);

  return NextResponse.json(data)
}

export async function POST(request){
  // como obtendriamos informacion como en express del req.body
  // basicamente en next toda la infor del body viene en la request como una promesa
  const data = await request.json()
  console.log(data); // body

  return NextResponse.json({
    message: "Creando datos"
  })
}

export function PUT(){
  return NextResponse.json({
    message: "Modificando datos"
  })
}

export function DELETE(){
  return NextResponse.json({
    message: "Eliminando datos"
  })
}