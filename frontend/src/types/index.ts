export enum TipoEspaco {
  SALA_REUNIAO = 'SALA_REUNIAO',
  ESTACAO_TRABALHO = 'ESTACAO_TRABALHO',
  AUDITORIO = 'AUDITORIO',
  LABORATORIO = 'LABORATORIO',
}

export enum StatusReserva {
  PENDENTE = 'PENDENTE',
  CONFIRMADA = 'CONFIRMADA',
  CANCELADA = 'CANCELADA',
  CONCLUIDA = 'CONCLUIDA',
}

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  empresa?: string;
  criadoEm: string;
}

export interface Coworking {
  id: string;
  nome: string;
  descricao: string;
  endereco: string;
  bairro: string;
  telefone: string;
  email?: string;
  imagens?: string[];
  website?: string;
  horarioAbertura?: string;
  horarioFechamento?: string;
  ativo: boolean;
  espacos?: Espaco[];
}

export interface Espaco {
  id: string;
  nome: string;
  descricao: string;
  tipo: TipoEspaco;
  capacidade: number;
  precoPorHora: number;
  recursos?: string[];
  imagens?: string[];
  disponivel: boolean;
  coworkingId: string;
  coworking?: Coworking;
}

export interface Reserva {
  id: string;
  usuarioId: string;
  espacoId: string;
  dataInicio: string;
  dataFim: string;
  valorTotal: number;
  status: StatusReserva;
  observacoes?: string;
  usuario?: Usuario;
  espaco?: Espaco;
  criadoEm: string;
}

export interface CreateUsuarioDto {
  nome: string;
  email: string;
  telefone: string;
  senha: string;
  empresa?: string;
}

export interface CreateReservaDto {
  espacoId: string;
  dataInicio: string;
  dataFim: string;
  observacoes?: string;
}
