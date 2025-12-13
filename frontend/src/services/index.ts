import api from './api';
import { Coworking, Espaco, Reserva, CreateReservaDto, Usuario, CreateUsuarioDto } from '@/types';

export const coworkingService = {
  getAll: async (): Promise<Coworking[]> => {
    const response = await api.get('/coworkings');
    return response.data;
  },

  getById: async (id: string): Promise<Coworking> => {
    const response = await api.get(`/coworkings/${id}`);
    return response.data;
  },
};

export const espacoService = {
  getAll: async (coworkingId?: string): Promise<Espaco[]> => {
    const params = coworkingId ? { coworkingId } : {};
    const response = await api.get('/espacos', { params });
    return response.data;
  },

  getById: async (id: string): Promise<Espaco> => {
    const response = await api.get(`/espacos/${id}`);
    return response.data;
  },
};

export const reservaService = {
  getAll: async (usuarioId?: string, espacoId?: string): Promise<Reserva[]> => {
    const params: any = {};
    if (usuarioId) params.usuarioId = usuarioId;
    if (espacoId) params.espacoId = espacoId;
    const response = await api.get('/reservas', { params });
    return response.data;
  },

  getById: async (id: string): Promise<Reserva> => {
    const response = await api.get(`/reservas/${id}`);
    return response.data;
  },

  create: async (usuarioId: string, data: CreateReservaDto): Promise<Reserva> => {
    const response = await api.post(`/reservas?usuarioId=${usuarioId}`, data);
    return response.data;
  },

  update: async (id: string, status: string): Promise<Reserva> => {
    const response = await api.put(`/reservas/${id}`, { status });
    return response.data;
  },

  cancel: async (id: string): Promise<void> => {
    await api.delete(`/reservas/${id}`);
  },

  confirmar: async (id: string): Promise<Reserva> => {
    const response = await api.put(`/reservas/${id}/confirmar`);
    return response.data;
  },

  concluir: async (id: string): Promise<Reserva> => {
    const response = await api.put(`/reservas/${id}/concluir`);
    return response.data;
  },

  getAgenda: async (espacoId: string, dataInicio: string, dataFim: string): Promise<Reserva[]> => {
    const response = await api.get(`/reservas/agenda/${espacoId}`, {
      params: { dataInicio, dataFim },
    });
    return response.data;
  },
};

export const usuarioService = {
  getAll: async (): Promise<Usuario[]> => {
    const response = await api.get('/usuarios');
    return response.data;
  },

  getById: async (id: string): Promise<Usuario> => {
    const response = await api.get(`/usuarios/${id}`);
    return response.data;
  },

  create: async (data: CreateUsuarioDto): Promise<Usuario> => {
    const response = await api.post('/usuarios', data);
    return response.data;
  },
};
