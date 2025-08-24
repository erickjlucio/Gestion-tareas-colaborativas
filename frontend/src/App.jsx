import React from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import TasksList from './pages/TasksList';
import TaskForm from './pages/TaskForm';
import TaskDetail from './pages/TaskDetail';
import AdminPanel from './pages/AdminPanel';
import { getToken, clearAuth } from './api';
import "../App.css";

function PrivateRoute({ children }) {
  const tok = getToken();
  return tok ? children : <Navigate to="/login" />;
}

export default function App() {
  const tok = getToken();
  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <h1 className="app-logo">
          <Link to="/">Rocnarf · Gestión de Tareas</Link>
        </h1>
        {tok ? (
          <button
            onClick={() => {
              clearAuth();
              location.href = "/login";
            }}
            className="logout-btn"
          >
            Salir
          </button>
        ) : null}
      </header>

      {/* Main */}
      <main className="app-main">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <TasksList />
              </PrivateRoute>
            }
          />
          <Route
            path="/tasks/new"
            element={
              <PrivateRoute>
                <TaskForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/tasks/:id"
            element={
              <PrivateRoute>
                <TaskDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminPanel />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}
