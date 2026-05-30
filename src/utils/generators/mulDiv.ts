import { randInt } from '../mathUtils';

export interface Example {
  id: string;
  topic: string;
  question: string;
  answer: number;
  options?: number[];
  theoryKey: string;
}

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

    const wrongs = new Set<number>();
    while (wrongs.size < 3) {
      const w = answer + randInt(-10, 10);
      if (w !== answer && w > 0) wrongs.add(w);
    }
    const options = [answer, ...wrongs].sort(() => Math.random() - 0.5);

    examples.push({
      id: `muldiv-${Date.now()}-${i}`,
      topic: 'Умножение и деление',
      question: `${a} ${op} ${b}`,
      answer,
      options,
      theoryKey: 'muldiv',
    });
  }
  return examples;
}
