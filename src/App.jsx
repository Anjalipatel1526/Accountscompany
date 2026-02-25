import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider, useApp } from "./context/AppContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Layout } from "./components/layout/Layout";
import { CompanyLayout } from "./components/layout/CompanyLayout";
import { Toast } from "./components/ui/Toast";
import { Login } from "./pages/Login";
import { CompanyLogin } from "./pages/CompanyLogin";

// Admin pages
import { Dashboard } from "./pages/Dashboard";
import { Companies } from "./pages/Companies";
import { AdminDepartments } from "./pages/AdminDepartments";
import { Settings } from "./pages/Settings";

// Company pages
import { CompanyDashboard } from "./pages/CompanyDashboard";
import { CompanySettings } from "./pages/CompanySettings";

// ProtectedRoute: redirects to /login if not authenticated
function ProtectedRoute({ children, allowedRole }) {
  const { currentUser } = useAuth();
  if (!currentUser) return <Navigate to="/login" replace />;
  if (allowedRole && currentUser.role !== allowedRole) {
    return <Navigate to={currentUser.role === "admin" ? "/" : "/company"} replace />;
  }
  return children;
}

// Inner app that can access both contexts
function AppRoutes() {
  const { companies } = useApp();
  const { currentUser, login } = useAuth();

  const handleLogin = () => { }; // routing handled by ProtectedRoute redirects

  return (
    <Routes>
      {/* Login */}
      <Route
        path="/login"
        element={
          currentUser
            ? <Navigate to={currentUser.role === "admin" ? "/" : "/company"} replace />
            : <Login onLogin={handleLogin} />
        }
      />

      {/* Company portal login */}
      <Route
        path="/owner"
        element={
          currentUser
            ? <Navigate to={currentUser.role === "admin" ? "/" : "/company"} replace />
            : <CompanyLogin />
        }
      />

      {/* Admin routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute allowedRole="admin">
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="companies" element={<Companies />} />
        <Route path="departments" element={<AdminDepartments />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Company routes */}
      <Route
        path="/company"
        element={
          <ProtectedRoute allowedRole="company">
            <CompanyLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<CompanyDashboard />} />
        <Route path="settings" element={<CompanySettings />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

// Outer wrapper that passes companies to AuthProvider
function AuthGate() {
  const { companies } = useApp();
  return (
    <AuthProvider companies={companies}>
      <AppRoutes />
      <Toast />
    </AuthProvider>
  );
}

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AuthGate />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
