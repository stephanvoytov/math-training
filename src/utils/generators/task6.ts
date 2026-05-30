import { randInt } from '../mathUtils';

export interface Example {
  id: string;
  topic: string;
  question: string;
  answer: number;
  options?: number[];
  theoryKey: string;
}

function fmtPower(base: number, exp: number): string {
  const bStr = base < 0 ? `(${base})` : String(base);
  if (exp === 1) return bStr;
  if (exp === 0) return '1';
  return `${bStr}<sup>${exp}</sup>`;
}

export function generateTask6Examples(count: number = 10): Example[] {
  const examples: Example[] = [];
  for (let i = 0; i < count; i++) {
    const type = i % 5;
    let question = '';
    let answer = 0;

    switch (type) {
      case 0: {
        const base = randInt(2, 5);
        const e1 = randInt(2, 4);
        const e2 = randInt(1, 3);
        answer = Math.pow(base, e1) * Math.pow(base, e2);
        question = `${fmtPower(base, e1)} · ${fmtPower(base, e2)}`;
        break;
      }
      case 1: {
        const a = randInt(1, 5);
        const b = randInt(1, 5);
        const c = randInt(1, 4);
        answer = Math.pow(a, 2) * c - Math.pow(b, 3);
        question = `${a}<sup>2</sup> · ${c} − ${b}<sup>3</sup>`;
        break;
      }
      case 2: {
        const n = randInt(2, 6);
        const a = randInt(1, 5);
        const b = randInt(2, 6);
        const root = a * a * n;
        const term1 = a * Math.sqrt(n);
        const term2 = b * Math.sqrt(n);
        answer = term1 + term2;
        question = `√${root} + ${b}√${n}`;
        break;
      }
      case 3: {
        const a = randInt(2, 6);
        const b = randInt(1, 5);
        const num = a * a * b;
        answer = a * Math.sqrt(b);
        question = `√${num}`;
        break;
      }
      case 4:
      default: {
        const a = randInt(1, 9);
        const b = randInt(1, 9);
        const c = randInt(1, 5);
        const d = randInt(1, 5);
        const neg = Math.random() < 0.3 ? -1 : 1;
        answer = a * c + b * d * neg;
        question = `${a} · ${c} ${neg < 0 ? '−' : '+'} ${b} · ${Math.abs(d * neg)}`;
        break;
      }
    }

    answer = Math.round(answer * 1000) / 1000;

    const wrongs = new Set<number>();
    while (wrongs.size < 3) {
      const offset = randInt(1, 10);
      const sign = Math.random() < 0.5 ? 1 : -1;
      const w = Math.round((answer + sign * offset) * 1000) / 1000;
      if (w !== answer && !isNaN(w)) wrongs.add(w);
    }
    const options = [answer, ...wrongs].sort(() => Math.random() - 0.5);

    examples.push({
      id: `task6-${Date.now()}-${i}`,
      topic: '6 задание ОГЭ',
      question,
      answer,
      options,
      theoryKey: 'task6',
    });
  }
  return examples;
}
