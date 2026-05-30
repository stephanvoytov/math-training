import { memo } from 'react';
import type { Step } from '../../data/task22';
import { GraphViewer } from '../GraphViewer/GraphViewer';
import './StepCard.css';

interface Props {
  step: Step;
  stepIndex: number;
  selected: number | null;
  onSelect: (index: number) => void;
  showResult: boolean;
}

export const StepCard = memo(function StepCard({ step, stepIndex, selected, onSelect, showResult }: Props) {
  const isCorrect = selected === step.correctIndex;

  return (
    <div className="step-card">
      <div className="step-header">
        <span className="step-number">Шаг {stepIndex + 1}</span>
      </div>
      <div className="step-question">{step.question}</div>
      <div className="step-options">
        {step.options.map((opt, i) => {
          let cls = 'step-option';
          if (showResult && selected !== null) {
            if (i === step.correctIndex) cls += ' correct';
            else if (i === selected && !isCorrect) cls += ' wrong';
          } else if (selected === i) {
            cls += ' selected';
          }

          return (
            <div
              key={i}
              className={cls}
              role="button"
              tabIndex={0}
              onClick={() => !showResult && onSelect(i)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); !showResult && onSelect(i); } }}
            >
              <div className="step-option-label">{String.fromCharCode(65 + i)})</div>
              <div className="step-option-body">
                {opt.text && <div className="step-option-text">{opt.text}</div>}
                {opt.graphFns && opt.graphFns.length > 0 && (
                  <GraphViewer
                    fns={opt.graphFns}
                    width={320}
                    height={260}
                    xRange={opt.graphFns.length > 2 ? [-3, 7] : [-5, 5]}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
      {showResult && (
        <div className={`step-result ${isCorrect ? 'correct' : 'wrong'}`}>
          <strong>{isCorrect ? '✓ Верно!' : '✗ Неверно'}</strong>
          <div className="step-explanation">{step.explanation}</div>
        </div>
      )}
    </div>
  );
});
