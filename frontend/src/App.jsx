import React from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import TasksList from './pages/TasksList';
import TaskForm from './pages/TaskForm';
import TaskDetail from './pages/TaskDetail';
import AdminPanel from './pages/AdminPanel';
import { getToken, clearAuth } from './api';

function PrivateRoute({ children }) {
  const tok = getToken();
  return tok ? children : <Navigate to="/login" />;
}

export default function App() {
  const tok = getToken();
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: 16 }}>
      <header style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}>
        <h1 style={{ marginRight: 'auto' }}><Link to="/">Rocnarf Tasks</Link></h1>
        {tok ? <button onClick={() => { clearAuth(); location.href='/login'; }}>Salir</button> : null}
      </header>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<PrivateRoute><TasksList /></PrivateRoute>} />
        <Route path="/tasks/new" element={<PrivateRoute><TaskForm /></PrivateRoute>} />
        <Route path="/tasks/:id" element={<PrivateRoute><TaskDetail /></PrivateRoute>} />
        <Route path="/admin" element={<PrivateRoute><AdminPanel /></PrivateRoute>} />
      </Routes>
    </div>
  );
}
