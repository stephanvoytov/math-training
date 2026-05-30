import { useState, useCallback, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ExampleCard } from '../../components/ExampleCard/ExampleCard';
import { ProgressBar } from '../../components/ProgressBar/ProgressBar';
import { Timer } from '../../components/Timer/Timer';
import { generateTask6Examples, task6Subtypes } from '../../utils/generators/task6';
import { saveSession, getSavedCount, saveCount, getAutoAdvance, saveAutoAdvance } from '../../utils/stats';
import type { Example } from '../../utils/generators/types';
import './Task6.css';

const countOptions = [5, 10, 20];

export function Task6() {
  const [phase, setPhase] = useState<'setup' | 'active' | 'done'>('setup');
  const [count, setCount] = useState(getSavedCount);
  const [selectedSubtypes, setSelectedSubtypes] = useState<string[]>([]);
  const [examples, setExamples] = useState<Example[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [results, setResults] = useState<Record<string, boolean>>({});
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [autoAdvance, setAutoAdvance] = useState(getAutoAdvance);
  const [timerRunning, setTimerRunning] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const startTimeRef = useRef<number>(0);
  const advanceTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const allSubtypesSelected = selectedSubtypes.length === 0 || selectedSubtypes.length === task6Subtypes.length;

  const generate = useCallback((c?: number, subs?: string[]) => {
    const useSubs = subs && subs.length > 0 && subs.length < task6Subtypes.length ? subs : undefined;
    const exs = generateTask6Examples(c ?? count, useSubs);
    setExamples(exs);
    setCurrentIdx(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setResults({});
    setStreak(0);
    setMaxStreak(0);
    setIsDone(false);
    startTimeRef.current = Date.now();
    setTimerRunning(true);
    setPhase('active');
  }, [count]);

  useEffect(() => {
    if (task6Subtypes.length > 0 && selectedSubtypes.length === 0) {
      setSelectedSubtypes([...task6Subtypes]);
    }
  }, [selectedSubtypes.length]);

  const current = examples[currentIdx];

  const handleAnswer = (answer: number) => {
    if (showResult || !current) return;
    setSelectedAnswer(answer);
    setShowResult(true);
    const correct = answer === current.answer;
    setResults((prev) => ({ ...prev, [current.id]: correct }));

    if (correct) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);
    } else {
      setStreak(0);
    }

    const allAnswered = currentIdx >= examples.length - 1;

    if (correct && autoAdvance && !allAnswered) {
      advanceTimerRef.current = setTimeout(() => {
        setCurrentIdx((i) => i + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      }, 1500);
    }

    if (allAnswered) {
      setTimerRunning(false);
    }
  };

  const next = () => {
    if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
    if (currentIdx < examples.length - 1) {
      setCurrentIdx((i) => i + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const finishSession = useCallback(() => {
    setTimerRunning(false);
    setIsDone(true);
    const correct = Object.values(results).filter(Boolean).length;
    const total = Object.keys(results).length;
    if (total > 0) {
      saveSession({
        date: new Date().toISOString(),
        topic: '6 задание ОГЭ',
        correct,
        total,
        duration: Math.round((Date.now() - startTimeRef.current) / 1000),
        wrongIds: Object.entries(results).filter(([, v]) => !v).map(([id]) => id),
        subtypes: [...new Set(examples.map((e) => e.subtype || '').filter(Boolean))],
      });
    }
  }, [results, examples]);

  useEffect(() => {
    if (isDone || phase !== 'active') return;
    const totalAnswered = Object.keys(results).length;
    if (totalAnswered >= examples.length && examples.length > 0) {
      finishSession();
    }
  }, [results, examples.length, finishSession, isDone, phase]);

  const handleTimeUp = () => {
    finishSession();
  };

  const retryWrong = () => {
    const wrongSubtypes = examples
      .filter((e) => results[e.id] === false)
      .map((e) => e.subtype)
      .filter((s): s is string => !!s);
    const unique = [...new Set(wrongSubtypes)];
    generate(count, unique.length > 0 ? unique : undefined);
  };

  const correct = Object.values(results).filter(Boolean).length;
  const total = Object.keys(results).length;

  if (examples.length === 0 && phase === 'active') return null;

  if (phase === 'setup') {
    return (
      <div className="task6-page">
        <span className="task6-badge">6 задание ОГЭ</span>
        <h1 className="page-title">Числовые выражения</h1>

        <div className="practice-setup" style={{ marginTop: 20 }}>
          <div className="setup-group">
            <label className="setup-label">Количество примеров:</label>
            <div className="setup-options">
              {countOptions.map((n) => (
                <button
                  key={n}
                  type="button"
                  className={`setup-btn ${count === n ? 'active' : ''}`}
                  onClick={() => setCount(n)}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {task6Subtypes.length > 1 && (
            <div className="setup-group">
              <label className="setup-label">Типы примеров:</label>
              <div className="setup-options setup-checkboxes">
                <label className="setup-checkbox">
                  <input
                    type="checkbox"
                    checked={allSubtypesSelected}
                    onChange={() => setSelectedSubtypes(allSubtypesSelected ? [] : [...task6Subtypes])}
                  />
                  Все
                </label>
                {task6Subtypes.map((s) => (
                  <label key={s} className="setup-checkbox">
                    <input
                      type="checkbox"
                      checked={selectedSubtypes.includes(s)}
                      onChange={() => {
                        setSelectedSubtypes((prev) =>
                          prev.includes(s)
                            ? prev.filter((x) => x !== s)
                            : [...prev, s]
                        );
                      }}
                    />
                    {s}
                  </label>
                ))}
              </div>
            </div>
          )}

          <button
            type="button"
            className="btn-primary"
            onClick={() => generate(count, selectedSubtypes)}
          >
            Начать тренировку
          </button>
        </div>
      </div>
    );
  }

  const phaseDone = isDone || (showResult && currentIdx === examples.length - 1);

  return (
    <div className="task6-page">
      <div className="task6-header">
        <div>
          <span className="task6-badge">6 задание ОГЭ</span>
          <h1 className="page-title">Числовые выражения</h1>
          <p className="page-desc">Пример {currentIdx + 1} из {examples.length}</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <Timer running={timerRunning && !phaseDone} onTimeUp={handleTimeUp} />
          <ProgressBar current={total} total={examples.length} />
        </div>
      </div>

      <div className="task6-tip">
        <strong>💡 Совет:</strong> Вспомните свойства степеней и правила работы с корнями.
        <Link to="/docs#task6" className="task6-tip-link">📖 Открыть теорию</Link>
      </div>

      <div className="practice-toolbar">
        <label className="auto-advance-label">
          <input
            type="checkbox"
            checked={autoAdvance}
            onChange={() => { setAutoAdvance((v) => { const nv = !v; saveAutoAdvance(nv); return nv; }); }}
          />
          Автопереход ⏭
        </label>
      </div>

      {current && (
        <ExampleCard
          example={current}
          selectedAnswer={selectedAnswer}
          onAnswer={handleAnswer}
          showResult={showResult}
          streak={streak}
        />
      )}

      <div className="practice-actions">
        {showResult && currentIdx < examples.length - 1 && !autoAdvance && (
          <button type="button" className="btn-primary" onClick={next}>
            Следующий пример →
          </button>
        )}
        {(phaseDone || isDone) && (
          <div className="practice-done">
            <h2>Тренировка завершена!</h2>
            <p>Правильных ответов: {correct} из {total}</p>
            {maxStreak > 1 && <p className="done-streak">🔥 Лучшая серия: {maxStreak} подряд</p>}
            <p className="done-time">⏱ Время: {Math.floor(total > 0 ? (Date.now() - startTimeRef.current) / 60000 : 0)} мин</p>
            <div className="done-actions">
              <button type="button" className="btn-primary" onClick={() => { saveCount(count); generate(count, selectedSubtypes); }}>
                Начать заново
              </button>
              {Object.values(results).filter((v) => !v).length > 0 && (
                <button type="button" className="btn-secondary" onClick={retryWrong}>
                  🔁 Повторить ошибки
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
