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

> Nota: Para probar esta funcionalidad deberiamos tener por lo menos un usuario registrado en nuestro firebase.

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



```bash

```



```bash

```

