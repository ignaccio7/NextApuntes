import { createClient } from '@/utils/supabase/server'
import { NextResponse, type NextRequest } from 'next/server'

// esto es una opcion de nextjs para evitar que cacchee de forma estatica la ruta y que siempre se ejecute en el servidor
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {  
  
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  
  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if(!error) { 
      return NextResponse.redirect(`${origin}`)
    }

  }


  // return new Response('Hola')
  return NextResponse.json({ error: 'No code' })

}