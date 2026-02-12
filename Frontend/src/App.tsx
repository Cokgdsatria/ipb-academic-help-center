// ============================================================
// 🎯 APP.TSX - Root Component & Routing Configuration
// ============================================================

import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import useAuth from "./hooks/useAuth";
import useNotification from "./hooks/useNotification";

// Pages
import LoginPage from "./components/Pages/LoginPage";
import DashboardPage from "./components/Pages/DashboardPage";
import RequestFormPage from "./components/Pages/RequestFormPage";
import RequestListPage from "./components/Pages/RequestListPage";

// Common Components
import Navbar from "./components/Common/Navbar";

// Protected Route Component
interface ProtectedRouteProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
  userRole?: string;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  isAuthenticated,
  userRole,
  allowedRoles,
}) => {
  // Check both state and localStorage to handle async state updates
  const storedUser = localStorage.getItem("user");
  const isUserValid = isAuthenticated || !!storedUser;

  if (!isUserValid) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  const { user, isAuthenticated, login, logout } = useAuth();
  const { unreadCount, fetchNotifications } = useNotification();
  const [showNavbar, setShowNavbar] = useState(true);

  // Fetch notifications when user login
  useEffect(() => {
    if (isAuthenticated && user?.id) {
      fetchNotifications(user.id);
    }
  }, [isAuthenticated, user?.id]);

  // Show/hide navbar based on route and auth state
  useEffect(() => {
    const path = window.location.pathname;
    setShowNavbar(!path.startsWith("/login") && isAuthenticated);
  }, [isAuthenticated]);

  return (
    <Router>
      {/* Show Navbar only on protected pages */}
      {showNavbar && isAuthenticated && (
        <Navbar
          user={user}
          onLogout={logout}
          unreadNotifications={unreadCount}
        />
      )}

      {/* Main Routes */}
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <LoginPage />
            )
          }
        />

        {/* Protected Routes */}

        {/* Dashboard - All authenticated users */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <DashboardPage user={user} />
            </ProtectedRoute>
          }
        />

        {/* Request Management */}

        {/* List Requests - All authenticated users */}
        <Route
          path="/requests"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <RequestListPage user={user} />
            </ProtectedRoute>
          }
        />

        {/* Create New Request - Mahasiswa only */}
        <Route
          path="/requests/new"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              userRole={user?.role}
              allowedRoles={["mahasiswa"]}
            >
              <RequestFormPage user={user} />
            </ProtectedRoute>
          }
        />

        {/* Edit Request - Mahasiswa only */}
        <Route
          path="/requests/:requestId/edit"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              userRole={user?.role}
              allowedRoles={["mahasiswa"]}
            >
              <RequestFormPage user={user} />
            </ProtectedRoute>
          }
        />

        {/* Default Route */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* 404 - Not Found */}
        <Route
          path="*"
          element={
            <div className="max-w-md mx-auto mt-12 text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
              <p className="text-gray-600 mb-6">Halaman tidak ditemukan</p>
              <a
                href="/dashboard"
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Kembali ke Dashboard
              </a>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
