import { randInt } from '../mathUtils';

export interface Example {
  id: string;
  topic: string;
  question: string;
  answer: number;
  options?: number[];
  theoryKey: string;
}

const difficulties = [
  { label: 'Двузначные', min: 10, max: 99 },
  { label: 'Трёхзначные', min: 100, max: 999 },
  { label: 'Отрицательные', min: -99, max: 99 },
];

export function generateAddSubExamples(count: number = 10): Example[] {
  const examples: Example[] = [];
  for (let i = 0; i < count; i++) {
    const d = difficulties[i % difficulties.length];
    const a = randInt(d.min, d.max);
    const b = randInt(d.min, d.max);
    const op = Math.random() < 0.5 ? '+' : '−';
    const answer = op === '+' ? a + b : a - b;

    const wrongs = new Set<number>();
    while (wrongs.size < 3) {
      const w = answer + randInt(-20, 20);
      if (w !== answer) wrongs.add(w);
    }
    const options = [answer, ...wrongs].sort(() => Math.random() - 0.5);

    examples.push({
      id: `addsub-${Date.now()}-${i}`,
      topic: 'Сложение и вычитание',
      question: `${a} ${op} ${b}`,
      answer,
      options,
      theoryKey: 'addsub',
    });
  }
  return examples;
}
