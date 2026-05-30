import { randInt } from '../mathUtils';
import { nextId } from './counter';
import type { Example } from './types';

export function generateMulDivExamples(count: number = 10): Example[] {
  const examples: Example[] = [];
  for (let i = 0; i < count; i++) {
    let a: number, b: number, op: string, answer: number;

    if (Math.random() < 0.5) {
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
    });
  }
  return examples;
}
