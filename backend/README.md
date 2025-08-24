# Backend (Express + PostgreSQL)

## Requisitos
- Node 18+
- PostgreSQL 13+
- Configura `.env` a partir de `.env.example`

## Instalar
```bash
cd backend
npm install
# crear DB y correr el SQL si lo prefieres manualmente
# psql < sql/schema.sql
npm run dev
```

## Endpoints principales
- `POST /auth/register` { name, email, password, role? }
- `POST /auth/login` { email, password }
- `GET /tasks` (mis tareas asignadas) — `?all=1` (admin) o `GET /tasks/admin/all` solo admin
- `POST /tasks` (multipart con `attachment`) — Crea tarea
- `GET /tasks/:id`
- `PUT /tasks/:id` (multipart con `attachment` opcional) — Actualiza (genera notificación si cambia `status`)
- `DELETE /tasks/:id`
- `GET /tasks/:id/comments`
- `POST /tasks/:id/comments` { content }
- `GET /tasks/:id/attachment` — Descarga el adjunto
- `GET /notifications/recent?limit=10` — Notificaciones recientes ligadas a mis tareas asignadas
- Archivos estáticos: `/uploads/...`

JWT en `Authorization: Bearer <token>`.
