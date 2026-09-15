# Sistema de Gestión de Tareas

El Sistema de Gestión de Tareas es una aplicación web desarrollada con TypeScript vanilla y Vite. Permite crear, editar, eliminar, completar, buscar y filtrar tareas. La información se almacena localmente en el navegador mediante `localStorage`.

## Características implementadas

- Creación de tareas con título, descripción, categoría y prioridad.
- Edición de tareas existentes.
- Eliminación de tareas con confirmación previa.
- Cambio de estado entre pendiente y completada.
- Búsqueda de tareas por título.
- Filtrado de tareas por estado.
- Filtrado de tareas por prioridad.
- Persistencia de información mediante `localStorage`.
- Carga automática de las tareas al iniciar la aplicación.
- Contador de tareas mostradas.
- Mensajes visuales para confirmar las acciones.
- Diseño responsive para computadora, tablet y teléfono.

## Tecnologías utilizadas

- TypeScript
- Vite
- HTML5
- CSS3
- localStorage
- pnpm


## Requisitos

Para instalar y ejecutar el proyecto, se requiere contar con las siguientes herramientas:

- Node.js
- pnpm
- Git

La instalación de estas herramientas se puede comprobar mediante los siguientes comandos:

```bash
node --version
pnpm --version
git --version
```

## Instalación

### 1. Clonar el repositorio

El repositorio se clona mediante el siguiente comando:

```bash
git clone https://github.com/gabo-cc/Sistema-de-Gestion-de-Tareas.git
```

### 2. Entrar en la carpeta del proyecto

```bash
cd sistema-tareas
```

### 3. Instalar las dependencias

```bash
pnpm install
```

### 4. Iniciar el servidor de desarrollo

```bash
pnpm dev
```

### 5. Abrir la aplicación

La aplicación se debe abrir en la dirección proporcionada por Vite, generalmente:

```text
http://localhost:5173/
```

## Compilar para producción

Para generar una versión optimizada de la aplicación, se debe ejecutar:

```bash
pnpm build
```

Los archivos compilados se generarán automáticamente en la carpeta `dist`.

## Estructura principal

```text
sistema-tareas/
├── public/
├── src/
│   ├── models/
│   │   └── Task.ts
│   ├── services/
│   │   └── TaskStorage.ts
│   ├── main.ts
│   └── style.css
├── index.html
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
└── README.md
```

