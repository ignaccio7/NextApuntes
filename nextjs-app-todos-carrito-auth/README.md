# Para crear el proyecto
```bash    
    npx create-next-app@latest
```
Para las validaciones
```bash
    npm i yup
```

# Para conectarnos con una base de datos en docker
Creamos el archivo **docker-compose.yml**
Y vemos el contenido del archivo

Y para levantar la base de datos:
```bash
    docker compose up -d
```
Luego nos conectamos con un gestor de base de datos.
> Y ya se creara una carpeta en la raiz de nuestro proyecto *postgres* en la cual estaran los datos

# DEVELOPMENT
* Pasos para levantar la app en desarrollo
1. Para levantar la app en desarrollo
```bash
    docker compose up -d
```
> En nuestro caso usaremos *SQLite* con prisma asi no usaremos postgres pero de cualquier manera esta la configuracion de docker con postgres

2. Para instalar prisma

```bash
    npm install prisma -D
```
Y para indicarle que usaremos sqlite
```bash
    npx prisma init --datasource-provider sqlite
```

Creamos nuestro modelo en el archivo que se creo *schema.prisma*
```prisma
model Todo {
  id String @id @default(uuid())
  description String
  complete Boolean @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

Y ejecutar el siguiente comando en la terminal para crear la base de datos SQLite con los esquemas que definimos
```bash
    npx prisma migrate dev --name init
```

Y para crear la coneccion o generar el cliente de prisma.
Creamos un archivo dentro de *lib/prisma.ts*

```bash
    npx prisma generate
```

Y copiamos el siguiente contenido:
```typescript
import { PrismaClient } from '@prisma/client'
let prisma :PrismaClient

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!(global as any).prisma) {
    (global as any).prisma = new PrismaClient();
  }
  prisma = (global as any).prisma;
}

export default prisma;  
```

Y finalmente [ejecutar el SEED de la base de datos](http://localhost:3000/api/seed)



# PRODUCTION

# PARA LA AUTENTICACION

Lo haremos con **NextAuthJS** para ir a la pagina de inicio [NextAuthJSPage](https://next-auth.js.org/getting-started/example)

> Posteriormente sera **AuthJS** pero aun lo estan migrando para ir a la pagina de inicio [AuthPage](https://authjs.dev/getting-started)

Para instalar
```bash
  npm install next-auth
```

Para configurar debemos crear las carpetas *api/auth/[...nextauth]* para indicar que cualquier ruta luego de *api/auth* sera manejada por ese controlador y copiar dentro el siguiente contenido.

```javascript
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
}

export default NextAuth(authOptions)
```

Obvio debemos adaptar ya que usamos el nuevo enrutador de NEXT pero para eso observamos los archivos las modificaciones en **src/app/api/auth/[...nextauth]/route.ts**

Y para probar nuestra autenticacion en el navegador entramos a: **http://localhost:3000/api/auth/signin**.

Ya para personalizarlo lo haremos despues.

Lo que sigue es:
1. Crear en el archivo *.env* un valor para la variable **NEXTAUTH_SECRET**

> SE puede crear con la siguiente pagina: https://generate-secret.vercel.app/32
La documentacion es: https://next-auth.js.org/configuration/options

## Para la autenticacion con el proveedor de GITHUB

2. Tambien creamos las variables de entorno que teniamos en la configuracion de Github y para manejar este proveedor generalmente siempre nos pide un id y un secret

GITHUB_ID <- Identificador de la aplicacion | esto lo ve el usuario final
GITHUB_SECRET <- Authoriza a nuestro backend para poder autentica | esto no sale del servidor

Para configurar eso nosotros vamos a ir a la pagina
https://next-auth.js.org/providers/github

Y seguimos los pasos para obtener esos valores
Como resumen es ir a github ir a las configuraciones
https://github.com/settings/developers
y crear un new oauthapp y pasamos el nombre de la aplicacion el homepage la descripcion etc. 

Lo importante es el autorization callback url que basicamente lo que dice es. Cuando nosotros tengamos en produccion lo que nos dice esque cuando suceda la autenticacion nos indicara a donde lo va redireccionar.

La documentacion de esto es: 
https://next-auth.js.org/configuration/providers/oauth

Para eso nosotros usaremos de momento *http://localhost:3000/api/auth/callback/[provider]*

En este caso seria :

*http://localhost:3000/api/auth/callback/github*

Y ya luego generariamos las credenciales que necesitamos. Y copiamos esas variables a nuestra app

Y por ultimo probar nuevamente entrando a:
**http://localhost:3000/api/auth/signin**
Y ya registrandonos o logeandonos podremos ver que nos redirige a la pagina donde estabamos. Y tambien si vemos en las **cookies** podremos ver que existen nuevas que nos proporcinan mas informacion

Ahora existen 2 formas para saber si el usuario esta conectado. del servidor o el cliente

1. Para el servidor
```javascript
const session = await getServerSession(authOptions)
```

2. Para el cliente

Para usar en el cliente necesitamos de un *Provider*

Para eso creamos otro **feature-module** dentro de la carpeta *src/auth* notese que no esta dentro de app.

Y luego envolvemos el layout de la app en ese provider pero esto no convierte toda nuestra aplicacion como si estuviera del lado del cliente sino que es un hibrido solamente el contexto queda colgado por ahi.

## Para la autenticacion con el proveedor de GOOGLE

Para ello usaremos esta documentacion
https://next-auth.js.org/providers/google

1. Para añadir un nuevo proveedor debemos modificar el archivo de *api/auth/[...nextauth]/route.js* de la siguiente manera:

```js
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ''
    }),

    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
    // ...add more providers here
  ],
}

