import { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ExampleCard } from '../../components/ExampleCard/ExampleCard';
import { ProgressBar } from '../../components/ProgressBar/ProgressBar';
import { generateTask6Examples } from '../../utils/generators/task6';
import type { Example } from '../../utils/generators/types';
import './Task6.css';

export function Task6() {
  const [examples, setExamples] = useState<Example[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [results, setResults] = useState<Record<string, boolean>>({});

  const generate = useCallback(() => {
    setExamples(generateTask6Examples(10));
    setCurrentIdx(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setResults({});
  }, []);

  useEffect(() => {
    generate();
  }, [generate]);

  const current = examples[currentIdx];

  const handleAnswer = (answer: number) => {
    if (showResult) return;
    setSelectedAnswer(answer);
    setShowResult(true);
    setResults((prev) => ({
      ...prev,
      [current.id]: answer === current.answer,
    }));
  };

  const next = () => {
    if (currentIdx < examples.length - 1) {
      setCurrentIdx((i) => i + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const correct = Object.values(results).filter(Boolean).length;
  const total = Object.keys(results).length;

  if (examples.length === 0) return null;

  const isDone = showResult && currentIdx === examples.length - 1;

  return (
    <div className="task6-page">
      <div className="task6-header">
        <div>
          <span className="task6-badge">6 задание ОГЭ</span>
          <h1 className="page-title">Числовые выражения</h1>
          <p className="page-desc">Пример {currentIdx + 1} из {examples.length}</p>
        </div>
        <ProgressBar current={total} total={examples.length} />
      </div>

      <div className="task6-tip">
        <strong>💡 Совет:</strong> Вспомните свойства степеней и правила работы с корнями.
        <Link to="/docs#task6" className="task6-tip-link">📖 Открыть теорию</Link>
      </div>

      <ExampleCard
        example={current}
        selectedAnswer={selectedAnswer}
        onAnswer={handleAnswer}
        showResult={showResult}
      />

      <div className="practice-actions">
        {showResult && currentIdx < examples.length - 1 && (
          <button type="button" className="btn-primary" onClick={next}>
            Следующий пример →
          </button>
        )}
        {isDone && (
          <div className="practice-done">
            <h2>Тренировка завершена!</h2>
            <p>Правильных ответов: {correct} из {total}</p>
            <button type="button" className="btn-primary" onClick={generate}>
              Начать заново
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
