import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import BerandaMahasiswa from './pages/BerandaMahasiswa';
import BerandaDosen from './pages/BerandaDosen';
import BukaTiketBaru from './pages/BukaTiketBaru';
import TiketPage from './pages/TiketPage';
import DetailTiket from './pages/DetailTiket';
import PengajuanDosen from './pages/PengajuanDosen';

function ProtectedRoute({ children, requiredRole }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  // if (requiredRole && user.role !== requiredRole) {
  //   return <Navigate to={user.role === 'dosen' ? '/dosen/beranda' : '/beranda'} replace />;
  // }
  if (requiredRole && user.role.toUpperCase() !== requiredRole.toUpperCase()) {
    return <Navigate to={user.role.toUpperCase() === 'DOSEN' ? '/dosen/beranda' : '/beranda'} replace />;
  }
  return children;
}

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route path="/" element={
        user
          ? <Navigate to={user.role.toUpperCase() === 'DOSEN' ? '/dosen/beranda' : '/beranda'} replace />
          : <Navigate to="/login" replace />
      } />

      {/* Mahasiswa */}
      <Route path="/beranda" element={
        <ProtectedRoute requiredRole="mahasiswa"><BerandaMahasiswa /></ProtectedRoute>
      } />
      <Route path="/tiket/baru" element={
        <ProtectedRoute requiredRole="MAHASISWA"><BukaTiketBaru /></ProtectedRoute>
      } />
      <Route path="/tiket" element={
        <ProtectedRoute requiredRole="MAHASISWA"><TiketPage /></ProtectedRoute>
      } />
      <Route path="/tiket/:id" element={
        <ProtectedRoute requiredRole="MAHASISWA"><DetailTiket /></ProtectedRoute>
      } />

      {/* Dosen */}
      <Route path="/dosen/beranda" element={
        <ProtectedRoute requiredRole="DOSEN"><BerandaDosen /></ProtectedRoute>
      } />
      <Route path="/dosen/pengajuan" element={
        <ProtectedRoute requiredRole="DOSEN"><PengajuanDosen /></ProtectedRoute>
      } />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
