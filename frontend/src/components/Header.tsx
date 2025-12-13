'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaBuilding, FaCalendarAlt, FaUser, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';
import { useAuth } from '@/contexts/AuthContext';

export default function Header() {
  const { usuario, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className="bg-primary-500 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold hover:opacity-80 transition">
            <FaBuilding />
            <span>Há Vagas</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link 
              href="/" 
              className="flex items-center gap-2 hover:opacity-80 transition font-medium"
            >
              <FaBuilding />
              Coworkings
            </Link>
            {isAuthenticated && (
              <Link 
                href="/reservas" 
                className="flex items-center gap-2 hover:opacity-80 transition font-medium"
              >
                <FaCalendarAlt />
                Minhas Reservas
              </Link>
            )}
            
            {isAuthenticated ? (
              <div className="flex items-center gap-4 border-l pl-6 ml-2">
                <div className="flex items-center gap-2">
                  <FaUser className="text-sm" />
                  <span className="text-sm">{usuario?.nome}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 hover:opacity-80 transition font-medium text-sm bg-white/10 px-3 py-1.5 rounded-lg"
                >
                  <FaSignOutAlt />
                  Sair
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 hover:opacity-80 transition font-medium bg-white/10 px-4 py-2 rounded-lg"
              >
                <FaSignInAlt />
                Entrar
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
