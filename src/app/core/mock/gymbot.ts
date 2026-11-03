import { ChatMessage } from '../models/gym.models';

interface GymBotRule {
  keywords: string[];
  text: string;
  video: { title: string; youtubeId: string };
}

const RULES: GymBotRule[] = [
  {
    keywords: ['stiff', 'levantamento romeno', 'posterior'],
    text: 'Para o Stiff, mantenha a coluna reta, ombros afastados da orelha e um leve flexão dos joelhos. Empurre o quadril para trás e sinta o posterior. Não arredonde a lombar.',
    video: { title: 'Execução do Stiff (romeno)', youtubeId: 'CN_sX4b3N8s' },
  },
  {
    keywords: ['leg press', 'legpress', 'pés', 'glúteo', 'gluteo'],
    text: 'Para focar mais nos glúteos e posteriores no Leg Press, posicione os pés mais acima na plataforma, na largura dos ombros. Mantenha o calcanhar firme e empurre por ele, sem soltar o quadril do encosto.',
    video: { title: 'Leg Press com pés altos', youtubeId: 'yQuyhKLmISo' },
  },
  {
    keywords: ['agachamento', 'squat'],
    text: 'No agachamento, pés na largura dos ombros, joelhos acompanhando a ponta dos pés e peito aberto. Desça só até a amplitude sem dor e suba empurrando o chão.',
    video: { title: 'Agachamento com boa execução', youtubeId: 'ultWZbUMPL8' },
  },
  {
    keywords: ['hip thrust', 'elevação pélvica', 'glute bridge'],
    text: 'Apoie a lombar no banco, queixo levemente baixo e empurre o quadril para cima até o corpo formar uma linha reta. Segure 1 segundo no topo, contraindo o glúteo.',
    video: { title: 'Hip thrust com contração de pico', youtubeId: 'xDm2p2GZ9xI' },
  },
];

const FALLBACK: GymBotRule = {
  keywords: [],
  text: 'Anota a dúvida! Enquanto isso: aqueça, priorize a execução e pare se houver dor articular. Você também pode falar com o seu personal neste mesmo suporte.',
  video: { title: 'Aquecimento e execução segura', youtubeId: 'IODxDxX7oi4' },
};

export function replyAsGymBot(studentId: string, studentName: string, question: string): ChatMessage {
  const q = question.toLowerCase();
  const rule = RULES.find((item) => item.keywords.some((word) => q.includes(word))) ?? FALLBACK;
  return {
    id: crypto.randomUUID(),
    studentId,
    from: 'gymbot',
    text: `Olá, ${studentName.split(' ')[0]}! ${rule.text}`,
    at: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    video: rule.video,
  };
}
