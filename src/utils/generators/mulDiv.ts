import { randInt } from '../mathUtils';
import { nextId } from './counter';
import type { Example } from './types';

const types = ['Умножение', 'Деление'] as const;

export function generateMulDivExamples(count: number = 10, subtypes?: string[]): Example[] {
  const examples: Example[] = [];
  const active = subtypes && subtypes.length > 0
    ? types.filter((t) => subtypes.includes(t))
    : [...types];
  const pool = active.length > 0 ? active : types;

  for (let i = 0; i < count; i++) {
    const type = pool[i % pool.length];
    let a: number, b: number, op: string, answer: number;

    if (type === 'Умножение') {
      a = randInt(2, 20);
      b = randInt(2, 12);
      op = '×';
      answer = a * b;
    } else {
      answer = randInt(2, 15);
      b = randInt(2, 12);
      a = answer * b;
      op = '÷';
    }

    examples.push({
      id: `muldiv-${nextId()}`,
      topic: 'Умножение и деление',
      question: `${a} ${op} ${b}`,
      answer: Math.round(answer * 1000) / 1000,
      theoryKey: 'muldiv',
      subtype: type,
      solution: `<strong>Решение:</strong><br>${a} ${op} ${b} = ${answer}`,
      commonMistake: type === 'Деление'
        ? 'Частая ошибка: перепутали делимое и делитель.'
        : undefined,
    });
  }
  return examples;
}

export const mulDivSubtypes = [...types];
