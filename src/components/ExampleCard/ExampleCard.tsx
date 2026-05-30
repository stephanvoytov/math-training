import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Example } from '../../utils/generators/types';
import './ExampleCard.css';

interface Props {
  example: Example;
  selectedAnswer: number | null;
  onAnswer: (answer: number) => void;
  showResult: boolean;
}

export function ExampleCard({ example, selectedAnswer, onAnswer, showResult }: Props) {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInputValue('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [example.id]);

  useEffect(() => {
    if (inputRef.current && !showResult) {
      inputRef.current.focus();
    }
  }, [showResult]);

  const isCorrect = selectedAnswer === example.answer;

  const handleCheck = () => {
    if (showResult) return;
    const trimmed = inputValue.trim().replace(',', '.');
    const parsed = parseFloat(trimmed);
    if (isNaN(parsed)) return;
    onAnswer(Math.round(parsed * 1000) / 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleCheck();
  };

  return (
    <div className="example-card">
      <div className="example-topic">{example.topic}</div>
      <div
        className="example-question"
        dangerouslySetInnerHTML={{ __html: example.question }}
      />
      <div className="example-input-area">
        <input
          ref={inputRef}
          type="text"
          className="answer-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={showResult}
          placeholder="Введите ответ..."
          autoComplete="off"
        />
        {!showResult && (
          <button className="check-btn" onClick={handleCheck}>
            Проверить
          </button>
        )}
      </div>
      {showResult && (
        <div className={`example-result ${isCorrect ? 'correct' : 'wrong'}`}>
          {isCorrect
            ? '✓ Верно!'
            : `✗ Ошибка. Правильный ответ: ${example.answer}`}
        </div>
      )}
      <Link to={`/docs#${example.theoryKey}`} className="theory-link">
        📖 Теория по теме
      </Link>
    </div>
  );
}
