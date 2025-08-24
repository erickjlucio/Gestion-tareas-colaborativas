import React, { useEffect, useState } from 'react';
import { api } from '../api';

export default function AdminPanel() {
  const [tasks, setTasks] = useState([]);
  const [err, setErr] = useState('');
  useEffect(() => { load(); }, []);
  const load = async () => {
    try { setTasks(await api.allTasks()); } catch (e) { setErr(e.message); }
  };
  return (
    <div>
      <h2>Panel de administración</h2>
      {err && <div style={{ color:'crimson' }}>{err}</div>}
      <table border="1" cellPadding="6">
        <thead><tr><th>ID</th><th>Título</th><th>Estado</th><th>Asignado</th><th>Vence</th></tr></thead>
        <tbody>
          {tasks.map(t => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.title}</td>
              <td>{t.status}</td>
              <td>{t.assignedTo?.name || '—'}</td>
              <td>{t.dueDate || '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
