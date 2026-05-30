import { randInt } from '../mathUtils';

export interface Example {
  id: string;
  topic: string;
  question: string;
  answer: number;
  options?: number[];
  theoryKey: string;
}

function powerStr(base: number, exp: number): string {
  if (exp === 1) return String(base);
  if (exp < 0) return `(${base})<sup>${exp}</sup>`;
  if (base < 0) return `(${base})<sup>${exp}</sup>`;
  return `${base}<sup>${exp}</sup>`;
}

export function generatePowersExamples(count: number = 10): Example[] {
  const examples: Example[] = [];
  for (let i = 0; i < count; i++) {
    const type = i % 4;
    let question: string;
    let answer: number;

    switch (type) {
      case 0: {
        const base = randInt(2, 10);
        const exp = randInt(2, 5);
        question = powerStr(base, exp);
        answer = Math.pow(base, exp);
        break;
      }
      case 1: {
        const base = randInt(2, 5);
        const exp = randInt(1, 3);
        const exp2 = randInt(1, 3);
        question = `${powerStr(base, exp)} · ${powerStr(base, exp2)}`;
        answer = Math.pow(base, exp + exp2);
        break;
      }
      case 2: {
        const base = randInt(2, 5);
        const exp = randInt(2, 4);
        const exp2 = randInt(1, exp - 1);
        question = `${powerStr(base, exp)} ÷ ${powerStr(base, exp2)}`;
        answer = Math.pow(base, exp - exp2);
        break;
      }
      case 3:
      default: {
        const base = randInt(2, 4);
        const exp = randInt(2, 3);
        const pow = randInt(2, 3);
        question = `(${powerStr(base, exp)})<sup>${pow}</sup>`;
        answer = Math.pow(base, exp * pow);
        break;
      }
    }

    const wrongs = new Set<number>();
    while (wrongs.size < 3) {
      const w = answer + randInt(-5, 5);
      if (w !== answer && w > 0) wrongs.add(w);
    }
    const options = [answer, ...wrongs].sort(() => Math.random() - 0.5);

    examples.push({
      id: `pow-${Date.now()}-${i}`,
      topic: 'Степени',
      question,
      answer,
      options,
      theoryKey: 'powers',
    });
  }
  return examples;
}
