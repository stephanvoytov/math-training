import { randInt } from '../mathUtils';
import { nextId } from './counter';
import type { Example } from './types';

interface Difficulty {
  label: string;
  min: number;
  max: number;
}

const difficulties: Difficulty[] = [
  { label: 'Двузначные', min: 10, max: 99 },
  { label: 'Трёхзначные', min: 100, max: 999 },
  { label: 'Отрицательные', min: -99, max: 99 },
];

export function generateAddSubExamples(count: number = 10, subtypes?: string[]): Example[] {
  const examples: Example[] = [];
  const pool = subtypes && subtypes.length > 0
    ? difficulties.filter((d) => subtypes.includes(d.label))
    : difficulties;
  const active = pool.length > 0 ? pool : difficulties;

  for (let i = 0; i < count; i++) {
    const d = active[i % active.length];
    const a = randInt(d.min, d.max);
    const b = randInt(d.min, d.max);
    const op = Math.random() < 0.5 ? '+' : '−';
    const rawAnswer = op === '+' ? a + b : a - b;
    const answer = Math.round(rawAnswer * 1000) / 1000;

    const signA = a < 0 ? `(${a})` : String(a);
    const signB = b < 0 ? `(${b})` : String(b);
    const step1 = op === '+'
      ? `${signA} + ${signB} = ${a + b}`
      : `${signA} − ${signB} = ${a - b}`;

    examples.push({
      id: `addsub-${nextId()}`,
      topic: 'Сложение и вычитание',
      question: `${a} ${op} ${b}`,
      answer,
      theoryKey: 'addsub',
      subtype: d.label,
      solution: `<strong>Решение:</strong><br>${step1}`,
      commonMistake: d.label === 'Отрицательные'
        ? 'Частая ошибка: забудьте про знак минуса при вычитании отрицательных чисел.'
        : undefined,
    });
  }
  return examples;
}

export const addSubSubtypes = difficulties.map((d) => d.label);