const handler = NextAuth(authOptions)

export {
  handler as GET,
  handler as POST
} 
```

2. Crear las variables en el archivo *.env*

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

3. Obtener las credenciales que:
Para eso tendremos que ir al siguiente sitio para obtener las credenciales
https://console.developers.google.com/apis/credentials

 - Para ello creamos un nuevo proyecto y crear
 - Luego seleccionamos el proyecto y creamos las credenciales (tendremos que crear la pantalla de consentimiento: pantalla que los usuarios van a ver para indicarles que necesitan acceso a tal cosa etc) 
 - Para configurar existe: interno o externo
 interno: usuarios que nosotros controlamos 
 externo: cualquier persona que tenga una cuenta de google. este elegimos
 - Y empezamos a llenar los campos. Ver tambien que podemos especificar los dominios. sino especificamos funciona para cualquiera.
 - tambien la informacion de contacto añadiriamos nuestro correo, luego sig sig sig
 - Luego de crear vamos a credenciales - ID cliente Auth -  tipo de aplicacion - nombreCliente y tambien el **uri de redireccionamiento autorizado** que como que el que ya teniamos:
 *http://localhost:3000/api/auth/callback/google*

> Obviamente el http://localhost:3000/ cambiara cuando nosotros estemos en produccion y ya tendremos las credenciales para usar 


Para ver las credenciales que tenemos o el ultimo link al cual llegamos es 
* Google: https://console.cloud.google.com/apis/credentials?authuser=2&project=app-todos-carrito-auth&supportedpurview=project
* Github: https://github.com/settings/applications/2614925

## Para conectar la autenticacion que tenemos con prisma 
Necesitamos hacer uso de adaptadores que nos ayudara a conectar nextauth o algun tipo de orm con nextauth

La guia que usaremos es: https://authjs.dev/getting-started/adapters/prisma

Nos quedaria instalar 
```bash
npm install @prisma/client @auth/prisma-adapter
npm install prisma --save-dev <- este ya lo tenemos
```
Y seguir: 

1. Para añadir un nuevo adaptador debemos modificar el archivo de *api/auth/[...nextauth]/route.js* de la siguiente manera:

```js
import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth"
import { Adapter } from "next-auth/adapters";
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";


export const authOptions = {
  // Configure adapter
  adapter: PrismaAdapter( prisma ) as Adapter,

  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ''
    }),

    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
    // ...add more providers here
  ],
}

const handler = NextAuth(authOptions)

