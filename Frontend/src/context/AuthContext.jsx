import { createContext, useContext, useState } from 'react';
import { dummyUser } from '../data/dummy';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    if (username === 'mahasiswa' && password === dummyUser.mahasiswa.password) {
      setUser(dummyUser.mahasiswa);
      return { success: true, role: 'mahasiswa' };
    }
    if (username === 'dosen' && password === dummyUser.dosen.password) {
      setUser(dummyUser.dosen);
      return { success: true, role: 'dosen' };
    }
    return { success: false };
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
