import { useState, useRef, useEffect, memo } from 'react';
import { Link } from 'react-router-dom';
import type { Example } from '../../utils/generators/types';
import './ExampleCard.css';

interface Props {
  example: Example;
  selectedAnswer: number | null;
  onAnswer: (answer: number) => void;
  showResult: boolean;
}

export const ExampleCard = memo(function ExampleCard({ example, selectedAnswer, onAnswer, showResult }: Props) {
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInputValue('');
    setInputError('');
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
    if (!trimmed) {
      setInputError('Введите ответ');
      return;
    }
    const parsed = parseFloat(trimmed);
    if (isNaN(parsed)) {
      setInputError('Введите число');
      return;
    }
    setInputError('');
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
      <div className="example-input-area" aria-live="polite">
        <input
          ref={inputRef}
          type="text"
          className="answer-input"
          value={inputValue}
          onChange={(e) => { setInputValue(e.target.value); setInputError(''); }}
          onKeyDown={handleKeyDown}
          disabled={showResult}
          placeholder="Введите ответ..."
          autoComplete="off"
          aria-describedby={inputError ? 'input-error' : undefined}
          aria-invalid={!!inputError}
        />
        {!showResult && (
          <button type="button" className="check-btn" onClick={handleCheck}>
            Проверить
          </button>
        )}
      </div>
      {inputError && !showResult && (
        <div id="input-error" className="input-error">{inputError}</div>
      )}
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
});
