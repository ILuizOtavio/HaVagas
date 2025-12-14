'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

interface Usuario {
  id: string;
  nome: string;
  email: string;
  telefone?: string;
  empresa?: string;
}

interface AuthContextType {
  usuario: Usuario | null;
  token: string | null;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Versão do banco de dados (mudou de PostgreSQL para SQLite)
    const DB_VERSION = 'sqlite-v1';
    const storedVersion = localStorage.getItem('db_version');

    // Se a versão mudou ou não existe, limpar dados antigos
    if (storedVersion !== DB_VERSION) {
      localStorage.clear();
      localStorage.setItem('db_version', DB_VERSION);
      setLoading(false);
      return;
    }

    // Recuperar do localStorage ao carregar
    const storedToken = localStorage.getItem('token');
    const storedUsuario = localStorage.getItem('usuario');

    if (storedToken && storedUsuario) {
      setToken(storedToken);
      setUsuario(JSON.parse(storedUsuario));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, senha: string) => {
    try {
      const response = await axios.post('http://localhost:3001/usuarios/login', {
        email,
        senha,
      });

      const { usuario, token } = response.data;

      setUsuario(usuario);
      setToken(token);

      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(usuario));

      toast.success(`Bem-vindo(a), ${usuario.nome}!`);
    } catch (error: any) {
      console.error('Erro ao fazer login:', error);
      toast.error(error.response?.data?.message || 'Email ou senha inválidos');
      throw error;
    }
  };

  const logout = () => {
    setUsuario(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    toast.info('Logout realizado com sucesso');
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        token,
        login,
        logout,
        isAuthenticated: !!usuario,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
