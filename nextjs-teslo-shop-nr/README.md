# Para la creacion del proyecto

```bash
    npx create-next-app@latest nextjs-teslo-shop-nr
```

Para los iconos
```bash
    npm install react-icons --save
```

Para el manejo del estado
```bash
    npm install zustand --save
```

Para el manejo de clases condicionales con tailwind
```bash
    npm install clsx --save
```

> Esto funciona de la siguiente manera
```jsx
    <div
        className={
            clsx(
                "clases normales",
                {
                    "claseCondicional":!variable
                }
            )
        }
    >
    </div>
```

Para el **Slider** que tenemos en la pantalla de detaller de product:

```bash
  npm i swiper
```

Para instalar **prisma**

```bash
    npm install prisma -D
```
Y para indicarle que usaremos sqlite
```bash
    npx prisma init --datasource-provider sqlite
```

Creamos nuestro modelo en el archivo que se creo *schema.prisma*
```prisma
model Category{
  id String @id @default(uuid())
  name String @unique
  // vinculo para la foranea product
  Product Product[]
}

model Product {
  id String @id @default(uuid())
  title String
  description String
  inStock Int
  price Float @default(0)
  slug String @unique  
  // etiquetas
  tags String @default("[]")
  // tamaños
  sizes String @default("[]")
  // generos
  gender String

  // foraneas
  categoryId String
  category Category @relation(fields: [categoryId], references: [id])

  @@index([gender])
}
```

Y ejecutar el siguiente comando en la terminal para crear la base de datos SQLite con los esquemas que definimos
```bash
    npx prisma migrate dev --name init
```

> Este es el inicio de la base de datos obviamente tendremos mas tablas para lo cual modificaremos nuestro esquema pero eso lo podremos ver en el documento y ya no aqui

Y para crear la coneccion o generar el cliente de prisma.
Creamos un archivo dentro de *lib/prisma.ts*

```bash
    npx prisma generate
```

Y con base con las mejores practicas de Nextj con prisma que nos informa en la [documentacion](https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices).

Y copiamos el siguiente contenido:
```typescript
import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
```

## Para correr las migraciones de prisma
```bash
    npx prisma migrate dev
```


## Para crear el **seed** de la base de datos
Instalaremos ts-node
```bash
    npm install ts-node -D
```

Añadiremos un script en el *package.json*
```bash
    "seed": "ts-node src/seed/seed-database.ts"
```
Y adicional debemos ejecutar entrando desde el *cmd* de nuestro sistema a la carpeta donde esta el seed
```bash
    npx tsc --init
```
Esto creara en ese directorio el archivo de *tsconfig.json* para configurar los modulos las opciones etc.

Y ahora finalmente ejecutamos
```bash
    npm run seed
``` 

## Para organizar de mejor manera nuestro proyecto
* fuentes

Creamos una nueva carpeta dentro de *src* de nombre *config* y creamos un archivo *fonts.ts*.





















```bash

```