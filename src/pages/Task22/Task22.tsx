import { useState } from 'react';
import { Link } from 'react-router-dom';
import { task22Examples, type Task22Example } from '../../data/task22';
import { StepCard } from '../../components/StepCard/StepCard';
import './Task22.css';

export function Task22() {
  const [selectedExample, setSelectedExample] = useState<Task22Example | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState<Record<number, boolean>>({});

  const handleSelect = (stepIndex: number, optionIndex: number) => {
    setAnswers((prev) => ({ ...prev, [stepIndex]: optionIndex }));
    setShowResults((prev) => ({ ...prev, [stepIndex]: true }));
  };

  const handleNext = () => {
    if (selectedExample && currentStep < selectedExample.steps.length - 1) {
      setCurrentStep((s) => s + 1);
    }
  };

  const handleReset = () => {
    setSelectedExample(null);
    setCurrentStep(0);
    setAnswers({});
    setShowResults({});
  };

  const pickExample = (ex: Task22Example) => {
    setSelectedExample(ex);
    setCurrentStep(0);
    setAnswers({});
    setShowResults({});
  };

  if (!selectedExample) {
    return (
      <div className="task22-page">
        <h1 className="page-title">22 задание ОГЭ — Графики функций</h1>
        <p className="page-desc">
          Пошаговый разбор задач с построением графиков. Выберите пример для изучения.
        </p>

        <div className="task22-intro">
          <h2>Формат задания</h2>
          <p>
            Задание 22 — задача высокого уровня сложности (2 балла). Нужно:
          </p>
          <ol>
            <li><strong>Построить график</strong> функции (упростить, раскрыть модуль, учесть ОДЗ)</li>
            <li>Провести прямую <em>y = m</em> или <em>y = kx</em></li>
            <li><strong>Определить значения параметра</strong>, при которых прямая пересекает график в заданном количестве точек</li>
          </ol>
          <Link to="/docs#task22" className="theory-link" style={{ marginTop: 12, display: 'inline-flex' }}>
            📖 Полная теория в документации
          </Link>
        </div>

        <div className="task22-examples">
          {task22Examples.map((ex) => (
            <div key={ex.id} className="task22-example-card" role="button" tabIndex={0} onClick={() => pickExample(ex)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pickExample(ex); } }}>
              <div className="task22-example-header">
                <span className="task22-badge">{ex.title}</span>
              </div>
              <div
                className="task22-example-formula"
                dangerouslySetInnerHTML={{ __html: ex.functionHtml }}
              />
              <p className="task22-example-desc">{ex.functionDesc}</p>
              <div className="task22-example-action">Начать разбор →</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const step = selectedExample.steps[currentStep];
  const selectedAnswer = answers[currentStep] ?? null;
  const showResult = showResults[currentStep] ?? false;
  const isLast = currentStep === selectedExample.steps.length - 1;

  return (
    <div className="task22-page">
      <div className="task22-progress-header">
        <button type="button" className="task22-back" onClick={handleReset}>← Все примеры</button>
        <div className="task22-progress-dots">
          {selectedExample.steps.map((_, i) => (
            <span
              key={i}
              className={`task22-dot ${i === currentStep ? 'active' : ''} ${showResults[i] ? 'done' : ''}`}
            />
          ))}
        </div>
      </div>

      <div className="task22-task">
        <span className="task22-badge">{selectedExample.title}</span>
        <div
          className="task22-task-formula"
          dangerouslySetInnerHTML={{ __html: selectedExample.functionHtml }}
        />
        <p className="task22-task-desc">{selectedExample.functionDesc}</p>
      </div>

      <StepCard
        step={step}
        stepIndex={currentStep}
        selected={selectedAnswer}
        onSelect={(idx) => handleSelect(currentStep, idx)}
        showResult={showResult}
      />

      <div className="task22-nav">
        {showResult && !isLast && (
          <button type="button" className="btn-primary" onClick={handleNext}>
            Следующий шаг →
          </button>
        )}
        {showResult && isLast && (
          <div className="task22-final">
            <h2>Разбор завершён!</h2>
            <p className="task22-final-answer">
              <strong>Ответ:</strong> {selectedExample.finalAnswer}
            </p>
            <p className="task22-final-note">
              На экзамене за это задание можно получить 2 балла. 
              Главное — аккуратно упростить выражение и правильно построить график.
            </p>
            <button type="button" className="btn-primary" onClick={handleReset}>
              ← К списку примеров
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
