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
  const isCorrect = selectedAnswer === example.answer;

  return (
    <div className="example-card">
      <div className="example-topic">{example.topic}</div>
      <div
        className="example-question"
        dangerouslySetInnerHTML={{ __html: example.question }}
      />
      <div className="example-options">
        {example.options?.map((opt) => {
          let cls = 'option-btn';
          if (showResult && selectedAnswer !== null) {
            if (opt === example.answer) cls += ' correct';
            else if (opt === selectedAnswer && !isCorrect) cls += ' wrong';
          } else if (selectedAnswer === opt) {
            cls += ' selected';
          }
          return (
            <button
              key={opt}
              className={cls}
              onClick={() => onAnswer(opt)}
              disabled={showResult}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {showResult && (
        <div className={`example-result ${isCorrect ? 'correct' : 'wrong'}`}>
          {isCorrect ? '✓ Верно!' : `✗ Ошибка. Правильный ответ: ${example.answer}`}
        </div>
      )}
      <Link to={`/docs#${example.theoryKey}`} className="theory-link">
        📖 Теория по теме
      </Link>
    </div>
  );
}
