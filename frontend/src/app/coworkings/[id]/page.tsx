'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Coworking, Espaco, CreateReservaDto } from '@/types';
import { coworkingService, espacoService, reservaService } from '@/services';
import EspacoCard from '@/components/EspacoCard';
import { toast } from 'react-toastify';
import { FaMapMarkerAlt, FaClock, FaPhone, FaEnvelope, FaGlobe, FaArrowLeft } from 'react-icons/fa';
import { useAuth } from '@/contexts/AuthContext';

export default function CoworkingPage() {
  const params = useParams();
  const router = useRouter();
  const { usuario, isAuthenticated } = useAuth();
  const [coworking, setCoworking] = useState<Coworking | null>(null);
  const [espacos, setEspacos] = useState<Espaco[]>([]);
  const [loading, setLoading] = useState(true);
  const [showReservaModal, setShowReservaModal] = useState(false);
  const [selectedEspaco, setSelectedEspaco] = useState<Espaco | null>(null);
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [observacoes, setObservacoes] = useState('');

  useEffect(() => {
    if (params.id) {
      loadCoworking(params.id as string);
      loadEspacos(params.id as string);
    }
  }, [params.id]);

  const loadCoworking = async (id: string) => {
    try {
      const data = await coworkingService.getById(id);
      setCoworking(data);
    } catch (error) {
      toast.error('Erro ao carregar coworking');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadEspacos = async (coworkingId: string) => {
    try {
      const data = await espacoService.getAll(coworkingId);
      setEspacos(data);
    } catch (error) {
      toast.error('Erro ao carregar espaços');
      console.error(error);
    }
  };

  const handleReservar = (espaco: Espaco) => {
    if (!isAuthenticated) {
      toast.info('Faça login para fazer uma reserva');
      router.push('/login');
      return;
    }
    setSelectedEspaco(espaco);
    setShowReservaModal(true);
  };

  const handleSubmitReserva = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!dataInicio || !dataFim) {
      toast.warning('Preencha todos os campos obrigatórios');
      return;
    }

    if (new Date(dataFim) <= new Date(dataInicio)) {
      toast.error('A data de término deve ser posterior à data de início');
      return;
    }

    try {
      const reservaData: CreateReservaDto = {
        espacoId: selectedEspaco!.id,
        dataInicio,
        dataFim,
        observacoes,
      };

      await reservaService.create(usuario!.id, reservaData);
      toast.success('Reserva criada com sucesso!');
      setShowReservaModal(false);
      resetForm();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erro ao criar reserva');
      console.error(error);
    }
  };

  const resetForm = () => {
    setDataInicio('');
    setDataFim('');
    setObservacoes('');
    setSelectedEspaco(null);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!coworking) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-xl text-gray-600">Coworking não encontrado.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-6 font-medium"
      >
        <FaArrowLeft /> Voltar
      </button>

      {/* Header */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
        {coworking.imagens && coworking.imagens.length > 0 && (
          <div className="relative h-80 w-full">
            <Image
              src={coworking.imagens[0]}
              alt={coworking.nome}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{coworking.nome}</h1>
          <p className="text-lg text-gray-600 mb-6">{coworking.descricao}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-primary-500 text-xl" />
              <div>
                <p className="font-semibold">Endereço</p>
                <p>{coworking.endereco}, {coworking.bairro}</p>
              </div>
            </div>

            {coworking.horarioAbertura && coworking.horarioFechamento && (
              <div className="flex items-center gap-3">
                <FaClock className="text-primary-500 text-xl" />
                <div>
                  <p className="font-semibold">Horário</p>
                  <p>{coworking.horarioAbertura} - {coworking.horarioFechamento}</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <FaPhone className="text-primary-500 text-xl" />
              <div>
                <p className="font-semibold">Telefone</p>
                <p>{coworking.telefone}</p>
              </div>
            </div>

            {coworking.email && (
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-primary-500 text-xl" />
                <div>
                  <p className="font-semibold">Email</p>
                  <p>{coworking.email}</p>
                </div>
              </div>
            )}

            {coworking.website && (
              <div className="flex items-center gap-3">
                <FaGlobe className="text-primary-500 text-xl" />
                <div>
                  <p className="font-semibold">Website</p>
                  <a href={coworking.website} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                    Visitar site
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Espaços */}
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Espaços Disponíveis</h2>
        {espacos.length === 0 ? (
          <p className="text-gray-600">Nenhum espaço disponível no momento.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {espacos.map((espaco) => (
              <EspacoCard key={espaco.id} espaco={espaco} onReservar={handleReservar} />
            ))}
          </div>
        )}
      </div>

      {/* Modal de Reserva */}
      {showReservaModal && selectedEspaco && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold mb-4">Reservar: {selectedEspaco.nome}</h3>
            <form onSubmit={handleSubmitReserva}>
              <div className="mb-4 bg-primary-50 p-3 rounded-lg">
                <p className="text-sm font-semibold text-gray-700">Reservando como:</p>
                <p className="text-gray-600">{usuario?.nome}</p>
                <p className="text-xs text-gray-500">{usuario?.email}</p>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Data e Hora de Início *
                </label>
                <input
                  type="datetime-local"
                  value={dataInicio}
                  onChange={(e) => setDataInicio(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Data e Hora de Término *
                </label>
                <input
                  type="datetime-local"
                  value={dataFim}
                  onChange={(e) => setDataFim(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Observações
                </label>
                <textarea
                  value={observacoes}
                  onChange={(e) => setObservacoes(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                  rows={3}
                  placeholder="Informações adicionais (opcional)"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowReservaModal(false);
                    resetForm();
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                >
                  Confirmar Reserva
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
