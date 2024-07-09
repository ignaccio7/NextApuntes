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
* Pasos poara levantar la app en desarrollo
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
