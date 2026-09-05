# Task Manager Full Stack

Aplicación web Full Stack para la gestión de tareas y usuarios. Permite registrar y autenticar usuarios, así como crear y administrar tareas mediante una interfaz desarrollada con React y una API REST construida con Express.

<!-- BADGE_CI -->

##Tecnologías utilizadas

### Frontend

- React
- TypeScript
- Vite
- React Router
- Axios
- Bootstrap
- Bootstrap Icons
- ESLint

### Backend

- Node.js
- Express
- TypeScript
- Prisma ORM
- JSON Web Token (JWT)
- bcrypt
- CORS

### Base de datos

- PostgreSQL

---

## Instalación local

### 1. Clonar el repositorio

```bash
git clone https://github.com/jofadrova/task-manager-fullstack.git
cd task-manager-fullstack
```
### 2. Instalar dependencias del backend

```bash
cd backend
npm install
```
### 3. Configurar la base de datos

archivo `.env` dentro de la carpeta `backend` con la variable de conexión a PostgreSQL:

```env
DATABASE_URL="postgresql://postgres:123456@localhost:5432/taskmanager"
```

Por ejemplo, la estructura del proyecto debe quedar:

```text
task-manager-fullstack/
├── backend/
│   ├── prisma/
│   ├── src/
│   ├── .env
│   └── package.json
├── frontend/
├── .gitignore
└── README.md
```

> El archivo `.env` contiene información sensible y no debe subirse al repositorio.

### 4. Iniciar el backend

Desde la carpeta `backend`:

```bash
npm run dev
```

Actualmente el backend se ejecuta en:

```text
http://localhost:3000
```

### 5. Instalar dependencias del frontend

Desde la raíz del proyecto:

```bash
cd frontend
npm install
```

### 6. Iniciar el frontend

```bash
npm run dev
```

Vite mostrará en la terminal la dirección local utilizada para acceder a la aplicación.

---

## 📜 Comandos disponibles

### Frontend

Los siguientes comandos se ejecutan desde la carpeta `frontend`:

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia Vite en modo desarrollo |
| `npm run build` | Compila TypeScript y genera el build de producción |
| `npm run lint` | Ejecuta ESLint sobre el proyecto |
| `npm run preview` | Previsualiza localmente el build de producción |
| `npm test` | Pendiente de implementación — Sesión 3 |

### Backend

Los siguientes comandos se ejecutan desde la carpeta `backend`:

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor utilizando `ts-node-dev` |
| `npm run build` | Pendiente de implementación |
| `npm test` | Pendiente de implementación — Sesión 3 |

---

## 🗄️ Base de datos

El proyecto utiliza **PostgreSQL** como sistema gestor de base de datos y **Prisma ORM** para gestionar el acceso a los datos.



## 👤 Autor

**Jose Droguett**

Proyecto desarrollado como parte del proceso de formación en desarrollo Full Stack e Integración y Despliegue Continuo.
