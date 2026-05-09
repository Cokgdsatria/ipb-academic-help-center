import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider, useAuth } from './context/AuthContext';
import PageTransition from './components/PageTransition';
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
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={<PageTransition><LoginPage /></PageTransition>} />

      <Route path="/" element={
        user
          ? <Navigate to={user.role.toUpperCase() === 'DOSEN' ? '/dosen/beranda' : '/beranda'} replace />
          : <Navigate to="/login" replace />
      } />

      {/* Mahasiswa */}
      <Route path="/beranda" element={
        <PageTransition><ProtectedRoute requiredRole="mahasiswa"><BerandaMahasiswa /></ProtectedRoute></PageTransition>
      } />
      <Route path="/tiket/baru" element={
        <PageTransition><ProtectedRoute requiredRole="MAHASISWA"><BukaTiketBaru /></ProtectedRoute></PageTransition>
      } />
      <Route path="/tiket" element={
        <PageTransition><ProtectedRoute requiredRole="MAHASISWA"><TiketPage /></ProtectedRoute></PageTransition>
      } />
      <Route path="/tiket/:id" element={
        <PageTransition><ProtectedRoute requiredRole="MAHASISWA"><DetailTiket /></ProtectedRoute></PageTransition>
      } />

      {/* Dosen */}
      <Route path="/dosen/beranda" element={
        <PageTransition><ProtectedRoute requiredRole="DOSEN"><BerandaDosen /></ProtectedRoute></PageTransition>
      } />
      <Route path="/dosen/pengajuan" element={
        <PageTransition><ProtectedRoute requiredRole="DOSEN"><PengajuanDosen /></ProtectedRoute></PageTransition>
      } />

      <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
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
