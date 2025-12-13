'use client';

import { useEffect, useState } from 'react';
import CoworkingCard from '@/components/CoworkingCard';
import { Coworking } from '@/types';
import { coworkingService } from '@/services';
import { toast } from 'react-toastify';

export default function Home() {
  const [coworkings, setCoworkings] = useState<Coworking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadCoworkings();
  }, []);

  const loadCoworkings = async () => {
    try {
      const data = await coworkingService.getAll();
      setCoworkings(data);
    } catch (error) {
      toast.error('Erro ao carregar coworkings');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCoworkings = coworkings.filter(coworking =>
    coworking.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coworking.bairro.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coworking.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Bem-vindo ao <span className="text-primary-500">Há Vagas</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Descubra e reserve os melhores espaços de coworking de Aracaju
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Buscar por nome, bairro ou descrição..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-500 transition-colors"
          />
        </div>
      </section>

      {/* Coworkings Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          <p className="mt-4 text-gray-600">Carregando coworkings...</p>
        </div>
      ) : filteredCoworkings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">Nenhum coworking encontrado.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCoworkings.map((coworking) => (
            <CoworkingCard key={coworking.id} coworking={coworking} />
          ))}
        </div>
      )}

      {/* Stats Section */}
      <section className="mt-16 bg-primary-500 text-white rounded-2xl p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-4xl font-bold mb-2">{coworkings.length}</h3>
            <p className="text-lg">Coworkings Parceiros</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold mb-2">
              {coworkings.reduce((acc, c) => acc + (c.espacos?.length || 0), 0)}
            </h3>
            <p className="text-lg">Espaços Disponíveis</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold mb-2">100%</h3>
            <p className="text-lg">Satisfação Garantida</p>
          </div>
        </div>
      </section>
    </div>
  );
}
