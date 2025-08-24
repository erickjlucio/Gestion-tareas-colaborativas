import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../api';

export default function TaskDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const [task, setTask] = useState(null);
  const [status, setStatus] = useState('');
  const [comment, setComment] = useState('');
  const [file, setFile] = useState(null);
  const [err, setErr] = useState('');

  useEffect(() => { load(); }, [id]);
  const load = async () => {
    const t = await api.getTask(id);
    setTask(t);
    setStatus(t.status);
  };

  const save = async () => {
    try {
      await api.updateTask(id, { status }, file);
      await load();
      setFile(null);
    } catch (e) { setErr(e.message); }
  };
  const addComm = async () => {
    try {
      await api.addComment(id, comment);
      setComment('');
      await load();
    } catch (e) { setErr(e.message); }
  };
  const del = async () => {
    if (!confirm('¿Eliminar tarea?')) return;
    await api.deleteTask(id);
    nav('/');
  };

  if (!task) return <div>Cargando…</div>;
  const API_URL = import.meta.env.VITE_API_URL;
  const fileUrl = task.attachmentPath
    ? `${API_URL}/${task.attachmentPath}` // ahora es público
    : null;
  return (
    <div style={{ display:'grid', gap: 12 }}>
      <h2>{task.title}</h2>
      <div>{task.description}</div>
      <div>Vence: {task.dueDate || '—'}</div>
      <div>Estado:
        <select value={status} onChange={e=>setStatus(e.target.value)}>
          <option value="pending">Pendiente</option>
          <option value="in_progress">En progreso</option>
          <option value="completed">Completada</option>
        </select>
        <button onClick={save}>Guardar</button>
      </div>
      <div>
        <strong>Adjunto:</strong>{' '}
        {task.attachmentPath
          ? <a href={fileUrl} target="_blank" rel="noopener noreferrer">Descargar/Ver</a>
          : '—'}
        <div>
          <input type="file" onChange={e=>setFile(e.target.files[0])} />
        </div>
      </div>
      <div>
        <h3>Comentarios</h3>
        <ul>
          {task.comments?.map(c => (
            <li key={c.id}><em>{new Date(c.createdAt).toLocaleString()}</em> — {c.content}</li>
          ))}
        </ul>
        <div style={{ display:'flex', gap: 8 }}>
          <input value={comment} onChange={e=>setComment(e.target.value)} placeholder="Escribe un comentario" />
          <button onClick={addComm}>Agregar</button>
        </div>
      </div>
      <div><button style={{ background:'crimson', color:'#fff' }} onClick={del}>Eliminar tarea</button></div>
      {err && <div style={{ color:'crimson' }}>{err}</div>}
    </div>
  );
}
