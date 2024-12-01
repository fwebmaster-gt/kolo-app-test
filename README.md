# Live Demo

Puedes visitar el [Live Demo](https://kolo-app.fwebmaster.com/)

## Instalar Dependencias

`npm install`

## Iniciar Modo Desarrollo

`npm run dev`

## Crear Build

`npm run build`

## Ejecutar Build

`npm run start`

## Listado De Dependencias

- `MUI`: Para los estilos como indica los requerimientos
- `Next` & Ts: En su version `14` con `App-Router` como lo indican los requerimientos
- `Prisma ORM`: Para el manejo de la base de datos en `MONGODB`
- `date/fns`: Para el manejo de fechas
- `nanoid & slugify`: Para la generacion de codigo de producto (Item)
- `react-date-range`: Componente para tomas rango de fechas;
- `react-hook-form`: para la validacion de formularios en el frontend
- `axios`: Para realizar los request al backend
- `react-hot-toast`: Para mostrar alertas interactivas
- `nextjs-toploader`: libreria para manejar renderizar el estado de carga en una pagina

## Estructura de Base de datos

- Se utilizo `MongoDB` & `Prisma ORM` para la gestion de los datos.

- El el archivo `.env` se puede cambiar el `STRING_CONNECTION`;

```
DATABASE_URL="mongodb+srv://freddy:swed20122000@cluster0.egyqs.mongodb.net/kolo-app"
```

- La esquema de la base de datos se conforma por una tabla `Item` y un `ENUM` para los `Tipos`.

```prisma
enum TipoItem {
    bien
    servicio
}

model Item {
    id     String @id @default(auto()) @map("_id") @db.ObjectId
    nombre String
    codigo String @unique

    tipo TipoItem

    precio Float @default(0)

    deleted   Boolean   @default(false)
    deletedAt DateTime?

    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
}
```

## Estructura de folders

```
app/
├── api/items/
│   ├── [id]/
│   │   └── route.ts
│   └── route.ts
├── items/
│   ├── [id]/
│   │   └── edit/
│   │       └── page.tsx
│   └── create/
│       └── page.tsx
├── globals.css
├── layout.tsx
└── page.tsx
components/
constants/
database/
```

## Filtrado de datos

Todos los filtros y paginaciones se realizaron en el backend o api-routes de Next, dejando como unica tarea al frontend de enviar parametros al backend para que este se encarge del resto.
