import { Coworking } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { FaMapMarkerAlt, FaClock, FaPhone } from 'react-icons/fa';

interface CoworkingCardProps {
  coworking: Coworking;
}

export default function CoworkingCard({ coworking }: CoworkingCardProps) {
  const imagemPrincipal = coworking.imagens?.[0] || 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800';

  return (
    <Link href={`/coworkings/${coworking.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer h-full">
        <div className="relative h-48 w-full">
          <Image
            src={imagemPrincipal}
            alt={coworking.nome}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{coworking.nome}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{coworking.descricao}</p>
          
          <div className="space-y-2 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-primary-500" />
              <span>{coworking.bairro}</span>
            </div>
            {coworking.horarioAbertura && coworking.horarioFechamento && (
              <div className="flex items-center gap-2">
                <FaClock className="text-primary-500" />
                <span>{coworking.horarioAbertura} - {coworking.horarioFechamento}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <FaPhone className="text-primary-500" />
              <span>{coworking.telefone}</span>
            </div>
          </div>

          {coworking.espacos && coworking.espacos.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <span className="text-sm font-semibold text-primary-600">
                {coworking.espacos.length} espaço{coworking.espacos.length !== 1 ? 's' : ''} disponível{coworking.espacos.length !== 1 ? 'eis' : ''}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
