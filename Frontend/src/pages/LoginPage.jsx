import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import IPBLogo from '../components/IPBLogo';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    const result = await login(email, password);
    if (result.success) {
      // navigate(result.role === 'dosen' ? '/dosen/beranda' : '/beranda');
      if (result.role === 'DOSEN') {
        navigate('/beranda-dosen');
      } else {
        navigate('/beranda-mahasiswa');
      }
    } else {
      setError('Email atau password salah. Pastikan data sudah sesuai di database.');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT PANEL */}
      <div className="w-1/2 relative flex flex-col justify-between p-10 overflow-hidden">

        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700" />

        {/* Pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* IMAGE BACKGROUND (INI YANG KAMU GANTI) */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{
            backgroundImage: "url('/bg-login.jpg')"
          }}
        />

        {/* CONTENT */}
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <IPBLogo size={44} white />
            <div>
              <div className="text-white font-bold text-lg">IPB Academic</div>
              <div className="text-blue-200 text-sm">Help Center</div>
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <h1 className="text-white text-4xl font-bold mb-3">Selamat Datang</h1>
          <p className="text-blue-200 text-base max-w-xs">
            Silahkan masuk untuk melanjutkan ke Help Center
          </p>

          <div className="mt-6 flex items-center gap-2">
            <div className="h-1 w-12 bg-white rounded-full" />
            <div className="h-1.5 w-1.5 bg-blue-300 rounded-full" />
          </div>
        </div>

        <div className="relative z-10 text-blue-300 text-xs">
          © 2026 IPB University
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-1/2 flex items-center justify-center bg-white px-16">
        <div className="w-full max-w-md">

          {/* HEADER */}
          <div className="mb-8">
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
              <Lock size={26} className="text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Masuk ke Akun</h2>

            <div className="flex items-center gap-2 mt-3">
              <div className="h-1 w-10 bg-blue-600 rounded-full" />
              <div className="h-1.5 w-1.5 bg-blue-300 rounded-full" />
            </div>
          </div>

          {/* FORM */}
          <form onSubmit={handleLogin} className="space-y-5">

            {/* USERNAME */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Masukkan email"
                  className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <User size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                  className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
            </div>

            {/* ERROR */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg px-4 py-3">
                {error}
              </div>
            )}

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl"
            >
              Masuk
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}