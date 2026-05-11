import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, User, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import IPBLogo from './IPBLogo';
import { useState } from 'react';

export default function Navbar({ role = 'mahasiswa' }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const mahasiswaLinks = [
    { label: 'Beranda', to: '/beranda' },
    { label: 'Buka Tiket Baru', to: '/tiket/baru' },
    { label: 'Tiket', to: '/tiket' },
  ];

  const dosenLinks = [
    { label: 'Beranda', to: '/dosen/beranda' },
    { label: 'Buka Tiket Pengajuan', to: '/dosen/pengajuan' },
  ];

  const userRole = user?.role?.toUpperCase();
  const links = userRole === 'DOSEN' ? dosenLinks : mahasiswaLinks;

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <IPBLogo size={40} />
          <div className="leading-tight">
            <div className="text-sm font-bold text-blue-700">IPB Logicore</div>
            <div className="text-xs text-gray-500">Help Center</div>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium relative pb-1 ${
                  isActive
                    ? 'text-blue-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600 after:rounded-full'
                    : 'text-gray-600 hover:text-blue-600 transition-colors'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Desktop User */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <User size={16} className="text-gray-500" />
            </div>
            <span className="text-sm font-medium text-gray-700 max-w-[120px] truncate">{user?.nama || 'User'}</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <LogOut size={15} />
            <span>Keluar</span>
          </button>
        </div>

        {/* Mobile: Hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-4 pt-2 shadow-md">
          {/* User info mobile */}
          <div className="flex items-center gap-2 py-3 border-b border-gray-100 mb-3">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <User size={16} className="text-gray-500" />
            </div>
            <span className="text-sm font-medium text-gray-700">{user?.nama || 'User'}</span>
          </div>
          {/* Links mobile */}
          <div className="flex flex-col gap-1">
            {links.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`px-3 py-2.5 rounded-lg text-sm font-medium ${
                    isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors mt-1"
            >
              <LogOut size={15} />
              Keluar
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