export {
  handler as GET,
  handler as POST
} 
```

2. Luego tendriamos que modificar nuestro esquema que teniamos ya que solo tenia los *todos* como tabla se podria decir.

Ese archivo lo tenemos en *prisma/schema.prisma*
Y nuestro archivo quedaria como:
```prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model Todo {
  id String @id @default(uuid())
  description String
  complete Boolean @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

// NextAuthJS

model User {
  id            String          @id @default(cuid())
  name          String?
  email         String?         @unique
  emailVerified DateTime?
  image         String?
  accounts      Account[]
  sessions      Session[]
  // Optional for WebAuthn support
  Authenticator Authenticator[]
 
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
 
model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?
 
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
 
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
 
  @@unique([provider, providerAccountId])
}
 
model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
 
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
 
model VerificationToken {
  identifier String
  token      String
  expires    DateTime
 
  @@unique([identifier, token])
}
 
// Optional for WebAuthn support
model Authenticator {
  credentialID         String  @unique
  userId               String
  providerAccountId    String
  credentialPublicKey  String
  counter              Int
  credentialDeviceType String
  credentialBackedUp   Boolean
  transports           String?
 
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
 
  @@id([userId, credentialID])
}
```

3. Creamos la migracion
```bash
  npm exec prisma migrate dev
```

> Si pide nombre authjs

4. Tambien creamos el cliente porsiacaso
```bash
  npm exec prisma generate
```

> SOLO como tip si diera error lo correcto esque eliminemos nuestras cokkies y reiniciemos el servidor para poder probarlo


## Si nosotros necesitamos campos adicionales en un esquema que ya definimos antes

Nada no impide crear nuevos como ser el rol, typeOfUser, etc
Asi las modificaciones que hacemos es:
```prisma
model User {
  id            String          @id @default(cuid())
  name          String?
  email         String?         @unique
  emailVerified DateTime?
  image         String?
  accounts      Account[]
  sessions      Session[]
  // Optional for WebAuthn support
  Authenticator Authenticator[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // fields additional
  isActive  Boolean @default(true)
  roleId String?
  role   Role? @relation(fields: [roleId], references: [id], onDelete: SetNull)
}

model Role {
  id    String @id @default(cuid())
  name  String @unique  @default("user")
  users User[]
}
```

Esto seria creando una nueva tabla con los diferentes tipos de usuarios pero para no tardar mucho solo añadimos en la tabla User:
```prisma
  // fields additional
  isActive  Boolean @default(true)
  role String @default("user")
```


Y nuevamente
Creamos la migracion
```bash
  npm exec prisma migrate dev
```

> Si pide nombre authjs

Tambien creamos el cliente porsiacaso
```bash
  npm exec prisma generate
```

> Pero como tal no podremos ver la informacion nueva que añadimos en nuestros componentes navegando en la pagina

### Para indicarle a next que queremos manejar esos nuevos campos
debemos cambiar el tipo de estrategia en nuestro archivo de configuracion de *api/auth/[...nextauth]/route.js*

Y arreglando unos errores de tipos y agregando la estrategia que queremos usar y los callbacks quedaria de esta forma

```js
import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { AuthOptions, SessionStrategy } from "next-auth"
import { Adapter } from "next-auth/adapters";
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";


export const authOptions: AuthOptions = {
  // Configure adapter
  adapter: PrismaAdapter( prisma ) as Adapter,

  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ''
    }),

    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
    // ...add more providers here
  ],

  // NOTA: todo esto es en el backend
  // para indicarle que la sesion este manejada con jwt
  session: {
    strategy: 'jwt' as SessionStrategy
  },
  // callbacks para tener como middlewares
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {    
      console.log(user);
      return true
    },

    // 1ro se ejecuta este
    async jwt({ token, user, account, profile }) {
      // aqui podemos volver a firmar el token
      console.log('token in jwt');      
      console.log(token);

      // para verificar el email
      const dbUser = await prisma.user.findUnique({ where:{ email: token.email ?? 'no-email' } })
      if(dbUser?.isActive === false){
        throw new Error('Usuario no esta activo')
      }

      token.role = dbUser?.role ?? 'no-role'
      token.id = dbUser?.id ?? 'no-id'
      
      return token
    },
    // 2do se ejecuta este
    async session({ session, token, user }) {
      // aqui podriamos modificar los valores en la session
      console.log('token in session');
      console.log(token);

      if(session && session.user) {
        session.user.role = token.role
        session.user.id = token.id
      }
      
      return session
    }
  },

}

const handler = NextAuth(authOptions)

