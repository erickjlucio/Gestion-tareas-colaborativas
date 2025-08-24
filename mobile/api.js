import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://10.0.2.2:4000'; // Android emulator -> localhost

export async function saveAuth(token, user) {
  await AsyncStorage.setItem('token', token);
  await AsyncStorage.setItem('user', JSON.stringify(user));
}
export async function getToken() { return await AsyncStorage.getItem('token'); }
export async function getUser() { const u = await AsyncStorage.getItem('user'); return u ? JSON.parse(u) : null; }
export async function clearAuth() { await AsyncStorage.multiRemove(['token','user']); }

async function request(path, { method='GET', data, formData }={}) {
  const headers = {};
  const token = await getToken();
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
  getTask: (id) => request(`/tasks/${id}`),
  updateTask: (id, payload) => request(`/tasks/${id}`, { method:'PUT', data: payload }),
  addComment: (id, content) => request(`/tasks/${id}/comments`, { method:'POST', data:{ content } }),
  attachmentUrl: (id) => `${API_URL}/tasks/${id}/attachment`
};
