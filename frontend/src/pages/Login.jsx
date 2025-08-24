import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api, saveAuth } from '../api';

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token, user } = await api.login(email, password);
      saveAuth(token, user);
      nav('/');
    } catch (e) { setErr(e.message); }
  };
  return (
    <div style={{ maxWidth: 420, margin: '64px auto' }}>
      <h2>Iniciar sesión</h2>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 8 }}>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input placeholder="Contraseña" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        {err && <div style={{ color:'crimson' }}>{err}</div>}
        <button>Entrar</button>
      </form>
      <p>¿No tienes cuenta? <Link to="/register">Regístrate</Link></p>
    </div>
  );
}
