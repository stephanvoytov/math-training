import { randInt } from '../mathUtils';
import { nextId } from './counter';
import type { Example } from './types';

const subtypeLabels = [
  'Десятичные ×',
  'Десятичные ÷',
  'Дроби ×',
  'Дроби ÷',
  'Дроби +/−',
  '(a·b)/c',
  '(дроби) × n',
];

function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) { [a, b] = [b, a % b]; }
  return a;
}

function round3(v: number): number {
  return Math.round(v * 1000) / 1000;
}

function pickFrac(): [number, number] {
  let num = randInt(1, 9);
  let den = randInt(2, 9);
  while (num % den === 0) { num = randInt(1, 9); den = randInt(2, 9); }
  const g = gcd(num, den);
  return [num / g, den / g];
}

function fracStr(num: number, den: number): string {
  return `${num}/${den}`;
}

export function generateMulDivExamples(count: number = 10, subtypes?: string[]): Example[] {
  const examples: Example[] = [];
  const activeIndices = subtypes && subtypes.length > 0
    ? subtypeLabels.map((l, idx) => subtypes.includes(l) ? idx : -1).filter((i) => i >= 0)
    : [0, 1, 2, 3, 4, 5, 6];
  const pool = activeIndices.length > 0 ? activeIndices : [0, 1, 2, 3, 4, 5, 6];

  for (let i = 0; i < count; i++) {
    const type = pool[i % pool.length];
    let question = '';
    let answer = 0;
    let solution = '';
    let mistake: string | undefined;

    switch (type) {
      case 0: {
        const a = round3(randInt(10, 99) / 10);
        const b = round3(randInt(10, 99) / 10);
        answer = round3(a * b);
        question = `${a} · ${b}`;
        solution = `<strong>Решение:</strong><br>${a} · ${b} = ${answer}`;
        mistake = 'Частая ошибка: неправильно считаете количество знаков после запятой.';
        break;
      }
      case 1: {
        const b = round3(randInt(10, 99) / 10);
        const ansInt = randInt(2, 20);
        const a = round3(ansInt * b);
        answer = ansInt;
        question = `${a} ÷ ${b}`;
        solution = `<strong>Решение:</strong><br>${a} ÷ ${b} = ${ansInt}`;
        mistake = 'Частая ошибка: делите меньшее на большее, а не наоборот.';
        break;
      }
      case 2: {
        const [a, b] = pickFrac();
        const [c, d] = pickFrac();
        const rNum = a * c;
        const rDen = b * d;
        answer = round3(rNum / rDen);
        question = `${fracStr(a, b)} · ${fracStr(c, d)}`;
        const g1 = gcd(rNum, rDen);
        const sn = rNum / g1;
        const sd = rDen / g1;
        let step = `${a}·${c} / ${b}·${d} = ${rNum}/${rDen}`;
        if (sn !== rNum) step += ` = ${sn}/${sd}`;
        step += ` = ${answer}`;
        solution = `<strong>Решение:</strong><br>${fracStr(a, b)} · ${fracStr(c, d)}<br>= ${step}`;
        mistake = 'Частая ошибка: умножают крест-накрест, а нужно числитель на числитель, знаменатель на знаменатель.';
        break;
      }
      case 3: {
        const [a, b] = pickFrac();
        let [c, d] = pickFrac();
        while (c === a && d === b) { [c, d] = pickFrac(); }
        const rNum = a * d;
        const rDen = b * c;
        answer = round3(rNum / rDen);
        question = `${fracStr(a, b)} ÷ ${fracStr(c, d)}`;
        const g1 = gcd(rNum, rDen);
        const sn = rNum / g1;
        const sd = rDen / g1;
        let step = `${fracStr(a, b)} · ${fracStr(d, c)} = ${a}·${d} / ${b}·${c} = ${rNum}/${rDen}`;
        if (sn !== rNum) step += ` = ${sn}/${sd}`;
        step += ` = ${answer}`;
        solution = `<strong>Решение:</strong><br>${fracStr(a, b)} ÷ ${fracStr(c, d)}<br>Переворачиваем вторую дробь:<br>${step}`;
        mistake = 'Частая ошибка: делят как умножение (числитель на числитель, знаменатель на знаменатель). Нужно переворачивать вторую дробь.';
        break;
      }
      case 4: {
        const [a, b] = pickFrac();
        const [c, d] = pickFrac();
        const op = Math.random() < 0.5 ? '+' : '−';
        const rNum = op === '+' ? a * d + c * b : a * d - c * b;
        const rDen = b * d;
        answer = round3(rNum / rDen);
        question = `${fracStr(a, b)} ${op} ${fracStr(c, d)}`;
        const totalVal = round3(rNum / rDen);
        let step = `${a}·${d} ${op} ${c}·${b} / ${b}·${d} = ${op === '+' ? a * d + c * b : a * d - c * b}/${b * d}`;
        if (rNum !== 0) {
          const g1 = gcd(Math.abs(rNum), rDen);
          const sn = rNum / g1;
          const sd = rDen / g1;
          if (sn !== rNum) step += ` = ${sn}/${sd}`;
        }
        step += ` = ${totalVal}`;
        solution = `<strong>Решение:</strong><br>Приводим к общему знаменателю:<br>${fracStr(a, b)} ${op} ${fracStr(c, d)}<br>= ${step}`;
        mistake = 'Частая ошибка: складывают/вычитают числители, не приводя к общему знаменателю.';
        break;
      }
      case 5: {
        const a = round3(randInt(10, 99) / 10);
        const b = round3(randInt(10, 99) / 10);
        const c = round3(randInt(10, 99) / 10);
        answer = round3((a * b) / c);
        question = `(${a} · ${b}) ÷ ${c}`;
        const prod = round3(a * b);
        solution = `<strong>Решение:</strong><br>1) ${a} · ${b} = ${prod}<br>2) ${prod} ÷ ${c} = ${answer}`;
        mistake = 'Частая ошибка: делят один из множителей, а не всё произведение.';
        break;
      }
      case 6:
      default: {
        const [a, b] = pickFrac();
        const [c, d] = pickFrac();
        const op = Math.random() < 0.5 ? '+' : '−';
        const n = randInt(2, 9);
        const rNum = op === '+' ? a * d + c * b : a * d - c * b;
        const rDen = b * d;
        const totalNum = rNum * n;
        const totalDen = rDen;
        answer = round3(totalNum / totalDen);
        question = `(${fracStr(a, b)} ${op} ${fracStr(c, d)}) · ${n}`;
        let step = `(${a}/${b} ${op} ${c}/${d}) · ${n}<br>= (${a}·${d} ${op} ${c}·${b}) / ${b}·${d} · ${n}<br>= ${rNum}/${rDen} · ${n}<br>= ${rNum}·${n} / ${rDen} = ${totalNum}/${totalDen}`;
        const g1 = gcd(Math.abs(totalNum), totalDen);
        const sn = totalNum / g1;
        const sd = totalDen / g1;
        if (sn !== totalNum) step += ` = ${sn}/${sd}`;
        step += ` = ${answer}`;
        solution = `<strong>Решение:</strong><br>${step}`;
        mistake = 'Частая ошибка: умножают на n только первое слагаемое в скобках.';
        break;
      }
    }

    examples.push({
      id: `muldiv-${nextId()}`,
      topic: 'Дроби и десятичные',
      question,
      answer: round3(answer),
      theoryKey: 'muldiv',
      subtype: subtypeLabels[type],
      solution,
      commonMistake: mistake,
    });
  }
  return examples;
}

export const mulDivSubtypes = [...subtypeLabels];
