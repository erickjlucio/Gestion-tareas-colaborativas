import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api, getUser } from '../api';

export default function TasksList() {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [dueFilter, setDueFilter] = useState('');
  const [notifs, setNotifs] = useState([]);
  const user = getUser();

  useEffect(() => {
    load();
    api.recentNotifications().then(setNotifs).catch(()=>{});
  }, []);

  const load = async () => {
    const list = await api.myTasks();
    setTasks(list);
  };

  const filtered = tasks.filter(t => (!statusFilter || t.status === statusFilter) && (!dueFilter || t.dueDate === dueFilter));

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <h2 style={{ marginRight: 'auto' }}>Mis Tareas</h2>
        <Link to="/tasks/new"><button>Nueva tarea</button></Link>
        {user?.role === 'admin' && <Link to="/admin"><button>Panel admin</button></Link>}
      </div>

      <div style={{ display:'flex', gap: 8 }}>
        <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}>
          <option value="">Todos los estados</option>
          <option value="pending">Pendiente</option>
          <option value="in_progress">En progreso</option>
          <option value="completed">Completada</option>
        </select>
        <input type="date" value={dueFilter} onChange={e=>setDueFilter(e.target.value)} />
      </div>

      <ul style={{ display:'grid', gap: 8, listStyle:'none', padding:0 }}>
        {filtered.map(t => (
          <li key={t.id} style={{ border:'1px solid #ddd', borderRadius:8, padding:12 }}>
            <div style={{ display:'flex', gap:8 }}>
              <div style={{ fontWeight: 700 }}>{t.title}</div>
              <div style={{ marginLeft: 'auto' }}><Link to={`/tasks/${t.id}`}><button>Ver</button></Link></div>
            </div>
            <div>Estado: {t.status} · Vence: {t.dueDate || '—'}</div>
            <div>Asignado a: {t.assignedTo?.name || '—'}</div>
          </li>
        ))}
      </ul>

      <div>
        <h3>Notificaciones recientes</h3>
        <ul>
          {notifs.map(n => <li key={n.id}>{new Date(n.createdAt).toLocaleString()} — {n.message}</li>)}
        </ul>
      </div>
    </div>
  );
}
