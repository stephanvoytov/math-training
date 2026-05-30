let idCounter = 0;

export function nextId(): number {
  return ++idCounter;
}
