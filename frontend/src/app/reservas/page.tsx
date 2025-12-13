'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ReservaCard from '@/components/ReservaCard';
import { Reserva } from '@/types';
import { reservaService } from '@/services';
import { toast } from 'react-toastify';
import { useAuth } from '@/contexts/AuthContext';

export default function ReservasPage() {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(true);
  const { usuario, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      toast.info('Faça login para ver suas reservas');
      router.push('/login');
      return;
    }

    if (usuario) {
      loadReservas(usuario.id);
    }
  }, [usuario, isAuthenticated, router]);

  const loadReservas = async (usuarioId: string) => {
    setLoading(true);
    try {
      const data = await reservaService.getAll(usuarioId);
      setReservas(data);
    } catch (error) {
      toast.error('Erro ao carregar reservas');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelar = async (id: string) => {
    if (!confirm('Deseja realmente cancelar esta reserva?')) {
      return;
    }

    try {
      await reservaService.cancel(id);
      toast.success('Reserva cancelada com sucesso!');
      if (usuario) {
        loadReservas(usuario.id);
      }
    } catch (error) {
      toast.error('Erro ao cancelar reserva');
      console.error(error);
    }
  };

  const handleConfirmar = async (id: string) => {
    try {
      await reservaService.confirmar(id);
      toast.success('Reserva confirmada com sucesso!');
      if (usuario) {
        loadReservas(usuario.id);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erro ao confirmar reserva');
      console.error(error);
    }
  };

  const handleConcluir = async (id: string) => {
    try {
      await reservaService.concluir(id);
      toast.success('Reserva concluída!');
      if (usuario) {
        loadReservas(usuario.id);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erro ao concluir reserva');
      console.error(error);
    }
  };

  if (!isAuthenticated) {
    return null; // Vai redirecionar no useEffect
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Minhas Reservas</h1>

      {/* Informação do Usuário */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
            <span className="text-primary-600 font-bold text-xl">
              {usuario?.nome.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <p className="font-semibold text-gray-800">{usuario?.nome}</p>
            <p className="text-sm text-gray-500">{usuario?.email}</p>
          </div>
        </div>
      </div>

      {/* Lista de Reservas */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          <p className="mt-4 text-gray-600">Carregando reservas...</p>
        </div>
      ) : reservas.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">Nenhuma reserva encontrada.</p>
          <p className="text-gray-500 mt-2">Explore nossos coworkings e faça sua primeira reserva!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reservas.map((reserva) => (
            <ReservaCard
              key={reserva.id}
              reserva={reserva}
              onCancelar={handleCancelar}
              onConfirmar={handleConfirmar}
              onConcluir={handleConcluir}
            />
          ))}
        </div>
      )}
    </div>
  );
}
