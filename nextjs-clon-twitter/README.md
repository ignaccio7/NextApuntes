# Clon de Twitter

Para este proyecto usaremos el framework Next.js, que es un framework para React.

```bash
npx create-next-app nextjs-clon-twitter
```

Para conectarnos con **SUPABASE** que este proyecto estara usando para la base de datos ingresaremos a la pagina de supabase y crearemos una base de datos con una tabla posts para almacenar posts de usuarios y lo llenaremos con algunos datos de ejemplo.

Para iniciar no guiaremos con esta [guia](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)

Adicionalmente revisamos la siguiente configuracion en la pagina oficial de supabase en la cual nos explican tambien un paso a paso de la configuracion para la autenticacion: [link](https://supabase.com/docs/guides/auth/server-side/nextjs)

Aqui es donde nos indica que version esta [deprecada](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)

```bash
# Esta era la forma antigua
pnpm install @supabase/auth-helpers-nextjs @supabase/supabase-js -E
# Esta es la forma actual recomendada
npm install @supabase/supabase-js @supabase/ssr
```

Luego crearemos un archivo .env en la raiz del proyecto con las siguientes credenciales:

```bash
NEXT_PUBLIC_SUPABASE_URL=<your_supabase_project_url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your_supabase_anon_key>
```

Y luego debemos crear un archivo dentro de **src/utils/supabase** llamado **server.ts** y dentro de este archivo debemos crear una funcion llamada **createClient** que nos permita crear una instancia de supabase en el lado del servidor.

server.ts
```javascript
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}
```

Como consumimos o hacemos peticiones desde nuestro server en archivos jsx
```javascript
// import Image from "next/image";

import { createClient } from "@/utils/supabase/server";

export default async function Home() {

  const supabase = await createClient()
  const { data } = await supabase.from('posts').select('*')

  return (
    <div>
      <h1>APP</h1>
      <p>{JSON.stringify(data, null, 2)} </p>
    </div>
  );
}
```

> NOTA: En este caso nos devolvera un array vacio **[]**, Lo que no debemos olvidarnos esque cuando queramos consumir la base de datos configurar politicas de seguridad en supabase.

Generalmente la url seria algo asi *https://supabase.com/dashboard/project/<algoAqui>/auth/policies* Asi añadiremos la seguridad a nivel de filas.

Que mas o menos una vez que creamos la politica de seguridad nos creara algo asi:
```bash
create policy "Allow to acces users to read posts"
on "public"."posts"
as PERMISSIVE
for SELECT
to public
using (true);
```

Y sorpresa, si refrescamos la pagina ya podemos ver los posts que registramos en la base de datos.

Para la **autenticacion** lo primero que haremos es crear una aplicacion en github para que puedan loguearse con esa plataforma. Para ellos vamos a *https://github.com/settings/developers* y registramos una aplicacion.

Lo que necesitaremos es una **callback url** que esto lo sacaremos de supabase ya que supabase nos permite configurar la autenticacion de manera mas facil que lo encontraremos en la seccion de **autenticacion** en *providers* y tendremos algo similar a esto: **https://supabase.com/dashboard/project/<algoaqui>/auth/providers?provider=GitHub**

Estamos siguiendo esta guia de supabase para configurar la autenticacion de github: [link](https://supabase.com/docs/guides/auth/social-login/auth-github?queryGroups=language&language=js)

> NOTA: Para crear triggers en supabase como usamos la autenticacion de github automaticamente guarda los registro de inicio de sesion en un esquema privado que es auth/users por lo que si nosotros queremos acceder a la informacion del usuario entonces podriamos crear un trigger que cuando iniciemos session automaticamente registre en una tabla publica nuestra creando una tabla en el esquem **public** y metiendo la informacion ahi con la siguiente consulta

```bash
create trigger on_auth_insert_users after insert on auth.users for each row execute function insert_user_in_public_table_for_new_user();
```

Para generar los tipos de datos que tenemos en la base de datos con supabase podemos hacer lo siguiente

Iniciamos sesion en la terminal de supabase y ejecutamos el siguiente comando
```bash
pnpx supabase login
```
Esto nos pedira un token de accesso y en la terminal nos abrira el navegador para copiar un codigo y deberiamos ver un mensaje similar a esto

```bash
Hello from Supabase! Press Enter to open browser and login automatically.

Here is your login link in case browser did not open https://supabase.com/dashboard/cli/login?session_id=fffffff

Enter your verification code: xxx
Token xxx created successfully.

You are now logged in. Happy coding!
```

Ahora lo siguiente que haremos es generar los tipos con el siguiente comando colocando el siguiente id de referencia que deberiamos tener en los ajustes del proyecto en supabase que generalmente es el siguiente enlace **https://supabase.com/dashboard/project/xxx/settings/general** y copiamos el **Project ID**

```bash
pnpx supabase gen types typescript --project-id xxx
```

y adicional a eso lo podemos guardar en un archivo automaticamente y generarlo con un script en el package json

```bash
pnpx supabase gen types typescript --project-id xxx > ./src/app/types/database.ts

# En el package.json
"scripts": {
  "generate:types": "supabase gen types typescript --project-id xxx > ./src/app/types/database.ts"
}
```



```bash

```


```bash

```


```bash

```


```bash

```


```bash

```


```bash

```


```bash

```


```bash

```


```bash

```


```bash

```


```bash

```


```bash

```


```bash

```



