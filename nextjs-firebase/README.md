# Nextjs con Firebase 

Para este proyecto usaremos [shacdn](https://ui.shadcn.com/docs/installation/next) con el siguiente comando:

```bash
pnpm dlx shadcn@latest init
```

Para ir agregando componente sobre componente desde shacdn iremos ejecutando los siguientes comandos que se crearan archivos en la carpeta `components` respectivamente:
Luego es cosa de importarlos y usarlos en nuestro proyecto.

```bash
pnpm dlx shadcn@latest add input
pnpm dlx shadcn@latest add label
pnpm dlx shadcn@latest add button

```

Posterior a eso en nuestra pagina que usaremos para autenticar al usuario usaremos un svg de la siguiente pagina: ["free-svg-backgrounds-and-patterns"](https://www.svgbackgrounds.com/set/free-svg-backgrounds-and-patterns/)

Para la validacion con formularios usaremos react-hook-form y zod

```bash
pnpm i zod
pnpm i react-hook-form
pnpm i @hookform/resolvers
```

## Para conectarnos con firebase

Debemos dirigirnos a [firebase console](https://console.firebase.google.com/u/3/) y ahi crear una nueva aplicacion.

Posterior a eso en la pestaña ["Authentication"](https://console.firebase.google.com/u/3/project/nextjs-firebase-c70e5/authentication/providers) seleccionaremos "Sign-in method" y luego "Email/Password" y finalmente "Enable".

Posterior a eso en la pestaña de ["Configuracion del proyecto"](https://console.firebase.google.com/u/3/project/nextjs-firebase-c70e5/settings/general) seleccionaremos la opcion con el simbolo `</>` y agregaremos una nueva aplicacion "Web" 

Y luego en sus configuraciones nos pedira instalar firebase en nuestra aplicacion.


```bash
npm install firebase
```

y agregar la configuracion en la ruta `src/lib/firebase.ts`

```js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "xyz",
  authDomain: "nextjs-firebase-xyz.firebaseapp.com",
  projectId: "nextjs-firebase-xyz",
  storageBucket: "nextjs-firebase-xyz.firebasestorage.app",
  messagingSenderId: "xyz",
  appId: "xyz"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app

export const auth = getAuth(app)

// Auth functions
export const signIn = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password)
}
```

Aqui para entender ya sabemos que firebase config hace referencia a la configuracion de nuestro proyecto en firebase y que auth es la instancia del servicio de autenticación de Firebase asociada a tu aplicación. Este objeto te permite acceder a todas las funciones de autenticación: registrar usuarios, iniciar sesión, cerrar sesión, actualizar perfiles, etc.

Y para usar nuestra funcion de autenticacion en nuestro componente de login hariamos lo siguiente:

```js
const onSubmit = async (user: zod.infer<typeof loginFormSchema>) => {
  console.log(user);    
  try {
    const response = await signIn(user.email, user.password)
    console.log(response);
    
  } catch (error) {
    console.log(error);
    
  }
}
```

> Nota: Para probar esta funcionalidad deberiamos tener por lo menos un usuario registrado en nuestro firebase. eso lo haremos ingresando directamente en la base de datos de firebase. Toda la configuracion que tendremos de firebase lo pondremos en ese archivo `firebase.ts`

Nuestro archivo para poder crear un usuario para poder iniciar sesion o actualizar el mismo quedaria asi de comienzo:

```js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth/web-extension";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app

export const auth = getAuth(app)

// Auth functions

// Login Function
export const signIn = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password)
}

// Create User Function
export const createUser = async (user: { email: string, password: string }) => {
  return await createUserWithEmailAndPassword(auth, user.email, user.password)
}

// Update User Function -> Update username and photo
export const updateUser = async (user:{ displayName?: string | null; photoURL?: string | null; }) => {
  if (auth.currentUser) return await updateProfile(auth.currentUser, user)
}
```

## Para tener base de datos en firebase

Gracias a sus servicios podemos crear una base de datos con [Firestore Database](https://console.firebase.google.com/u/3/project/nextjs-firebase-41676/firestore) ahi nosotros podemos crear colecciones y documentos.

Para crear datos en la bd modificaremos las reglas para hacer prueba en nuestros proyecto en desarrollo.

De esto 
```js
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```
A esto
```js
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write;
    }
  }
}
```

Y ya luego en nuestro archivo `src/lib/firebase.ts` agregamos la configuracion para hacer uso de nuestra base de datos. Que es una base de datos no relacional, es una base de datos NoSQL que permite almacenar datos en forma de documentos, colecciones y subcolecciones.

Y nuestro archivo quedaria asi:
```js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth/web-extension";
import { doc, getFirestore, serverTimestamp, setDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app

export const auth = getAuth(app)

const db = getFirestore(app)

// Auth functions <===============================

// Login Function
export const signIn = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password)
}

// Create User Function
export const createUser = async (user: { email: string, password: string }) => {
  return await createUserWithEmailAndPassword(auth, user.email, user.password)
}

// Update User Function -> Update username and photo
export const updateUser = async (user:{ displayName?: string | null; photoURL?: string | null; }) => {
  if (auth.currentUser) return await updateProfile(auth.currentUser, user)
}

// Database Functions <===============================

// Set a document in a collection
export const setDocument = (path: string, data: any) => {
  data.createdAt = serverTimestamp()
  return setDoc(doc(db, path), data)
}

// Get a document from a collection
export const getDocument = async (path: string) => {
  const document = await getDoc(doc(db, path))
  return document.data()
}

```

y para poder usarlo en nuestros componentes de la siguiente manera:

`src/app/(auth)/components/loginRegister.tsx`
```js
"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";

import * as zod from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUser, setDocument, signIn } from "@/lib/firebase";
import { useState } from "react";
import { toast } from "sonner";
import { User } from "@/interfaces/user.interface";

export default function LoginRegister() {

  const [isLoding, setIsLoding] = useState(false)

  const loginFormSchema = zod.object({
    uid: zod.string(),
    name: zod.string().min(4, "El nombre debe tener al menos 4 caracteres"),
    email: zod.string().email("Ingresa un correo electronico valido").min(1, "Ingresa un correo electronico valido"),
    password: zod.string().min(6, "La contraseña debe tener al menos 6 caracteres")
  })

  const form = useForm<zod.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      uid: "",
      name: "",
      email: "",
      password: ""
    }
  })

  const { register, handleSubmit, formState } = form
  const { errors } = formState

  // Function to login
  const onSubmit = async (user: zod.infer<typeof loginFormSchema>) => {
    console.log(user);
    setIsLoding(true)
    try {
      const response = await createUser({ email: user.email, password: user.password })

      user.uid = response.user.uid

      await createUserInDB(user as User)

      console.log(response);
    } catch (error: any) {
      // console.log(error);
      const errorMessage = error?.message || "Error al ingresar"
      toast.error(errorMessage)

    } finally {
      setIsLoding(false)
    }
  }

  // Create User in DB
  const createUserInDB = async (user: User) => {
    setIsLoding(true)
    const path = `users/${user.uid}`

    try {
      delete user.password
      await setDocument(path, user)
      toast.success(`Bienvenido ${user.name} a la aplicacion `)
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setIsLoding(false)
    }

  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 px-4 min-w-sm">
      <div className="group-form flex flex-col gap-2">
        <Label>Nombre Completo</Label>
        <Input
          {...register("name")}
          type="text"
          placeholder="tu nombre completo"
        />
        <p className="form-error">{errors.email?.message}</p>
      </div>
      <div className="group-form flex flex-col gap-2">
        <Label>Correo electronico</Label>
        <Input
          {...register("email")}
          type="email"
          placeholder="admin@example.com"
        />
        <p className="form-error">{errors.email?.message}</p>
      </div>
      <div className="group-form flex flex-col gap-2">
        <Label>Constraseña</Label>
        <Input
          {...register("password")}
          type="password"
          placeholder="****"
        />
        <p className="form-error">{errors.password?.message}</p>
      </div>
      <Button
        type="submit"
        className="w-full"
        disabled={isLoding}
      >
        {
          isLoding ?
            (
              <div role="status">
                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span className="sr-only">Enviando...</span>
              </div>
            )
            : "Registrate"
        }
      </Button>
      <div className="group-form text-sm text-muted-foreground">
        Ya tienes una cuenta? &nbsp;
        <Link
          href={"/"}
        >
          Inicia sesion
        </Link>
      </div>
    </form>
  )
}
```


## Para las notificaciones

Para las notificaciones usaremos [sonner](https://sonner.emilkowal.ski/) 
```bash
pnpm install sonner
```

Fijarse el archivo `firebase.ts` para ver las funciones que usamos para comunicarnos con firebase ya que lo demas es puro Nextjs.




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



```bash

```

https://www.youtube.com/watch?v=UshXwMe-piM
