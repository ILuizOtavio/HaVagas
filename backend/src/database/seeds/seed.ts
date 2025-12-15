import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Coworking } from '../../entities/coworking.entity';
import { Espaco, TipoEspaco } from '../../entities/espaco.entity';
import { Usuario } from '../../entities/usuario.entity';
import { Reserva, StatusReserva } from '../../entities/reserva.entity';
import dataSource from '../../config/database.config';

// Função exportável para executar o seed
export async function runSeed(existingDataSource?: DataSource) {
  const ds = existingDataSource || dataSource;
  
  if (!existingDataSource) {
    await ds.initialize();
    console.log('🔌 Conectado ao banco de dados');
  }

  try {
    const usuarioRepository = ds.getRepository(Usuario);
    const coworkingRepository = ds.getRepository(Coworking);
    const espacoRepository = ds.getRepository(Espaco);
    const reservaRepository = ds.getRepository(Reserva);

    // Sincronizar schema (criar tabelas se não existirem) - só necessário em desenvolvimento
    if (!existingDataSource) {
      await ds.synchronize();
      console.log('📋 Tabelas criadas/verificadas');
    }

    // Limpar dados existentes (se houver)
    try {
      await reservaRepository.clear();
      await espacoRepository.clear();
      await coworkingRepository.clear();
      await usuarioRepository.clear();
      console.log('🗑️  Dados antigos removidos');
    } catch (error) {
      console.log('ℹ️  Tabelas vazias ou recém criadas');
    }

    // Criar usuários de exemplo
    const hashedPassword = await bcrypt.hash('123456', 10);
    
    const usuarios = await usuarioRepository.save([
      {
        nome: 'João Silva',
        email: 'joao@email.com',
        telefone: '(79) 99999-1111',
        senha: hashedPassword,
        empresa: 'Tech Solutions',
      },
      {
        nome: 'Maria Santos',
        email: 'maria@email.com',
        telefone: '(79) 99999-2222',
        senha: hashedPassword,
        empresa: 'Digital Marketing',
      },
      {
        nome: 'Pedro Costa',
        email: 'pedro@email.com',
        telefone: '(79) 99999-3333',
        senha: hashedPassword,
        empresa: 'Startup XYZ',
      },
    ]);

    console.log('✅ Usuários criados:', usuarios.length);

    // Criar Coworkings de Aracaju
    const coworkings = await coworkingRepository.save([
      {
        nome: 'CAJUHUB',
        descricao: 'O maior hub de inovação de Sergipe. Espaço de coworking, eventos e networking para empreendedores e startups.',
        endereco: 'Av. Dr. Carlos Rodrigues da Cruz, 1285',
        bairro: 'Capucho',
        telefone: '(79) 3021-5050',
        email: 'contato@cajuhub.com',
        website: 'https://cajuhub.com',
        horarioAbertura: '08:00',
        horarioFechamento: '18:00',
        imagens: [
          'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
          'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800',
        ],
        ativo: true,
      },
      {
        nome: 'UNITWORK Coworking',
        descricao: 'Espaço colaborativo com infraestrutura completa para profissionais autônomos e empresas.',
        endereco: 'Av. Beira Mar, 3984',
        bairro: 'Jardins',
        telefone: '(79) 3246-1234',
        email: 'contato@unitwork.com.br',
        horarioAbertura: '07:00',
        horarioFechamento: '20:00',
        imagens: [
          'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800',
        ],
        ativo: true,
      },
      {
        nome: 'Hub de Inovação Unit',
        descricao: 'Centro de inovação da Universidade Tiradentes, focado em tecnologia e empreendedorismo.',
        endereco: 'Av. Murilo Dantas, 300',
        bairro: 'Farolândia',
        telefone: '(79) 3218-2100',
        email: 'hub@unit.br',
        website: 'https://unit.br/hub',
        horarioAbertura: '08:00',
        horarioFechamento: '22:00',
        imagens: [
          'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800',
        ],
        ativo: true,
      },
      {
        nome: 'Work Espacos Compartilhados',
        descricao: 'Ambiente profissional com salas privativas e espaços compartilhados no centro de Aracaju.',
        endereco: 'Rua Laranjeiras, 542',
        bairro: 'Centro',
        telefone: '(79) 3211-5678',
        email: 'contato@workaju.com.br',
        horarioAbertura: '08:00',
        horarioFechamento: '19:00',
        imagens: [
          'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800',
        ],
        ativo: true,
      },
      {
        nome: 'StartSE',
        descricao: 'Comunidade de startups e empreendedores com foco em tecnologia e inovação.',
        endereco: 'Rua Campo do Brito, 785',
        bairro: 'São José',
        telefone: '(79) 99999-5555',
        email: 'aju@start.se',
        website: 'https://start.se',
        horarioAbertura: '09:00',
        horarioFechamento: '18:00',
        imagens: [
          'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800',
        ],
        ativo: true,
      },
    ]);

    console.log('✅ Coworkings criados:', coworkings.length);

    // Criar espaços para cada coworking
    const espacos = [];

    // CAJUHUB - Espaços variados
    espacos.push(
      ...(await espacoRepository.save([
        {
          nome: 'Sala de Reunião Premium',
          descricao: 'Sala executiva com TV 55", sistema de videoconferência e ar-condicionado.',
          tipo: TipoEspaco.SALA_REUNIAO,
          capacidade: 10,
          precoPorHora: 80.0,
          recursos: ['TV 55"', 'Videoconferência', 'Ar-condicionado', 'Quadro branco', 'Wi-Fi'],
          imagens: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=800'],
          disponivel: true,
          coworkingId: coworkings[0].id,
        },
        {
          nome: 'Estação Hot Desk',
          descricao: 'Mesa compartilhada em ambiente colaborativo com acesso a todas as áreas comuns.',
          tipo: TipoEspaco.ESTACAO_TRABALHO,
          capacidade: 1,
          precoPorHora: 15.0,
          recursos: ['Wi-Fi', 'Energia', 'Café', 'Ar-condicionado'],
          imagens: ['https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800'],
          disponivel: true,
          coworkingId: coworkings[0].id,
        },
        {
          nome: 'Auditório Principal',
          descricao: 'Auditório completo para eventos, palestras e workshops.',
          tipo: TipoEspaco.AUDITORIO,
          capacidade: 80,
          precoPorHora: 250.0,
          recursos: ['Projetor 4K', 'Som profissional', 'Microfones', 'Palco', 'Ar-condicionado'],
          imagens: ['https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800'],
          disponivel: true,
          coworkingId: coworkings[0].id,
        },
        {
          nome: 'Lab de Inovação',
          descricao: 'Laboratório equipado para desenvolvimento de tecnologia e prototipagem.',
          tipo: TipoEspaco.LABORATORIO,
          capacidade: 15,
          precoPorHora: 120.0,
          recursos: ['Computadores', 'Impressora 3D', 'Arduino', 'Ferramentas', 'Wi-Fi'],
          imagens: ['https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800'],
          disponivel: true,
          coworkingId: coworkings[0].id,
        },
      ])),
    );

    // UNITWORK - Foco em espaços executivos
    espacos.push(
      ...(await espacoRepository.save([
        {
          nome: 'Sala Executiva A',
          descricao: 'Sala privativa para reuniões executivas com vista para o mar.',
          tipo: TipoEspaco.SALA_REUNIAO,
          capacidade: 6,
          precoPorHora: 70.0,
          recursos: ['TV', 'Ar-condicionado', 'Café', 'Wi-Fi'],
          imagens: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=800'],
          disponivel: true,
          coworkingId: coworkings[1].id,
        },
        {
          nome: 'Estação Fixa',
          descricao: 'Mesa fixa individual em ambiente silencioso.',
          tipo: TipoEspaco.ESTACAO_TRABALHO,
          capacidade: 1,
          precoPorHora: 20.0,
          recursos: ['Armário', 'Wi-Fi', 'Energia', 'Ar-condicionado'],
          imagens: ['https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800'],
          disponivel: true,
          coworkingId: coworkings[1].id,
        },
        {
          nome: 'Sala de Reunião B',
          descricao: 'Sala de reunião confortável para equipes pequenas.',
          tipo: TipoEspaco.SALA_REUNIAO,
          capacidade: 4,
          precoPorHora: 50.0,
          recursos: ['TV', 'Quadro', 'Ar-condicionado', 'Wi-Fi'],
          imagens: ['https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800'],
          disponivel: true,
          coworkingId: coworkings[1].id,
        },
      ])),
    );

    // Hub Unit - Foco acadêmico e tecnológico
    espacos.push(
      ...(await espacoRepository.save([
        {
          nome: 'Lab de Desenvolvimento',
          descricao: 'Laboratório com computadores de alta performance para desenvolvimento.',
          tipo: TipoEspaco.LABORATORIO,
          capacidade: 20,
          precoPorHora: 100.0,
          recursos: ['Computadores i7', 'Monitores duplos', 'Wi-Fi', 'Ar-condicionado'],
          imagens: ['https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800'],
          disponivel: true,
          coworkingId: coworkings[2].id,
        },
        {
          nome: 'Auditório Tech',
          descricao: 'Auditório com infraestrutura para eventos de tecnologia.',
          tipo: TipoEspaco.AUDITORIO,
          capacidade: 100,
          precoPorHora: 300.0,
          recursos: ['Projetor', 'Som', 'Streaming', 'Ar-condicionado'],
          imagens: ['https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800'],
          disponivel: true,
          coworkingId: coworkings[2].id,
        },
        {
          nome: 'Sala Maker',
          descricao: 'Espaço para criação e prototipagem de projetos.',
          tipo: TipoEspaco.LABORATORIO,
          capacidade: 10,
          precoPorHora: 90.0,
          recursos: ['Ferramentas', 'Impressora 3D', 'Eletrônicos', 'Wi-Fi'],
          imagens: ['https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800'],
          disponivel: true,
          coworkingId: coworkings[2].id,
        },
      ])),
    );

    // Work Espaços - Foco profissional
    espacos.push(
      ...(await espacoRepository.save([
        {
          nome: 'Sala Profissional',
          descricao: 'Sala de reunião para atendimentos profissionais.',
          tipo: TipoEspaco.SALA_REUNIAO,
          capacidade: 4,
          precoPorHora: 45.0,
          recursos: ['TV', 'Ar-condicionado', 'Wi-Fi'],
          imagens: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=800'],
          disponivel: true,
          coworkingId: coworkings[3].id,
        },
        {
          nome: 'Escritório Privativo',
          descricao: 'Escritório fechado para até 3 pessoas.',
          tipo: TipoEspaco.ESTACAO_TRABALHO,
          capacidade: 3,
          precoPorHora: 60.0,
          recursos: ['Mesas', 'Armários', 'Ar-condicionado', 'Wi-Fi'],
          imagens: ['https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800'],
          disponivel: true,
          coworkingId: coworkings[3].id,
        },
      ])),
    );

    // StartSE - Foco em startups
    espacos.push(
      ...(await espacoRepository.save([
        {
          nome: 'Sala de Brainstorming',
          descricao: 'Sala criativa para sessões de ideação e planejamento.',
          tipo: TipoEspaco.SALA_REUNIAO,
          capacidade: 8,
          precoPorHora: 55.0,
          recursos: ['Quadro branco', 'Post-its', 'Marcadores', 'Wi-Fi', 'Ar-condicionado'],
          imagens: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=800'],
          disponivel: true,
          coworkingId: coworkings[4].id,
        },
        {
          nome: 'Bancada Startup',
          descricao: 'Mesa para equipes de startups em crescimento.',
          tipo: TipoEspaco.ESTACAO_TRABALHO,
          capacidade: 4,
          precoPorHora: 40.0,
          recursos: ['Mesas', 'Cadeiras', 'Wi-Fi', 'Café'],
          imagens: ['https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800'],
          disponivel: true,
          coworkingId: coworkings[4].id,
        },
      ])),
    );

    console.log('✅ Espaços criados:', espacos.length);

    // Criar algumas reservas de exemplo
    const hoje = new Date();
    const amanha = new Date(hoje);
    amanha.setDate(amanha.getDate() + 1);

    const reservas = await reservaRepository.save([
      {
        usuarioId: usuarios[0].id,
        espacoId: espacos[0].id,
        dataInicio: new Date(hoje.setHours(14, 0, 0)),
        dataFim: new Date(hoje.setHours(16, 0, 0)),
        valorTotal: 160.0,
        status: StatusReserva.CONFIRMADA,
        observacoes: 'Reunião com investidores',
      },
      {
        usuarioId: usuarios[1].id,
        espacoId: espacos[1].id,
        dataInicio: new Date(hoje.setHours(9, 0, 0)),
        dataFim: new Date(hoje.setHours(18, 0, 0)),
        valorTotal: 135.0,
        status: StatusReserva.CONFIRMADA,
        observacoes: 'Dia de trabalho',
      },
      {
        usuarioId: usuarios[2].id,
        espacoId: espacos[2].id,
        dataInicio: new Date(amanha.setHours(10, 0, 0)),
        dataFim: new Date(amanha.setHours(12, 0, 0)),
        valorTotal: 500.0,
        status: StatusReserva.PENDENTE,
        observacoes: 'Workshop de inovação',
      },
    ]);

    console.log('✅ Reservas criadas:', reservas.length);

    console.log('\n✨ Seed concluído com sucesso!');
    console.log(`\n📊 Resumo:`);
    console.log(`   - ${usuarios.length} usuários`);
    console.log(`   - ${coworkings.length} coworkings`);
    console.log(`   - ${espacos.length} espaços`);
    console.log(`   - ${reservas.length} reservas`);
    console.log(`\n🔐 Senha padrão para todos os usuários: 123456\n`);

    if (!existingDataSource) {
      await ds.destroy();
    }
  } catch (error) {
    console.error('❌ Erro ao executar seed:', error);
    if (!existingDataSource) {
      await ds.destroy();
    }
    throw error;
  }
}

// Função para execução standalone via npm run seed
async function seed() {
  try {
    await runSeed();
  } catch (error) {
    process.exit(1);
  }
}

// Executar apenas se chamado diretamente
if (require.main === module) {
  seed();
}
