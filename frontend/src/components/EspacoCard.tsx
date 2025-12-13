import { Espaco, TipoEspaco } from '@/types';
import Image from 'next/image';
import { FaUsers, FaDollarSign, FaCheckCircle } from 'react-icons/fa';

interface EspacoCardProps {
  espaco: Espaco;
  onReservar: (espaco: Espaco) => void;
}

const tipoLabels: Record<TipoEspaco, string> = {
  [TipoEspaco.SALA_REUNIAO]: 'Sala de Reunião',
  [TipoEspaco.ESTACAO_TRABALHO]: 'Estação de Trabalho',
  [TipoEspaco.AUDITORIO]: 'Auditório',
  [TipoEspaco.LABORATORIO]: 'Laboratório',
};

const tipoColors: Record<TipoEspaco, string> = {
  [TipoEspaco.SALA_REUNIAO]: 'bg-blue-100 text-blue-800',
  [TipoEspaco.ESTACAO_TRABALHO]: 'bg-green-100 text-green-800',
  [TipoEspaco.AUDITORIO]: 'bg-purple-100 text-purple-800',
  [TipoEspaco.LABORATORIO]: 'bg-orange-100 text-orange-800',
};

export default function EspacoCard({ espaco, onReservar }: EspacoCardProps) {
  const imagemPrincipal = espaco.imagens?.[0] || 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 w-full">
        <Image
          src={imagemPrincipal}
          alt={espaco.nome}
          fill
          className="object-cover"
        />
        <div className="absolute top-2 right-2">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${tipoColors[espaco.tipo]}`}>
            {tipoLabels[espaco.tipo]}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-2">{espaco.nome}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{espaco.descricao}</p>
        
        <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <FaUsers className="text-primary-500" />
            <span>{espaco.capacidade} pessoas</span>
          </div>
          <div className="flex items-center gap-1">
            <FaDollarSign className="text-primary-500" />
            <span className="font-semibold">R$ {Number(espaco.precoPorHora).toFixed(2)}/h</span>
          </div>
        </div>

        {espaco.recursos && espaco.recursos.length > 0 && (
          <div className="mb-3">
            <p className="text-xs font-semibold text-gray-700 mb-1">Recursos:</p>
            <div className="flex flex-wrap gap-1">
              {espaco.recursos.slice(0, 3).map((recurso, index) => (
                <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                  {recurso}
                </span>
              ))}
              {espaco.recursos.length > 3 && (
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                  +{espaco.recursos.length - 3}
                </span>
              )}
            </div>
          </div>
        )}

        <button
          onClick={() => onReservar(espaco)}
          disabled={!espaco.disponivel}
          className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors ${
            espaco.disponivel
              ? 'bg-primary-500 text-white hover:bg-primary-600'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {espaco.disponivel ? 'Reservar Agora' : 'Indisponível'}
        </button>
      </div>
    </div>
  );
}
