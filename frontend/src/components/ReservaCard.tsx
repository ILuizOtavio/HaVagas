import { Reserva, StatusReserva } from '@/types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { FaCalendar, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

interface ReservaCardProps {
  reserva: Reserva;
  onCancelar?: (id: string) => void;
  onConfirmar?: (id: string) => void;
  onConcluir?: (id: string) => void;
}

const statusLabels: Record<StatusReserva, string> = {
  [StatusReserva.PENDENTE]: 'Pendente',
  [StatusReserva.CONFIRMADA]: 'Confirmada',
  [StatusReserva.CANCELADA]: 'Cancelada',
  [StatusReserva.CONCLUIDA]: 'Concluída',
};

const statusColors: Record<StatusReserva, string> = {
  [StatusReserva.PENDENTE]: 'bg-yellow-100 text-yellow-800',
  [StatusReserva.CONFIRMADA]: 'bg-green-100 text-green-800',
  [StatusReserva.CANCELADA]: 'bg-red-100 text-red-800',
  [StatusReserva.CONCLUIDA]: 'bg-blue-100 text-blue-800',
};

export default function ReservaCard({ reserva, onCancelar, onConfirmar, onConcluir }: ReservaCardProps) {
  const dataInicio = new Date(reserva.dataInicio);
  const dataFim = new Date(reserva.dataFim);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-bold text-gray-800">{reserva.espaco?.nome}</h3>
          <p className="text-sm text-gray-600">{reserva.espaco?.coworking?.nome}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[reserva.status]}`}>
          {statusLabels[reserva.status]}
        </span>
      </div>

      <div className="space-y-2 mb-3 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <FaCalendar className="text-primary-500" />
          <span>{format(dataInicio, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaClock className="text-primary-500" />
          <span>{format(dataInicio, 'HH:mm')} - {format(dataFim, 'HH:mm')}</span>
        </div>
        {reserva.espaco?.coworking && (
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-primary-500" />
            <span>{reserva.espaco.coworking.bairro}</span>
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 pt-3">
        <div className="flex justify-between items-center mb-3">
          <div>
            <span className="text-xs text-gray-500">Valor Total:</span>
            <p className="text-lg font-bold text-primary-600">R$ {Number(reserva.valorTotal).toFixed(2)}</p>
          </div>
        </div>

        {/* Botões de ação */}
        <div className="flex gap-2 flex-wrap">
          {onConfirmar && reserva.status === StatusReserva.PENDENTE && (
            <button
              onClick={() => onConfirmar(reserva.id)}
              className="flex-1 px-3 py-2 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-colors"
            >
              Confirmar
            </button>
          )}
          
          {onConcluir && reserva.status === StatusReserva.CONFIRMADA && (
            <button
              onClick={() => onConcluir(reserva.id)}
              className="flex-1 px-3 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
            >
              Concluir
            </button>
          )}
          
          {onCancelar && reserva.status === StatusReserva.PENDENTE && (
            <button
              onClick={() => onCancelar(reserva.id)}
              className="flex-1 px-3 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-colors"
            >
              Cancelar
            </button>
          )}
        </div>
      </div>

      {reserva.observacoes && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <p className="text-xs text-gray-500">Observações:</p>
          <p className="text-sm text-gray-700">{reserva.observacoes}</p>
        </div>
      )}
    </div>
  );
}
