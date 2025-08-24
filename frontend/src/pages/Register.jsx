import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api, saveAuth } from '../api';

export default function Register() {
  const nav = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [err, setErr] = useState('');
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token, user } = await api.register(name, email, password, role);
      saveAuth(token, user);
      nav('/');
    } catch (e) { setErr(e.message); }
  };
  return (
    <div style={{ maxWidth: 480, margin: '64px auto' }}>
      <h2>Registro</h2>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 8 }}>
        <input placeholder="Nombre" value={name} onChange={e=>setName(e.target.value)} />
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input placeholder="Contraseña" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <label>Rol
          <select value={role} onChange={e=>setRole(e.target.value)}>
            <option value="user">Usuario</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        {err && <div style={{ color:'crimson' }}>{err}</div>}
        <button>Crear cuenta</button>
      </form>
      <p>¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
    </div>
  );
}
