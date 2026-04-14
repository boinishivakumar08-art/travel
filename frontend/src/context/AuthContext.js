'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const res = await fetch(`https://travel-x2dx.onrender.com/api/auth/me`, {
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      if (data.user) {
        setUser(data.user);
      }
    } catch (err) {
      console.error('Auth check failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await fetch(`https://travel-x2dx.onrender.com/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
      });
      setUser(null);
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, checkUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
