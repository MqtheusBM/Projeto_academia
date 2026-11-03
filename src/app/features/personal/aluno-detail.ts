import {
  Component,
  ElementRef,
  OnDestroy,
  computed,
  effect,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Chart } from 'chart.js/auto';
import { PLAN_LABEL, WEEKDAYS, Weekday, weekdayFromDate } from '../../core/models/gym.models';
import { GymStore } from '../../core/services/gym-store.service';

@Component({
  selector: 'app-aluno-detail',
  imports: [FormsModule, RouterLink],
  templateUrl: './aluno-detail.html',
})
export class AlunoDetailPage implements OnDestroy {
  readonly store = inject(GymStore);
  readonly id = input.required<string>();
  readonly weekdays = WEEKDAYS;
  readonly planLabel = PLAN_LABEL;
  readonly selectedDay = signal<Weekday>(weekdayFromDate());

  // Aba ativa: 'treinos' ou 'evolucao'
  readonly currentTab = signal<'treinos' | 'evolucao'>('treinos');

  // Construtor de treino
  name = '';
  sets = 3;
  reps = 12;
  loadKg = 10;

  // Evolução
  private chart?: Chart;
  readonly canvas = viewChild<ElementRef<HTMLCanvasElement>>('chart');
  readonly selectedExerciseName = signal<string>('');

  // Modal para personal registrar/ajustar evolução de carga
  readonly isModalOpen = signal(false);
  readonly modalExerciseName = signal('');
  readonly modalPreviousLoad = signal(0);
  readonly modalNewLoad = signal(0);
  readonly modalSets = signal(3);
  readonly modalReps = signal(10);
  readonly modalNotes = signal('');

  readonly student = computed(() => this.store.students().find((item) => item.id === this.id()) ?? null);

  readonly sheet = computed(() => {
    const student = this.student();
    return student ? this.store.sheetFor(student, this.selectedDay()) : undefined;
  });

  readonly availableExercises = computed(() => {
    const student = this.student();
    if (!student) return [];
    return this.store.exercisesForStudent(student.id)();
  });

  readonly progressions = computed(() => {
    const student = this.student();
    if (!student) return [];
    return this.store.progressionsFor(student.id)();
  });

  readonly exerciseProgressionHistory = computed(() => {
    const student = this.student();
    const exName = this.selectedExerciseName();
    if (!student || !exName) return [];
    return this.store.exerciseHistory(student.id, exName)();
  });

  readonly stats = computed(() => {
    const history = this.exerciseProgressionHistory();
    if (history.length === 0) return null;
    const initial = history[0].previousLoadKg;
    const current = history[history.length - 1].newLoadKg;
    const diff = current - initial;
    const percent = initial > 0 ? Math.round((diff / initial) * 100) : 100;
    return {
      initial,
      current,
      diff,
      percent,
      totalEntries: history.length,
    };
  });

  constructor() {
    // Inicializa o exercício selecionado para o aluno
    effect(() => {
      const exercises = this.availableExercises();
      const current = this.selectedExerciseName();
      if (!current && exercises.length > 0) {
        const prefer = exercises.find((e) => e.toLowerCase().includes('rosca')) ?? exercises[0];
        this.selectedExerciseName.set(prefer);
      }
    });

    // Redesenha o gráfico quando a aba 'evolucao' estiver ativa ou os dados mudarem
    effect(() => {
      const tab = this.currentTab();
      const exName = this.selectedExerciseName();
      const history = this.exerciseProgressionHistory();
      if (tab === 'evolucao' && history) {
        setTimeout(() => this.renderChart(), 50);
      }
    });
  }

  setTab(tab: 'treinos' | 'evolucao'): void {
    this.currentTab.set(tab);
    if (tab === 'evolucao') {
      setTimeout(() => this.renderChart(), 50);
    }
  }

  selectExercise(name: string): void {
    this.selectedExerciseName.set(name);
    setTimeout(() => this.renderChart(), 20);
  }

  add(): void {
    const student = this.student();
    if (!student || !this.name.trim()) {
      return;
    }
    this.store.addExercise(student.id, this.selectedDay(), {
      name: this.name.trim(),
      sets: Number(this.sets),
      reps: Number(this.reps),
      loadKg: Number(this.loadKg),
    });
    this.name = '';
  }

  openRegisterModal(preselectExercise?: string): void {
    const exercises = this.availableExercises();
    const selected = preselectExercise || this.selectedExerciseName() || exercises[0] || '';
    this.modalExerciseName.set(selected);

    const history = this.store.exerciseHistory(this.id(), selected)();
    if (history.length > 0) {
      const last = history[history.length - 1];
      this.modalPreviousLoad.set(last.newLoadKg);
      this.modalNewLoad.set(last.newLoadKg + 2);
      this.modalSets.set(last.sets);
      this.modalReps.set(last.reps);
    } else {
      this.modalPreviousLoad.set(20);
      this.modalNewLoad.set(25);
      this.modalSets.set(3);
      this.modalReps.set(10);
    }
    this.modalNotes.set('');
    this.isModalOpen.set(true);
  }

  onModalExerciseChange(name: string): void {
    this.modalExerciseName.set(name);
    const history = this.store.exerciseHistory(this.id(), name)();
    if (history.length > 0) {
      const last = history[history.length - 1];
      this.modalPreviousLoad.set(last.newLoadKg);
      this.modalNewLoad.set(last.newLoadKg + 2);
    }
  }

  closeModal(): void {
    this.isModalOpen.set(false);
  }

  saveProgression(): void {
    const student = this.student();
    const name = this.modalExerciseName();
    if (!student || !name.trim()) return;

    this.store.recordProgression(
      student.id,
      name.trim(),
      Number(this.modalPreviousLoad()),
      Number(this.modalNewLoad()),
      Number(this.modalSets()),
      Number(this.modalReps()),
      this.modalNotes() ? `[Personal] ${this.modalNotes()}` : '[Registrado pelo Personal]',
    );

    this.selectedExerciseName.set(name.trim());
    this.closeModal();
    setTimeout(() => this.renderChart(), 50);
  }

  private renderChart(): void {
    const canvas = this.canvas()?.nativeElement;
    if (!canvas) {
      return;
    }

    const history = this.exerciseProgressionHistory();
    const exName = this.selectedExerciseName();

    let labels: string[] = [];
    let data: number[] = [];

    if (history.length > 0) {
      labels = [history[0].dateLabel + ' (inicial)', ...history.map((h) => h.dateLabel)];
      data = [history[0].previousLoadKg, ...history.map((h) => h.newLoadKg)];
    } else {
      labels = ['Sem histórico'];
      data = [0];
    }

    this.chart?.destroy();

    this.chart = new Chart(canvas, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: `${exName || 'Exercício'} (kg)`,
            data,
            borderColor: '#FACC15',
            backgroundColor: 'rgba(250, 204, 21, 0.12)',
            fill: true,
            tension: 0.35,
            pointBackgroundColor: '#FACC15',
            pointRadius: 6,
            pointHoverRadius: 8,
            borderWidth: 3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: '#FFFFFF',
              font: { weight: 'bold', size: 14 },
            },
          },
          tooltip: {
            callbacks: {
              label: (context) => ` Carga: ${context.parsed.y} kg`,
            },
          },
        },
        scales: {
          x: {
            ticks: { color: '#A0A0A0' },
            grid: { color: 'rgba(255, 255, 255, 0.06)' },
          },
          y: {
            ticks: { color: '#A0A0A0' },
            grid: { color: 'rgba(255, 255, 255, 0.06)' },
          },
        },
      },
    });
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }
}