export {
  handler as GET,
  handler as POST
} 
```

## Para logearnos con nuestros usuarios deberiamos configurar las credencialts

Osea validar introduciendo email y password en campos de texto en el formulario

Seguiremos esta documentacion:
https://next-auth.js.org/configuration/providers/credentials

Asi el archivo de configuracion de *auth/[...nextAuth]/route.ts* quedaria de la siguiente forma:
```js
import { signInEmailPassword } from "@/auth/actions/auth-actions";
import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { AuthOptions, SessionStrategy } from "next-auth";
import { Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  // Configure adapter
  adapter: PrismaAdapter(prisma) as Adapter,

  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),

    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Correo Electronico", type: "email", placeholder: "user@gmail.com" },
        password: { label: "Contraseña", type: "password", placeholder: "******" },
      },
      async authorize(credentials, req) {

        const email = credentials?.email ?? ''
        const password = credentials?.password ?? ''

        const user = await signInEmailPassword(email, password)

        // If no error and we have user data, return it
        if (user) {
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),

    // ...add more providers here
  ],

  // NOTA: todo esto es en el backend
  // para indicarle que la sesion este manejada con jwt
  session: {
    strategy: "jwt" as SessionStrategy,
  },
  // callbacks para tener como middlewares
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log(user);
      return true;
    },

    // 1ro se ejecuta este
    async jwt({ token, user, account, profile }) {
      // aqui podemos volver a firmar el token
      console.log("token in jwt");
      console.log(token);

      // para verificar el email
      const dbUser = await prisma.user.findUnique({
        where: { email: token.email ?? "no-email" },
      });
      if (dbUser?.isActive === false) {
        throw new Error("Usuario no esta activo");
      }

      token.role = dbUser?.role ?? "no-role";
      token.id = dbUser?.id ?? "no-id";

      return token;
    },
    // 2do se ejecuta este
    async session({ session, token, user }) {
      // aqui podriamos modificar los valores en la session
      console.log("token in session");
      console.log(token);

      if (session && session.user) {
        session.user.role = token.role;
        session.user.id = token.id;
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

```

Y como nota nomas creamos estas nuevas funciones que nos sirven para validacion:
```js
import prisma from "@/lib/prisma"
import bcrypt from 'bcrypt'

export const signInEmailPassword = async (email:string, password:string) => {

  if(!email || !password) return null

  const user = await prisma.user.findUnique({ where: { email } })

  if(!user) {
    const dbUser = await createUser(email, password)
    return dbUser
  }

  if(!bcrypt.compareSync(password, user.password ?? '')) {
    return null
  }
  return user
}

async function createUser(email:string, password:string) {
  const salt = bcrypt.genSaltSync(10);
  const user = await prisma.user.create({
    data:{
      email,
      password: bcrypt.hashSync(password,salt).toString(),
      name: email.split("@")[0]
    }
  })
  return user
}
```


## Para modificar las tablas y lograr que nuestros todos para que pertenzcan a los usuarios

Modificamos las tablas de todos y user para indicar que un usuario pueda tener multiples todos

```prisma
model Todo {
  id          String   @id @default(uuid())
  description String
  complete    Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  // new table user relation 
  userId  String
  user  User @relation(fields: [userId], references: [id])

}

// NextAuthJS

model User {
  id            String          @id @default(cuid())
  name          String?
  email         String?         @unique
  emailVerified DateTime?
  image         String?
  accounts      Account[]
  sessions      Session[]
  // Optional for WebAuthn support
  Authenticator Authenticator[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // fields additional
  isActive  Boolean @default(true)
  role String @default("user")
  password  String?

  // My todos
  todos Todo[]
}

```

Y si nosotros intentamos hacer la migracion saltara un error ya que no tiene un valor por defecto en el campo *userId*. Lo que podemos hacer es borrar los campos de la base de datos y hacer la migracion y posteriormente modificar el **seed** que teniamos.

Creamos la migracion
```bash
  npm exec prisma migrate dev
```

> Si pide nombre authjs

Tambien creamos el cliente porsiacaso
```bash
  npm exec prisma generate
```

## NOTA IMPORTANTE
Luego de ejecutar el seed:
El usuario por defecto es:
```js
  email: test1@gmail.com
  password: 123456
```

# PARA OBTENER LAS CREDENCIALES DESDE EL SERVIDOR

```js
const session = await getServerSession(authOptions)
```