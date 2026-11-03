import { ChatMessage } from '../models/gym.models';

export const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'm1',
    studentId: '01',
    from: 'aluno',
    text: 'Senti um puxão leve na lombar no stiff. Posso trocar por um exercício com apoio?',
    at: '09:12',
  },
  {
    id: 'm2',
    studentId: '01',
    from: 'personal',
    text: 'Sim. Troca pelo stiff no smith e reduz a amplitude. Mantém o core travado.',
    at: '09:20',
  },
  {
    id: 'm3',
    studentId: '02',
    from: 'aluno',
    text: 'Hoje fechei o supino com drop-set. Posso subir 5kg na próxima?',
    at: '18:40',
  },
  {
    id: 'm4',
    studentId: '02',
    from: 'personal',
    text: 'Pode. Sobe no primeiro exercício e mantém o drop-set só na última série.',
    at: '19:02',
  },
  {
    id: 'm5',
    studentId: '03',
    from: 'aluno',
    text: 'Ainda fico insegura no agachamento. Tem vídeo curto pra eu revisar?',
    at: '11:05',
  },
  {
    id: 'm6',
    studentId: '03',
    from: 'personal',
    text: 'Usa o GymBot para o vídeo e me chama se a dor voltar. Foco em amplitude confortável.',
    at: '11:18',
  },
  {
    id: 'm7',
    studentId: '04',
    from: 'aluno',
    text: 'Ombro direito estalou no desenvolvimento. Sigo ou paro?',
    at: '07:50',
  },
  {
    id: 'm8',
    studentId: '04',
    from: 'personal',
    text: 'Pausa no desenvolvimento. Faz só face pull e mobilidade hoje.',
    at: '08:04',
  },
  {
    id: 'm9',
    studentId: '05',
    from: 'aluno',
    text: 'Joelho ok no leg press, mas fiquei na dúvida da posição dos pés.',
    at: '16:22',
  },
  {
    id: 'm10',
    studentId: '05',
    from: 'personal',
    text: 'Pés mais altos e largura dos ombros. Sem bounce no final da descida.',
    at: '16:30',
  },
];
