import { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ExampleCard } from '../../components/ExampleCard/ExampleCard';
import { ProgressBar } from '../../components/ProgressBar/ProgressBar';
import { generateAddSubExamples } from '../../utils/generators/addSub';
import { generateMulDivExamples } from '../../utils/generators/mulDiv';
import { generatePowersExamples } from '../../utils/generators/powers';
import type { Example } from '../../utils/generators/types';
import './Practice.css';

const generators: Record<string, (count: number) => Example[]> = {
  addsub: generateAddSubExamples,
  muldiv: generateMulDivExamples,
  powers: generatePowersExamples,
};

const topicNames: Record<string, string> = {
  addsub: 'Сложение и вычитание',
  muldiv: 'Умножение и деление',
  powers: 'Степени',
};

export function Practice() {
  const { topic } = useParams<{ topic: string }>();
  const [examples, setExamples] = useState<Example[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [results, setResults] = useState<Record<string, boolean>>({});

  const gen = topic ? generators[topic] : null;
  const topicName = topic ? topicNames[topic] || 'Тренировка' : 'Тренировка';

  const generate = useCallback(() => {
    if (!gen) return;
    setExamples(gen(10));
    setCurrentIdx(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setResults({});
  }, [gen]);

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

  if (!gen) {
    return (
      <div className="practice-page">
        <h1 className="page-title">Тема не найдена</h1>
        <p>Проверьте ссылку или выберите тему на главной.</p>
      </div>
    );
  }

  if (examples.length === 0) return null;

  const isDone = showResult && currentIdx === examples.length - 1;

  return (
    <div className="practice-page">
      <div className="practice-header">
        <div>
          <h1 className="page-title">{topicName}</h1>
          <p className="page-desc">Пример {currentIdx + 1} из {examples.length}</p>
        </div>
        <ProgressBar current={total} total={examples.length} />
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
