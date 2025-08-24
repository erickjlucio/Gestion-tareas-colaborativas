import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';

export default function TaskForm() {
  const nav = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [dueDate, setDueDate] = useState('');
  const [assignedUserId, setAssignedUserId] = useState('');
  const [file, setFile] = useState(null);
  const [err, setErr] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      const payload = { title, description, status, dueDate, assignedUserId: assignedUserId || null };
      const task = await api.createTask(payload, file);
      nav(`/tasks/${task.id}`);
    } catch (e) { setErr(e.message); }
  };

  return (
    <div style={{ maxWidth: 640, margin: '0 auto' }}>
      <h2>Nueva tarea</h2>
      <form onSubmit={submit} style={{ display: 'grid', gap: 8 }}>
        <input placeholder="Título" value={title} onChange={e=>setTitle(e.target.value)} />
        <textarea placeholder="Descripción" value={description} onChange={e=>setDescription(e.target.value)} />
        <label>Estado
          <select value={status} onChange={e=>setStatus(e.target.value)}>
            <option value="pending">Pendiente</option>
            <option value="in_progress">En progreso</option>
            <option value="completed">Completada</option>
          </select>
        </label>
        <label>Fecha de vencimiento
          <input type="date" value={dueDate} onChange={e=>setDueDate(e.target.value)} />
        </label>
        <label>ID usuario asignado (opcional)
          <input value={assignedUserId} onChange={e=>setAssignedUserId(e.target.value)} />
        </label>
        <label>Archivo adjunto
          <input type="file" onChange={e=>setFile(e.target.files[0])} />
        </label>
        {err && <div style={{ color:'crimson' }}>{err}</div>}
        <button>Crear</button>
      </form>
    </div>
  );
}
