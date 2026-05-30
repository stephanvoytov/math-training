import { randInt } from '../mathUtils';
import { nextId } from './counter';
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
    const rawAnswer = op === '+' ? a + b : a - b;
    const answer = Math.round(rawAnswer * 1000) / 1000;

    examples.push({
      id: `addsub-${nextId()}`,
      topic: 'Сложение и вычитание',
      question: `${a} ${op} ${b}`,
      answer: answer,
      theoryKey: 'addsub',
    });
  }
  return examples;
}
