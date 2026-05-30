import { randInt } from '../mathUtils';
import { nextId } from './counter';
import type { Example } from './types';

function powerStr(base: number, exp: number): string {
  if (exp === 1) return String(base);
  if (exp < 0) return `(${base})<sup>${exp}</sup>`;
  if (base < 0) return `(${base})<sup>${exp}</sup>`;
  return `${base}<sup>${exp}</sup>`;
}

const subtypeLabels = ['Простая степень', 'Умножение степеней', 'Деление степеней', 'Степень степени'];

export function generatePowersExamples(count: number = 10, subtypes?: string[]): Example[] {
  const examples: Example[] = [];
  const activeIndices = subtypes && subtypes.length > 0
    ? subtypeLabels.map((label, idx) => subtypes.includes(label) ? idx : -1).filter((i) => i >= 0)
    : [0, 1, 2, 3];
  const pool = activeIndices.length > 0 ? activeIndices : [0, 1, 2, 3];

  for (let i = 0; i < count; i++) {
    const type = pool[i % pool.length];
    let question: string;
    let answer: number;
    let solution = '';
    let mistake: string | undefined;

    const base = randInt(2, 10);

    switch (type) {
      case 0: {
        const exp = randInt(2, 5);
        question = powerStr(base, exp);
        answer = Math.pow(base, exp);
        solution = `<strong>Решение:</strong><br>${base}<sup>${exp}</sup> = ${base} × ${base}`;
        for (let j = 2; j < exp; j++) solution += ` × ${base}`;
        solution += ` = ${answer}`;
        mistake = 'Частая ошибка: путают умножение (3² = 3×2 = 6) с возведением в степень (3² = 9).';
        break;
      }
      case 1: {
        const base = randInt(2, 5);
        const exp = randInt(1, 3);
        const exp2 = randInt(1, 3);
        question = `${powerStr(base, exp)} · ${powerStr(base, exp2)}`;
        answer = Math.pow(base, exp + exp2);
        solution = `<strong>Решение:</strong><br>${base}<sup>${exp}</sup> · ${base}<sup>${exp2}</sup> = ${base}<sup>${exp}+${exp2}</sup> = ${base}<sup>${exp + exp2}</sup> = ${answer}`;
        mistake = 'Частая ошибка: умножают основания (2³·2² = 4⁵) вместо того, чтобы складывать показатели.';
        break;
      }
      case 2: {
        const base = randInt(2, 5);
        const exp = randInt(2, 4);
        const exp2 = randInt(1, exp - 1);
        question = `${powerStr(base, exp)} ÷ ${powerStr(base, exp2)}`;
        answer = Math.pow(base, exp - exp2);
        solution = `<strong>Решение:</strong><br>${base}<sup>${exp}</sup> ÷ ${base}<sup>${exp2}</sup> = ${base}<sup>${exp}−${exp2}</sup> = ${base}<sup>${exp - exp2}</sup> = ${answer}`;
        break;
      }
      case 3:
      default: {
        const base = randInt(2, 4);
        const exp = randInt(2, 3);
        const pow = randInt(2, 3);
        question = `(${powerStr(base, exp)})<sup>${pow}</sup>`;
        answer = Math.pow(base, exp * pow);
        solution = `<strong>Решение:</strong><br>(${base}<sup>${exp}</sup>)<sup>${pow}</sup> = ${base}<sup>${exp}·${pow}</sup> = ${base}<sup>${exp * pow}</sup> = ${answer}`;
        mistake = 'Частая ошибка: складывают степени (2³)² = 2⁵ вместо умножения 2⁶.';
        break;
      }
    }

    examples.push({
      id: `pow-${nextId()}`,
      topic: 'Степени',
      question,
      answer: Math.round(answer * 1000) / 1000,
      theoryKey: 'powers',
      subtype: subtypeLabels[type],
      solution,
      commonMistake: mistake,
    });
  }
  return examples;
}

export const powersSubtypes = [...subtypeLabels];
