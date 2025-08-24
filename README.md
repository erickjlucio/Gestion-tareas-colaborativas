# Rocnarf – Sistema de gestión de tareas colaborativas

Monorepo con:
- `backend/` Node.js + Express + PostgreSQL (Sequelize)
- `frontend/` React + Vite
- `mobile/` React Native (Expo)
- `backend/sql/schema.sql` para crear tablas

## Puesta en marcha rápida
1) **Base de datos**
   - Crea una DB PostgreSQL y ajusta `DATABASE_URL` en `backend/.env`.
   - Opcional: ejecuta `backend/sql/schema.sql` con `psql` si prefieres no usar `sequelize.sync()`.
2) **Backend**
   ```bash
   cd backend
   cp .env.example .env
   npm install
   npm run dev
   ```
3) **Frontend web**
   ```bash
   cd ../frontend
   cp .env.example .env
   npm install
   npm run dev
   ```
4) **Móvil (Expo)**
   ```bash
   cd ../mobile
   npm install
   npm start
   ```

## Usuarios y roles
- Registro y login con JWT.
- Roles: `user` y `admin`.
- Panel admin: `/admin` en frontend muestra todas las tareas (o `/tasks?all=1` en API).

## Archivos
- Subida de adjuntos con `multer` al directorio `/uploads` del servidor.
- Descarga con `GET /tasks/:id/attachment` o acceso directo vía `/uploads/...`.
