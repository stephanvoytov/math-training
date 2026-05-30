export function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    [a, b] = [b, a % b];
  }
  return a;
}

export function simplifyFrac(num: number, den: number): [number, number] {
  if (den < 0) {
    num = -num;
    den = -den;
  }
  const g = gcd(Math.abs(num), den);
  return [num / g, den / g];
}
