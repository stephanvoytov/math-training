import { randInt } from '../mathUtils';
import type { Example } from './types';

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

    examples.push({
      id: `addsub-${Date.now()}-${i}`,
      topic: 'Сложение и вычитание',
      question: `${a} ${op} ${b}`,
      answer,
      theoryKey: 'addsub',
    });
  }
  return examples;
}
