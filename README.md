# 🚀 Suger Backend — Authentication Service

A clean architecture–based Node.js + TypeScript + Prisma project with PostgreSQL running in Docker.

---

## 🧩 Tech Stack

- **Node.js** — Backend runtime  
- **TypeScript** — For type safety  
- **Prisma ORM** — Database modeling and migrations  
- **PostgreSQL** — Database (running via Docker)  
- **JWT (JSON Web Token)** — Authentication  
- **bcrypt** — Password hashing  
- **pnpm** — Package manager  

---

## ⚙️ Project Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/suger-backend.git
cd suger-backend
```

---

### 2️⃣ Install Dependencies

```bash
pnpm install
```

---

### 3️⃣ Create a `.env` File

In the root directory, create a `.env` file and add:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/sugar_db"
JWT_SECRET="your_secret_key_here"
PORT=5000
```

---

### 4️⃣ 🏗️ Build Docker Images & Run Containers

Make sure Docker is installed and running.  
Then build your application image and start the PostgreSQL service:

```bash
# Build all Docker images (app + database)
docker compose build

# Start all containers in detached mode
docker compose up -d
```

✅ **What this does:**

* Builds your Node.js application image (`sugar_app`)
* Pulls and starts a PostgreSQL container (`postgres_db`)
* Exposes:
  * App → [http://localhost:3000](http://localhost:3000)
  * Postgres → port `5432`
* Persists data in a Docker volume (`postgres_data`)

To check running containers:

```bash
docker ps
```

To view logs:

```bash
docker logs sugar_app -f
```

To stop containers:

```bash
docker compose down
```

---

### 5️⃣ Setup Prisma

Generate the Prisma client and push your schema to the database:

```bash
pnpm prisma generate
pnpm prisma db push
```

---

### 6️⃣ Start the Server

```bash
pnpm run dev
```

The server will start on [http://localhost:5000](http://localhost:5000).

---

## 🔐 API Endpoints

### 1. Register User

**POST** `/api/auth/register`

```json
{
  "name": "Razeema",
  "email": "razeema@example.com",
  "password": "123456"
}
```

✅ Response:

```json
{
  "message": "User registered successfully"
}
```

---

### 2. Login User

**POST** `/api/auth/login`

```json
{
  "email": "razeema@example.com",
  "password": "123456"
}
```

✅ Response:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5..."
}
```

---

## 🗂️ Folder Structure

```
src/
├── config/
│   └── prisma.ts
│
├── controllers/
│   └── auth.controller.ts
│
├── routes/
│   └── auth.routes.ts
│
├── services/
│   └── auth.service.ts
│
├── repositories/
│   └── user.repository.ts
│
├── middlewares/
│   └── auth.middleware.ts
│
├── utils/
│   └── jwt.utils.ts
│
└── app.ts
```

---

## 🐳 Docker Compose Explained

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:16
    container_name: postgres_db
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: sugar_db
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

✅ **In simple words:**

* **image:** PostgreSQL version 16 will be downloaded and used.
* **container_name:** Name of the running container.
* **restart:** Always restart if it stops.
* **environment:** Sets up username, password, and DB name.
* **ports:** Maps local port 5432 to container port 5432.
* **volumes:** Keeps database data safe even if the container is removed.

---

## 🧠 Common Commands

| Command                | Description                                |
| ---------------------- | ------------------------------------------ |
| `pnpm run dev`         | Run the server in development mode         |
| `docker compose build` | Build Docker images                        |
| `docker compose up -d` | Start PostgreSQL & app in background       |
| `docker compose down`  | Stop and remove containers                 |
| `pnpm prisma studio`   | Open Prisma GUI (database viewer)          |
| `pnpm prisma generate` | Generate Prisma client                     |
| `pnpm prisma db push`  | Sync schema with database                  |

---

## 🧰 Troubleshooting

❌ **Error:** `The table "User" does not exist`  
✅ Run:
```bash
pnpm prisma db push
```

❌ **Error:** `secretOrPrivateKey must have a value`  
✅ Make sure `JWT_SECRET` is defined in `.env`.

❌ **Error:** `Database connection refused`  
✅ Make sure Docker is running and Postgres container is up:
```bash
docker ps
```

---

## 👩‍💻 Author

**Razeema R C**  
Backend Developer | Node.js | Prisma | PostgreSQL
