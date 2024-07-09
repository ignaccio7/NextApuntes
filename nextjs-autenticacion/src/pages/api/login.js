// npm i jsonwebtoken
import jwt from 'jsonwebtoken'
// npm i cookie -> para serializar las cookies
import { serialize } from 'cookie'

export default function loginHandler(req, res) {
  // res.status(200).json({ message: 'Hello from Next.js in pages123!' })
  const { email, password } = req.body

  if (email === 'abc123@gmail.com' && password === '123') {
    const token = jwt.sign({
      // expiracion en 1 dia -> 24h a min a seg
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60),
      email,
      username: 'nr'
    }, 'secretWord')

    const serialized = serialize('myTokenName',token, {
      httpOnly: true, // cuando estemos en prod el navegador no podra visualizar la cookie
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict', // ya que es entregada del mismo dominio
      maxAge: 1000 * 60 * 60 * 24 * 30, // fecha expiracion
      path: '/' // ruta en la que sera entregada
    })

    res.setHeader('Set-Cookie', serialized)
    return res.json({ message: 'Login succesfully' })

  }

  res.status(404).json({ error: 'Usuario o Password incorrectos' })

}