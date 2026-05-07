import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import IPBLogo from './IPBLogo';

export default function Navbar({ role = 'mahasiswa' }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

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

  // const links = role === 'dosen' ? dosenLinks : mahasiswaLinks;
  const userRole = user?.role?.toUpperCase();
  const links = userRole === 'DOSEN' ? dosenLinks : mahasiswaLinks;

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <IPBLogo size={40} />
          <div className="leading-tight">
            <div className="text-sm font-bold text-blue-700">IPB Logicore</div>
            <div className="text-xs text-gray-500">Help Center</div>
          </div>
        </div>

        {/* Nav Links */}
        <div className="flex items-center gap-6">
          {links.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors relative pb-1 ${
                  isActive
                    ? 'text-blue-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600 after:rounded-full'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* User */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <User size={16} className="text-gray-500" />
            </div>
            <span className="text-sm font-medium text-gray-700">{user?.nama || 'User'}</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <LogOut size={15} />
            <span>Keluar</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
