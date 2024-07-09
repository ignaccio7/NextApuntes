import { NextResponse } from "next/server";
// con jwt dara error ya que nextjs intenta distribuir aplicaciones a traves de edge o CDN y en este entorno no admite jwt
// import { verify } from "jsonwebtoken";
// para solucionar entonces usamos jose -> npm i jose
import { jwtVerify } from "jose";
/*
export async function middleware(request) {
  //  console.log('Middleware');
  // console.log(request.url); en formato de texto
  // console.log(request.nextUrl); // en formato de objeto

  const token = request.cookies.get('myTokenName')
  console.log(token);
  console.log(token?.value);
  if (request.nextUrl.pathname.includes('/dashboard')) {
    console.log('Validiting dashboard');
    if (token === undefined) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    // const verToken = verify(token.value, "secretWord")
    try {
      // Al usar new TextEncoder().encode("secretWord"), estás obteniendo una representación de bytes de la cadena "secretWord
      // basicamente eso es lo que espera recibir la dependencia de jose
      const { payload } = await jwtVerify(token.value, new TextEncoder().encode("secretWord"))
      console.log(payload);
      return NextResponse.next();
    } catch (error) {
      console.log("Error:");
      console.log(error);
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  return NextResponse.next();
}
*/

// NOTA si quisieramos proteger todas las rutas excepto algunas
// en este caso la del login entonces

export async function middleware(request) {
  //  console.log('Middleware');
  // console.log(request.url); en formato de texto
  // console.log(request.nextUrl); // en formato de objeto

  const token = request.cookies.get("myTokenName");
  console.log(token);
  console.log(token?.value);
  // if (request.nextUrl.pathname.includes('/dashboard')) {
  console.log("Validiting dashboard");
  if (token === undefined) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  // const verToken = verify(token.value, "secretWord")
  try {
    // Al usar new TextEncoder().encode("secretWord"), estás obteniendo una representación de bytes de la cadena "secretWord
    // basicamente eso es lo que espera recibir la dependencia de jose
    const { payload } = await jwtVerify(
      token.value,
      new TextEncoder().encode("secretWord")
    );
    console.log(payload);
    return NextResponse.next();
  } catch (error) {
    console.log("Error:");
    console.log(error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
  // }

  // return NextResponse.next();
}

export const config = {
  // como protegeriamos la ruta user y sus subrutas
  matcher: ['/dashboard', '/', '/user/:path*']
}
