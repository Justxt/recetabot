# Recipe Management API

- RecetasApp! Es una app que nos permite administrar recetas y sus categorias.

Guarda, recupera, actualiza y elimina recetas y categorías utilizando NestJS. Para este ejemplo, utiliza un almacén de datos en memoria, pero está diseñado para ser adaptable a bases de datos persistentes como PostgreSQL o MongoDB. Proporciona una API RESTful para que un frontend (o cualquier otro cliente) interactúe.

# Link del Video explicado

### Que hace el backend?

**Manejo de Categorias** Permite crear, leer, actualiza y eliminar los categorias de las recetas.
**Manejo de Recetas** Permite crear, leer, actualizar y elimianr recetas.
**Manejo de Relaciones** Cada receta esta unida a una categoria. El backend se asegura de verificar que esta union sea valida.
**Valida la informacion en el Backend** Hacemos uso de DTO con class-valitator nos permite menejar la validacion. Como sus campos, tipo de datos, lengths.
Personalizacion:

- Los nombres de los recibos no puede ser "Forbidden" (case-insensitive)
  **API Endpoints** La API posee una estrcutura que es manejada por la info de la aplicacion.
  **Almacenamiento en memoria**Uso de arrays para el almacenamiento de la info.

---

### API (Backend)

#### Categories API (`/admin/categories`)

| Method   | Route  | What it does?                   |
| :------- | :----- | :------------------------------ |
| `GET`    | `/`    | Obtiene todas las categorias    |
| `GET`    | `/:id` | Obtiene una categoria por su ID |
| `POST`   | `/`    | Crea una nueva categoria        |
| `PUT`    | `/:id` | Actualiza una categoria         |
| `DELETE` | `/:id` | Elimina una categoria           |

#### Recipes API (`/admin/recipes`)

| Method   | Route  | What it does?                  |
| :------- | :----- | :----------------------------- |
| `GET`    | `/`    | Obtiene todas las recetas      |
| `GET`    | `/:id` | Obtiene una por su ID          |
| `POST`   | `/`    | Crea una nueva receta          |
| `PUT`    | `/:id` | Actualiza una receta existente |
| `DELETE` | `/:id` | Elimina una receta             |

**Notas Clave de Interacción con la API:**

- **Categoría para Recetas**: Al crear/actualizar una receta, se requiere un `categoryId` válido (de una categoría existente). Una interfaz de usuario (frontend) normalmente obtendría las categorías mediante `GET /admin/categories` para poblar un selector.
- **Validación**: Las solicitudes no válidas (por ejemplo, campos faltantes, nombre "Forbidden") resultarán en una respuesta `400 Bad Request` (Solicitud Incorrecta) con detalles del error.
