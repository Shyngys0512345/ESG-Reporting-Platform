import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // В реальности здесь будет API-запрос к бэкенду
  const [user, setUser] = useState({ name: 'Admin User', role: 'admin' }); 

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};