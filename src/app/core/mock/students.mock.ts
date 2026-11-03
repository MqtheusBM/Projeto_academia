import { Student, Exercise, WorkoutSheet, Weekday } from '../models/gym.models';

function ex(id: string, name: string, sets: number, reps: number, loadKg: number): Exercise {
  return { id, name, sets, reps, loadKg };
}

function sheet(weekday: Weekday, focus: string, exercises: Exercise[], rest = false): WorkoutSheet {
  return { weekday, focus, exercises, rest };
}

export const STUDENTS: Student[] = [
  {
    id: '01',
    name: 'Ana Clara',
    sex: 'F',
    age: 27,
    plan: 'trimestral',
    daysRemaining: 45,
    weeklyFocus: 'Glúteos e Quadríceps',
    goal: 'Ganho de volume no glúteo para o verão.',
    careNote: 'Tem leve desconforto na lombar, preferir exercícios com apoio.',
    email: 'ana@gym.com',
    trainedWeekdays: ['seg', 'qua'],
    sheets: [
      sheet('seg', 'Glúteos e inferiores', [
        ex('a-s1', 'Agachamento no smith com apoio', 4, 12, 40),
        ex('a-s2', 'Elevação pélvica', 4, 15, 30),
        ex('a-s3', 'Cadeira extensora', 3, 12, 25),
        ex('a-s4', 'Abdução no cabo', 3, 15, 12),
      ]),
      sheet('ter', 'Superiores e cardio', [
        ex('a-t1', 'Remada baixa', 3, 12, 20),
        ex('a-t2', 'Desenvolvimento halter', 3, 10, 6),
        ex('a-t3', 'Esteira inclinada', 1, 20, 0),
      ]),
      sheet('qua', 'Glúteos e posteriores', [
        ex('a-q1', 'Hip thrust', 4, 12, 50),
        ex('a-q2', 'Stiff com apoio', 3, 10, 20),
        ex('a-q3', 'Afundo búlgaro assistido', 3, 10, 8),
      ]),
      sheet('qui', 'Superiores e core', [
        ex('a-h1', 'Puxada frente', 3, 12, 25),
        ex('a-h2', 'Crucifixo máquina', 3, 12, 10),
        ex('a-h3', 'Prancha', 3, 40, 0),
      ]),
      sheet('sex', 'Glúteos e quadríceps', [
        ex('a-x1', 'Leg press alto', 4, 12, 80),
        ex('a-x2', 'Cadeira flexora', 3, 12, 20),
        ex('a-x3', 'Glúteo no cabo', 4, 15, 15),
      ]),
      sheet('sab', 'Mobilidade e caminhada', [
        ex('a-b1', 'Mobilidade de quadril', 2, 10, 0),
        ex('a-b2', 'Caminhada leve', 1, 30, 0),
      ]),
      sheet('dom', 'Descanso', [], true),
    ],
    history: [
      { date: '27/10', focus: 'Glúteos', completed: true },
      { date: '29/10', focus: 'Superiores', completed: true },
      { date: '31/10', focus: 'Glúteos', completed: true },
      { date: '01/11', focus: 'Core', completed: false },
    ],
    evolution: {
      metric: 'Carga no hip thrust',
      unit: 'kg',
      points: [
        { label: 'Jun', value: 30 },
        { label: 'Jul', value: 35 },
        { label: 'Ago', value: 40 },
        { label: 'Set', value: 45 },
        { label: 'Out', value: 50 },
        { label: 'Nov', value: 52 },
      ],
    },
  },
  {
    id: '02',
    name: 'Carlos Eduardo',
    sex: 'M',
    age: 31,
    plan: 'mensal',
    daysRemaining: 18,
    weeklyFocus: 'Peito, Costas e Braços',
    goal: 'Ficar largo (hipertrofia superior).',
    careNote: 'Muito focado, pode passar treinos intensos e técnicas avançadas (drop-set).',
    email: 'carlos@gym.com',
    trainedWeekdays: ['seg', 'ter'],
    sheets: [
      sheet('seg', 'Peito e tríceps', [
        ex('c-s1', 'Supino reto', 4, 8, 80),
        ex('c-s2', 'Supino inclinado', 3, 10, 60),
        ex('c-s3', 'Crossover', 3, 12, 16),
        ex('c-s4', 'Tríceps corda drop-set', 3, 12, 25),
      ]),
      sheet('ter', 'Costas e bíceps', [
        ex('c-t1', 'Barra fixa', 4, 8, 0),
        ex('c-t2', 'Remada curvada', 4, 8, 70),
        ex('c-t3', 'Rosca direta', 3, 10, 30),
      ]),
      sheet('qua', 'Ombros e braços', [
        ex('c-q1', 'Desenvolvimento militar', 4, 8, 40),
        ex('c-q2', 'Elevação lateral', 4, 12, 12),
        ex('c-q3', 'Rosca martelo', 3, 10, 16),
      ]),
      sheet('qui', 'Peito pesado', [
        ex('c-h1', 'Supino reto', 5, 5, 90),
        ex('c-h2', 'Paralelas', 4, 8, 10),
      ]),
      sheet('sex', 'Costas e posterior', [
        ex('c-x1', 'Levantamento terra', 4, 6, 120),
        ex('c-x2', 'Remada cavalinho', 3, 10, 50),
      ]),
      sheet('sab', 'Cardio HIIT', [ex('c-b1', 'Bike HIIT', 1, 20, 0)]),
      sheet('dom', 'Descanso', [], true),
    ],
    history: [
      { date: '28/10', focus: 'Peito', completed: true },
      { date: '30/10', focus: 'Costas', completed: true },
      { date: '01/11', focus: 'Ombros', completed: true },
    ],
    evolution: {
      metric: 'Carga no supino reto',
      unit: 'kg',
      points: [
        { label: 'Jun', value: 60 },
        { label: 'Jul', value: 65 },
        { label: 'Ago', value: 70 },
        { label: 'Set', value: 75 },
        { label: 'Out', value: 80 },
        { label: 'Nov', value: 85 },
      ],
    },
  },
  {
    id: '03',
    name: 'Beatriz Silva',
    sex: 'F',
    age: 23,
    plan: 'diario',
    daysRemaining: 1,
    weeklyFocus: 'Glúteos e Abdômen',
    goal: 'Definição muscular pós-emagrecimento.',
    careNote: 'Focar em contração de pico e treinos metabólicos. Aluna nova, precisa de vídeos educativos.',
    email: 'beatriz@gym.com',
    trainedWeekdays: [],
    sheets: [
      sheet('seg', 'Glúteos metabólico', [
        ex('b-s1', 'Agachamento goblet', 4, 15, 12),
        ex('b-s2', 'Elevação pélvica isometria', 3, 12, 20),
        ex('b-s3', 'Abdominal infra', 3, 20, 0),
      ]),
      sheet('ter', 'Abdômen e glúteo', [
        ex('b-t1', 'Ab wheel', 3, 10, 0),
        ex('b-t2', 'Glúteo 45°', 4, 15, 25),
      ]),
      sheet('qua', 'Circuito definição', [
        ex('b-q1', 'Avanço caminhando', 3, 16, 8),
        ex('b-q2', 'Prancha dinâmica', 3, 30, 0),
      ]),
      sheet('qui', 'Posteriores', [
        ex('b-h1', 'Stiff halter', 3, 12, 12),
        ex('b-h2', 'Flexora unilateral', 3, 12, 15),
      ]),
      sheet('sex', 'Glúteos e core', [
        ex('b-x1', 'Hip thrust pausado', 4, 12, 30),
        ex('b-x2', 'Bicicleta no solo', 3, 30, 0),
      ]),
      sheet('sab', 'Cardio educativo', [ex('b-b1', 'Caminhada inclinada', 1, 25, 0)]),
      sheet('dom', 'Descanso ativo', [ex('b-d1', 'Mobilidade + alongamento', 1, 20, 0)]),
    ],
    history: [
      { date: '02/11', focus: 'Glúteos', completed: false },
    ],
    evolution: {
      metric: 'Medida de cintura',
      unit: 'cm',
      points: [
        { label: 'Jun', value: 78 },
        { label: 'Jul', value: 76 },
        { label: 'Ago', value: 74 },
        { label: 'Set', value: 73 },
        { label: 'Out', value: 72 },
        { label: 'Nov', value: 71 },
      ],
    },
  },
  {
    id: '04',
    name: 'Marcos Vinícius',
    sex: 'M',
    age: 36,
    plan: 'trimestral',
    daysRemaining: 45,
    weeklyFocus: 'Superiores e Core',
    goal: 'Melhorar a postura e ganhar braço.',
    careNote: 'Trabalha sentado o dia todo, incluir mobilidade de ombros no aquecimento.',
    email: 'marcos@gym.com',
    trainedWeekdays: ['seg'],
    sheets: [
      sheet('seg', 'Puxar + mobilidade', [
        ex('m-s1', 'Mobilidade de ombros', 2, 10, 0),
        ex('m-s2', 'Remada sentada', 4, 10, 40),
        ex('m-s3', 'Face pull', 3, 15, 12),
        ex('m-s4', 'Rosca inclinada', 3, 10, 12),
      ]),
      sheet('ter', 'Empurrar + core', [
        ex('m-t1', 'Mobilidade de torácica', 2, 8, 0),
        ex('m-t2', 'Supino halter', 3, 10, 22),
        ex('m-t3', 'Prancha com toque no ombro', 3, 20, 0),
      ]),
      sheet('qua', 'Braços e postura', [
        ex('m-q1', 'Rosca scott', 3, 10, 20),
        ex('m-q2', 'Tríceps banco', 3, 12, 0),
        ex('m-q3', 'Y-T-W no banco', 3, 12, 2),
      ]),
      sheet('qui', 'Costas e core', [
        ex('m-h1', 'Puxada supinada', 4, 10, 35),
        ex('m-h2', 'Dead bug', 3, 10, 0),
      ]),
      sheet('sex', 'Ombros saudáveis', [
        ex('m-x1', 'Desenvolvimento halter', 3, 10, 12),
        ex('m-x2', 'Rotação externa', 3, 15, 4),
      ]),
      sheet('sab', 'Caminhada postural', [ex('m-b1', 'Caminhada com scapular pack', 1, 30, 0)]),
      sheet('dom', 'Descanso', [], true),
    ],
    history: [
      { date: '27/10', focus: 'Puxar', completed: true },
      { date: '29/10', focus: 'Empurrar', completed: true },
      { date: '31/10', focus: 'Braços', completed: false },
    ],
    evolution: {
      metric: 'Carga na remada sentada',
      unit: 'kg',
      points: [
        { label: 'Jun', value: 28 },
        { label: 'Jul', value: 30 },
        { label: 'Ago', value: 32 },
        { label: 'Set', value: 35 },
        { label: 'Out', value: 38 },
        { label: 'Nov', value: 40 },
      ],
    },
  },
  {
    id: '05',
    name: 'Juliana Costa',
    sex: 'F',
    age: 29,
    plan: 'mensal',
    daysRemaining: 18,
    weeklyFocus: 'Inferiores completo',
    goal: 'Recuperação de força pós-lesão no joelho.',
    careNote: 'Carga progressiva lenta. O cuidado com a execução é 100% da meta atual.',
    email: 'juliana@gym.com',
    trainedWeekdays: ['seg', 'qua'],
    sheets: [
      sheet('seg', 'Força controlada', [
        ex('j-s1', 'Leg press amplitude reduzida', 4, 10, 50),
        ex('j-s2', 'Cadeira extensora isometria', 3, 8, 15),
        ex('j-s3', 'Ponte de glúteo', 3, 12, 0),
      ]),
      sheet('ter', 'Mobilidade de joelho', [
        ex('j-t1', 'Bike leve', 1, 15, 0),
        ex('j-t2', 'Terminal de joelho', 3, 12, 8),
      ]),
      sheet('qua', 'Posteriores seguros', [
        ex('j-q1', 'Cadeira flexora', 3, 12, 15),
        ex('j-q2', 'Stiff parcial', 3, 10, 16),
      ]),
      sheet('qui', 'Core e estabilidade', [
        ex('j-h1', 'Prancha', 3, 20, 0),
        ex('j-h2', 'Step-up baixo', 3, 8, 5),
      ]),
      sheet('sex', 'Glúteo sem impacto', [
        ex('j-x1', 'Hip thrust', 4, 10, 30),
        ex('j-x2', 'Abdução máquina', 3, 15, 25),
      ]),
      sheet('sab', 'Descanso ativo', [ex('j-b1', 'Caminhada plana', 1, 20, 0)]),
      sheet('dom', 'Descanso', [], true),
    ],
    history: [
      { date: '28/10', focus: 'Força controlada', completed: true },
      { date: '30/10', focus: 'Posteriores', completed: true },
      { date: '01/11', focus: 'Core', completed: true },
    ],
    evolution: {
      metric: 'Carga no leg press',
      unit: 'kg',
      points: [
        { label: 'Jun', value: 20 },
        { label: 'Jul', value: 25 },
        { label: 'Ago', value: 30 },
        { label: 'Set', value: 40 },
        { label: 'Out', value: 45 },
        { label: 'Nov', value: 50 },
      ],
    },
  },
];
