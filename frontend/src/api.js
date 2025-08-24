const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export function saveAuth(token, user) {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
}
export function getToken() { return localStorage.getItem('token'); }
export function getUser() { try { return JSON.parse(localStorage.getItem('user')||'null'); } catch { return null; } }
export function clearAuth() { localStorage.removeItem('token'); localStorage.removeItem('user'); }

async function request(path, { method='GET', data, formData }={}) {
  const headers = {};
  const token = getToken();
  if (!formData) headers['Content-Type'] = 'application/json';
  if (token) headers['Authorization'] = 'Bearer ' + token;
  const body = formData ? formData : data ? JSON.stringify(data) : undefined;
  const res = await fetch(`${API_URL}${path}`, { method, headers, body });
  if (!res.ok) {
    let msg = 'Error';
    try { const j = await res.json(); msg = j.error || JSON.stringify(j); } catch {}
    throw new Error(msg);
  }
  const ct = res.headers.get('content-type') || '';
  if (ct.includes('application/json')) return res.json();
  return res;
}

export const api = {
  login: (email, password) => request('/auth/login', { method:'POST', data:{ email, password } }),
  register: (name, email, password, role) => request('/auth/register', { method:'POST', data:{ name, email, password, role } }),
  myTasks: () => request('/tasks'),
  allTasks: () => request('/tasks?all=1'),
  createTask: (payload, file) => {
    const fd = new FormData();
    Object.entries(payload).forEach(([k,v]) => { if (v !== undefined && v !== null) fd.append(k, v); });
    if (file) fd.append('attachment', file);
    return request('/tasks', { method:'POST', formData: fd });
  },
  updateTask: (id, payload, file) => {
    const fd = new FormData();
    Object.entries(payload).forEach(([k,v]) => { if (v !== undefined && v !== null) fd.append(k, v); });
    if (file) fd.append('attachment', file);
    return request(`/tasks/${id}`, { method:'PUT', formData: fd });
  },
  getTask: (id) => request(`/tasks/${id}`),
  deleteTask: (id) => request(`/tasks/${id}`, { method:'DELETE' }),
  addComment: (id, content) => request(`/tasks/${id}/comments`, { method:'POST', data:{ content } }),
  comments: (id) => request(`/tasks/${id}/comments`),
  recentNotifications: () => request('/notifications/recent?limit=10'),
  attachmentUrl: (id) => `${API_URL}/tasks/${id}/attachment`,
  uploadsBase: () => `${API_URL}/uploads`
};
