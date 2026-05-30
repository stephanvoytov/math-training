export interface SessionResult {
  date: string;
  topic: string;
  correct: number;
  total: number;
  duration: number;
  wrongIds: string[];
  subtypes: string[];
}

const STORAGE_KEY = 'math-training-sessions';
const MAX_RECORDS = 100;

export function getStats(): SessionResult[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveSession(result: SessionResult): void {
  const stats = getStats();
  stats.unshift(result);
  if (stats.length > MAX_RECORDS) {
    stats.length = MAX_RECORDS;
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch {
    // localStorage full or unavailable
  }
}

export function getLastSessions(count: number = 5): SessionResult[] {
  return getStats().slice(0, count);
}

const COUNT_KEY = 'math-training-count';
const AUTOADVANCE_KEY = 'math-training-autoadvance';

export function getSavedCount(): number {
  try {
    return parseInt(localStorage.getItem(COUNT_KEY) || '10', 10);
  } catch {
    return 10;
  }
}

export function saveCount(n: number): void {
  try {
    localStorage.setItem(COUNT_KEY, String(n));
  } catch {
    // ignore
  }
}

export function getAutoAdvance(): boolean {
  try {
    return localStorage.getItem(AUTOADVANCE_KEY) !== 'false';
  } catch {
    return true;
  }
}

export function saveAutoAdvance(v: boolean): void {
  try {
    localStorage.setItem(AUTOADVANCE_KEY, v ? 'true' : 'false');
  } catch {
    // ignore
  }
}
