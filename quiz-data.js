// Conteúdo do diagnóstico. Editar aqui não afeta o esquema do banco.

const PROFILES = {
  direcionador: {
    key: 'direcionador',
    name: 'Direcionador',
    color: '#E85D3C',
    tagline: 'Lidera pela clareza, pelo dado e pelo prazo.',
    description:
      'Você assume o controle diante da pressão. Vai direto aos números, encontra o gargalo e transforma o problema em um plano de ação com dono e prazo. Sua equipe sabe exatamente o que fazer depois de falar com você. O ponto de atenção é lembrar de ouvir antes de decidir — nem toda meta perdida é só uma questão de execução.',
  },
  desenvolvedor: {
    key: 'desenvolvedor',
    name: 'Desenvolvedor',
    color: '#4FA97A',
    tagline: 'Lidera formando pessoas, uma a uma.',
    description:
      'Antes de cobrar resultado, você investiga a causa: falta capacitação? Apoio? Confiança? Você constrói a meta através do crescimento de cada agente, e por isso sua equipe tende a evoluir de forma consistente. O ponto de atenção é o ritmo — em momentos de crise aguda, o time pode precisar de uma direção mais rápida e objetiva.',
  },
  colaborativo: {
    key: 'colaborativo',
    name: 'Colaborativo',
    color: '#4C8FD4',
    tagline: 'Lidera construindo decisões junto com o time.',
    description:
      'Você acredita que a melhor estratégia nasce da equipe, não de uma sala fechada. Reúne, escuta e decide coletivamente, o que gera adesão genuína ao plano. O ponto de atenção é a velocidade de decisão: em cenários urgentes, buscar consenso demais pode atrasar a resposta que a operação precisa.',
  },
  executor: {
    key: 'executor',
    name: 'Executor',
    color: '#C9A24B',
    tagline: 'Lidera pelo exemplo, com a mão na massa.',
    description:
      'Você não manda de longe — vai a campo, senta com o agente, mostra como se faz. Isso gera respeito imediato e resolve o problema na prática. O ponto de atenção é a delegação: ao assumir a frente com frequência, você pode acabar centralizando tarefas que a equipe precisa aprender a resolver sozinha.',
  },
};

const QUESTIONS = [
  {
    text: 'Quando a equipe está abaixo da meta de desembolso ou carteira, você normalmente:',
    options: [
      { letter: 'A', profile: 'direcionador', text: 'Analisa imediatamente os números, identifica os gargalos e cobra um plano de ação claro com prazos definidos.' },
      { letter: 'B', profile: 'desenvolvedor', text: 'Conversa individualmente com cada agente para entender as dificuldades pessoais ou operacionais que estão atrapalhando.' },
      { letter: 'C', profile: 'colaborativo', text: 'Reúne toda a equipe para analisar o cenário coletivamente e construir juntos uma estratégia de reação.' },
      { letter: 'D', profile: 'executor', text: 'Assume a frente, vai a campo com os agentes e ajuda diretamente no atendimento ou na prospecção para virar o jogo.' },
    ],
  },
  {
    text: 'Quando o Banco/Polo lança uma nova diretriz ou mudança operacional:',
    options: [
      { letter: 'A', profile: 'direcionador', text: 'Explica o motivo da mudança, define exatamente o que cada um deve fazer e acompanha o cumprimento das novas regras.' },
      { letter: 'B', profile: 'desenvolvedor', text: 'Busca escutar as inseguranças ou dúvidas da equipe primeiro, garantindo que todos se sintam acolhidos na transição.' },
      { letter: 'C', profile: 'colaborativo', text: 'Envolve a equipe na definição de como vão implementar essa mudança na rotina da unidade da melhor forma.' },
      { letter: 'D', profile: 'executor', text: 'Aplica a mudança imediatamente no dia a dia para que a equipe veja o novo processo funcionando na prática.' },
    ],
  },
  {
    text: 'Ao identificar que um integrante da equipe está com alto índice de inadimplência (risco), sua primeira atitude é:',
    options: [
      { letter: 'A', profile: 'direcionador', text: 'Estabelecer uma rotina rígida de acompanhamento diário da régua de cobrança e cobrar postura do agente.' },
      { letter: 'B', profile: 'desenvolvedor', text: 'Fazer uma sessão de feedback orientativo para entender se falta capacitação ou suporte e ajudá-lo a evoluir.' },
      { letter: 'C', profile: 'colaborativo', text: 'Promover uma troca de boas práticas entre ele e os agentes que estão com baixo risco na unidade.' },
      { letter: 'D', profile: 'executor', text: 'Ir a campo junto com o agente para analisar in loco o perfil das renovações e a abordagem aos clientes.' },
    ],
  },
  {
    text: 'Como você define o seu papel no planejamento mensal da unidade?',
    options: [
      { letter: 'A', profile: 'direcionador', text: 'O estrategista que define as metas por carteira, distribui a carga de trabalho e monitora a execução diária.' },
      { letter: 'B', profile: 'desenvolvedor', text: 'O mentor que identifica os pontos fortes de cada pessoa e busca desenvolver o potencial de cada um para batermos a meta.' },
      { letter: 'C', profile: 'colaborativo', text: 'O facilitador que promove debates com a equipe para que o planejamento seja uma decisão de todos.' },
      { letter: 'D', profile: 'executor', text: 'O líder operacional que puxa a fila, dá o ritmo de trabalho e mostra como se faz na prática.' },
    ],
  },
  {
    text: 'O que você considera mais compensador no seu trabalho como gestor?',
    options: [
      { letter: 'A', profile: 'direcionador', text: 'Ver a unidade no topo do ranking, cumprindo 100% das metas e diretrizes estabelecidas.' },
      { letter: 'B', profile: 'desenvolvedor', text: 'Ver a evolução profissional e pessoal dos integrantes da minha equipe ao longo do tempo.' },
      { letter: 'C', profile: 'colaborativo', text: 'Ter um ambiente de trabalho harmonioso, unido e onde todos participam ativamente das decisões.' },
      { letter: 'D', profile: 'executor', text: 'Superar os desafios operacionais do dia a dia e entregar resultados rápidos e consistentes.' },
    ],
  },
];
