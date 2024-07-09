import { verify } from "jsonwebtoken";
import { serialize } from "cookie";

export default function logoutHandler(req, res) {
  const { myTokenName } = req.cookies;

  if (!myTokenName) {
    return res.status(401).json({ error: "Token no encotrado" });
  }

  try {
    verify(myTokenName, "secretWord");
    const serialized = serialize("myTokenName", null, {
      httpOnly: true, // cuando estemos en prod el navegador no podra visualizar la cookie
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict", // ya que es entregada del mismo dominio
      maxAge: 0, // fecha expiracion
      path: "/", // ruta en la que sera entregada
    });
    res.setHeader('Set-Cookie', serialized)
    return res.json({ message: 'logout succesfully' })
  } catch (error) {
    console.log(error);
  }
}
