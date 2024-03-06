# Modulos a usar
## Primsa db
https://www.prisma.io/docs/getting-started/quickstart

instale el Prisma CLI como una dependencia de desarrollo en el proyecto:
    npm install prisma -D

Finalmente, configure Prisma ORM con el init comando de la CLI de Prisma:
    npx prisma init --datasource-provider sqlite

Luego veremos una carpeta creada en el proyecto "prisma" y para entender mejor nos intalaremos la extension de vscode de prisma
y ya luego en esa carpeta en el esquema es donde crearemos las tablas por asi decirse de nuestras db

Y para ejecutar Ejecute el siguiente comando en su terminal para crear la base de datos SQLite

    npx prisma migrate dev --name init

Este comando hizo tres cosas:

1. Creó un nuevo archivo de migración SQL para esta migración en el prisma/migrations directorio.
2. Ejecutó el archivo de migración SQL contra la base de datos.
3. Corrió prisma generate debajo del capó (que instaló el @prisma/client empaque y genere una API de cliente Prisma personalizada basada en sus modelos).

Debido a que el archivo de base de datos SQLite no existía antes, el comando también lo creó dentro del prisma directorio con el nombre dev.db como se define a través de la variable de entorno en el .env archivo.

Felicitaciones, ahora tiene su base de datos y tablas listas. ¡Vamos y aprendamos cómo puede enviar algunas consultas para leer y escribir datos!

En la carpeta prisma nos creara un archivo dev.db el cual esa sera nuestra base dedatos en sqlite y para verla podriamos instalarnos la extension 
sqlite viewer
y dar click derecho al dev.db y "open whit" con sqliteviewer

Y otra manera de abrir lo mismo no desde vscode podria ser desde la terminal digitar
    npx prisma studio 
y nos abrira un servidor donde podremos visualizar las tablas