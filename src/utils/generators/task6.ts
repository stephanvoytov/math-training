import { randInt } from '../mathUtils';
import { nextId } from './counter';
import type { Example } from './types';

function fmtPower(base: number, exp: number): string {
  const bStr = base < 0 ? `(${base})` : String(base);
  if (exp === 1) return bStr;
  if (exp === 0) return '1';
  return `${bStr}<sup>${exp}</sup>`;
}

const subtypeLabels = [
  'Степени',
  'Квадраты и кубы',
  'Сложение корней',
  'Извлечение корня',
  'Смешанные',
];

export function generateTask6Examples(count: number = 10, subtypes?: string[]): Example[] {
  const examples: Example[] = [];
  const activeIndices = subtypes && subtypes.length > 0
    ? subtypeLabels.map((l, idx) => subtypes.includes(l) ? idx : -1).filter((i) => i >= 0)
    : [0, 1, 2, 3, 4];
  const pool = activeIndices.length > 0 ? activeIndices : [0, 1, 2, 3, 4];

  for (let i = 0; i < count; i++) {
    const type = pool[i % pool.length];
    let question = '';
    let answer = 0;
    let solution = '';
    let mistake: string | undefined;

    switch (type) {
      case 0: {
        const base = randInt(2, 5);
        const e1 = randInt(2, 4);
        const e2 = randInt(1, 3);
        answer = Math.pow(base, e1) * Math.pow(base, e2);
        question = `${fmtPower(base, e1)} · ${fmtPower(base, e2)}`;
        solution = `<strong>Решение:</strong><br>${base}<sup>${e1}</sup> · ${base}<sup>${e2}</sup> = ${base}<sup>${e1}+${e2}</sup> = ${base}<sup>${e1 + e2}</sup> = ${answer}`;
        mistake = 'Частая ошибка: умножают основания, а не складывают показатели.';
        break;
      }
      case 1: {
        const a = randInt(1, 5);
        const b = randInt(1, 5);
        const c = randInt(1, 4);
        answer = Math.pow(a, 2) * c - Math.pow(b, 3);
        question = `${a}<sup>2</sup> · ${c} − ${b}<sup>3</sup>`;
        const a2 = a * a;
        const b3 = b * b * b;
        const subt = a2 * c - b3;
        solution = `<strong>Решение:</strong><br>${a}<sup>2</sup> — ${a}<sup>2</sup>·${c} − ${b}<sup>3</sup><br>= ${a2}·${c} − ${b3}<br>= ${a2 * c} − ${b3}<br>= ${subt}`;
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
        solution = `<strong>Решение:</strong><br>√${root} + ${b}√${n}<br>= ${a}√${n} + ${b}√${n}<br>= (${a} + ${b})√${n}<br>= ${term1 + term2}√${n}`;
        mistake = 'Частая ошибка: складывают подкоренные выражения (√8+√2=√10), а нужно приводить к общему корню.';
        break;
      }
      case 3: {
        const a = randInt(2, 6);
        const b = randInt(1, 5);
        const num = a * a * b;
        answer = a * Math.sqrt(b);
        question = `√${num}`;
        solution = `<strong>Решение:</strong><br>√${num} = √(${a}²·${b}) = ${a}√${b} ≈ ${Math.round(answer * 1000) / 1000}`;
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
        const plus = neg < 0 ? '−' : '+';
        const absD = Math.abs(d * neg);
        question = `${a} · ${c} ${plus} ${b} · ${absD}`;
        const left = a * c;
        const right = b * absD * neg;
        const total = left + right;
        solution = `<strong>Решение:</strong><br>${a}·${c} ${plus} ${b}·${absD}<br>= ${left} ${plus} ${right < 0 ? '−' : '+'} ${Math.abs(right)}<br>= ${total}`;
        break;
      }
    }

    answer = Math.round(answer * 1000) / 1000;

    examples.push({
      id: `task6-${nextId()}`,
      topic: '6 задание ОГЭ',
      question,
      answer,
      theoryKey: 'task6',
      subtype: subtypeLabels[type],
      solution,
      commonMistake: mistake,
    });
  }
  return examples;
}

export const task6Subtypes = [...subtypeLabels];
