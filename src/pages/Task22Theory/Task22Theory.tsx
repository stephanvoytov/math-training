import { useState } from 'react';
import { InteractiveDemo } from '../../components/InteractiveDemo/InteractiveDemo';
import { GraphViewer } from '../../components/GraphViewer/GraphViewer';
import './Task22Theory.css';

const piecewiseExamples = [
  {
    name: 'Пример 1',
    desc: '{ x² при x<0; 2x+1 при x≥0 }',
    fn: (x: number) => (x < 0 ? x * x : 2 * x + 1),
    color: '#f59e0b',
  },
  {
    name: 'Пример 2',
    desc: '{ x+2 при x<1; x²−6x+10 при x≥1 }',
    fn: (x: number) => (x < 1 ? x + 2 : x * x - 6 * x + 10),
    color: '#f59e0b',
  },
];

export function Task22Theory() {
  const [pieceIdx, setPieceIdx] = useState(0);

  return (
    <div className="task22-theory">
      <h2 className="theory-h2">22 задание ОГЭ — Функции и их графики</h2>
      <p className="theory-p">
        Задание высокого уровня сложности (2 балла). Требуется построить график функции
        и определить, при каких значениях параметра <em>m</em> (или <em>k</em>)
        прямая <em>y = m</em> (или <em>y = kx</em>) имеет с графиком заданное количество общих точек.
      </p>

      <h3 className="theory-h3">Основные типы функций</h3>
      <p className="theory-p">Ниже — интерактивные демонстрации каждого типа. Двигайте ползунки, чтобы увидеть, как меняется график.</p>

      <InteractiveDemo
        title="1. Линейная функция"
        formula="y = kx + b"
        fn={(p) => (x) => p.k * x + p.b}
        params={[
          { key: 'k', label: 'k', min: -5, max: 5, step: 0.1, default: 1 },
          { key: 'b', label: 'b', min: -5, max: 5, step: 0.1, default: 0 },
        ]}
        info={(p) => `Наклон: ${p.k.toFixed(1)}. Пересечение с осью y: ${p.b.toFixed(1)}. ${p.k > 0 ? 'Функция возрастает' : p.k < 0 ? 'Функция убывает' : 'Функция постоянна'}.`}
        xRange={[-6, 6]}
        yRange={[-6, 6]}
      />

      <InteractiveDemo
        title="2. Квадратичная функция (парабола)"
        formula="y = ax² + bx + c"
        fn={(p) => (x) => p.a * x * x + p.b * x + p.c}
        params={[
          { key: 'a', label: 'a', min: -3, max: 3, step: 0.1, default: 1 },
          { key: 'b', label: 'b', min: -5, max: 5, step: 0.1, default: 0 },
          { key: 'c', label: 'c', min: -5, max: 5, step: 0.1, default: 0 },
        ]}
        info={(p) => {
          if (p.a === 0) return 'a = 0 — это не парабола, а прямая линия';
          const x0 = -p.b / (2 * p.a);
          const y0 = p.a * x0 * x0 + p.b * x0 + p.c;
          return `Вершина: (${x0.toFixed(1)}; ${y0.toFixed(1)}). Ветви: ${p.a > 0 ? 'вверх ↑' : 'вниз ↓'}.`;
        }}
        xRange={[-6, 6]}
        yRange={[-8, 12]}
        height={400}
      />

      <InteractiveDemo
        title="3. Обратная пропорциональность (гипербола)"
        formula="y = k / x"
        fn={(p) => (x) => p.k / x}
        params={[
          { key: 'k', label: 'k', min: -5, max: 5, step: 0.5, default: 2 },
        ]}
        info={(p) => {
          const q = p.k > 0 ? 'I и III' : 'II и IV';
          return `k = ${p.k.toFixed(1)}. Ветви в ${q} четвертях. Асимптоты: x = 0, y = 0.`;
        }}
        xRange={[-6, 6]}
        yRange={[-6, 6]}
      />

      <InteractiveDemo
        title="4. Функция с модулем"
        formula="y = |x + a| + b"
        fn={(p) => (x) => Math.abs(x + p.a) + p.b}
        params={[
          { key: 'a', label: 'a', min: -5, max: 5, step: 0.1, default: 0 },
          { key: 'b', label: 'b', min: -5, max: 5, step: 0.1, default: 0 },
        ]}
        additionalFns={(p) => {
          const a = p.a;
          const b = p.b;
          return [
            { fn: (x) => x + a + b, color: '#ef444488', label: 'y = x + a + b (x ≥ -a)' },
            { fn: (x) => -(x + a) + b, color: '#3b82f688', label: 'y = -(x + a) + b (x < -a)' },
          ];
        }}
        info={(p) => `Вершина угла: (${(-p.a).toFixed(1)}; ${p.b.toFixed(1)}). Левая ветвь (синяя): наклон -1. Правая ветвь (красная): наклон +1.`}
        xRange={[-6, 6]}
        yRange={[-6, 6]}
      />

      <div className="interactive-demo">
        <div className="demo-header">
          <h4 className="demo-title">5. Кусочно-заданные функции</h4>
          <div className="demo-formula">
            {piecewiseExamples[pieceIdx].desc.split('; ').map((part, i) => (
              <span key={i}>{i > 0 && <br/>}{i === 0 ? part + ';' : part}</span>
            ))}
          </div>
        </div>
        <div className="demo-body" style={{ flexDirection: 'column', alignItems: 'center' }}>
          <div className="demo-piece-tabs">
            {piecewiseExamples.map((ex, i) => (
              <button
                key={i}
                className={`piece-tab ${i === pieceIdx ? 'active' : ''}`}
                onClick={() => setPieceIdx(i)}
              >
                {ex.name}
              </button>
            ))}
          </div>
          <GraphViewer
            fn={piecewiseExamples[pieceIdx].fn}
            xRange={[-5, 7]}
            width={400}
            height={300}
          />
          <p className="theory-p" style={{ fontSize: 13, color: '#93c5fd', alignSelf: 'flex-start' }}>
            График строится по частям: на каждом интервале своя формула. Важно проверить значение на границе интервалов.
          </p>
        </div>
      </div>

      <InteractiveDemo
        title="6. Дробно-рациональная функция"
        formula="y = 1 / (x + a) + b"
        fn={(p) => (x) => 1 / (x + p.a) + p.b}
        params={[
          { key: 'a', label: 'a', min: -3, max: 3, step: 0.1, default: 0 },
          { key: 'b', label: 'b', min: -3, max: 3, step: 0.1, default: 0 },
        ]}
        info={(p) => {
          const xAs = -p.a;
          const yAs = p.b;
          return `Вертикальная асимптота: x = ${xAs.toFixed(1)}. Горизонтальная асимптота: y = ${yAs.toFixed(1)}. ${p.b > 0 ? 'График смещён вверх' : p.b < 0 ? 'График смещён вниз' : ''}`;
        }}
        xRange={[-6, 6]}
        yRange={[-6, 6]}
      />

      <h3 className="theory-h3">Алгоритм решения</h3>
      <ol className="theory-ol">
        <li><strong>Упростить выражение</strong> — раскрыть модули, разложить на множители, сократить дроби</li>
        <li><strong>Найти область определения</strong> (ОДЗ) — точки, где знаменатель равен нулю</li>
        <li><strong>Построить график</strong> упрощённой функции</li>
        <li><strong>Выколоть точки</strong>, не входящие в ОДЗ</li>
        <li><strong>Провести прямую</strong> y = m (горизонтальная) или y = kx (через начало координат)</li>
        <li><strong>Найти значения параметра</strong>, при которых прямая пересекает график в нужном количестве точек</li>
      </ol>

      <h3 className="theory-h3">Как точно построить график от руки</h3>
      <p className="theory-p">
        На ОГЭ график нужно строить по точкам — карандашом на координатной сетке. 
        Для каждого типа функций — свой способ найти нужные точки.
      </p>

      <div className="theory-points">
        <div className="points-card">
          <h4>Парабола y = ax² + bx + c</h4>
          <ol className="theory-ol">
            <li><strong>Вершина:</strong> x₀ = −b/(2a), y₀ = a·x₀² + b·x₀ + c</li>
            <li><strong>Таблица:</strong> берём 2–3 целых x слева и справа от x₀, вычисляем y</li>
            <li><strong>Симметрия:</strong> точки на одинаковом расстоянии от вершины имеют одинаковый y</li>
          </ol>
          <div className="theory-table-wrap">
            <table className="theory-table">
              <thead><tr><th>x</th><th>x₀−2</th><th>x₀−1</th><th>x₀</th><th>x₀+1</th><th>x₀+2</th></tr></thead>
              <tbody><tr><th>y</th><td>...</td><td>...</td><td>y₀</td><td>...</td><td>...</td></tr></tbody>
            </table>
          </div>
        </div>

        <div className="points-card">
          <h4>Гипербола y = k/x</h4>
          <ol className="theory-ol">
            <li><strong>Асимптоты:</strong> x = 0, y = 0</li>
            <li><strong>Таблица:</strong> по 3–4 точки с каждой стороны от x = 0</li>
            <li><strong>Шаг:</strong> чем ближе к 0, тем чаще берите точки (0.5, 1, 2, 3)</li>
          </ol>
          <div className="theory-table-wrap">
            <table className="theory-table">
              <thead><tr><th>x</th><td>−3</td><td>−2</td><td>−1</td><td>−0.5</td><td>0.5</td><td>1</td><td>2</td><td>3</td></tr></thead>
              <tbody><tr><th>y</th><td>−k/3</td><td>−k/2</td><td>−k</td><td>−2k</td><td>2k</td><td>k</td><td>k/2</td><td>k/3</td></tr></tbody>
            </table>
          </div>
        </div>

        <div className="points-card">
          <h4>Модуль и кусочные</h4>
          <ol className="theory-ol">
            <li><strong>Точка излома:</strong> где модуль равен 0 или граница интервала</li>
            <li><strong>Значение на границе:</strong> вычислить для каждой ветви</li>
            <li><strong>Доп. точки:</strong> по 2 точки на каждую ветвь</li>
          </ol>
        </div>
      </div>

      <h3 className="theory-h3">Примеры решений</h3>

      <div className="theory-example">
        <h4>Пример 1: Функция с модулем</h4>
        <p className="theory-p"><strong>Задача:</strong> Постройте график функции y = |x|(x−1) − 3x и определите, при каких p прямая y = p имеет ровно две общие точки.</p>
        <p className="theory-p"><strong>Решение:</strong></p>
        <ol className="theory-ol">
          <li><strong>Раскрываем модуль:</strong> при x ≥ 0: y = x² − 4x. При x &lt; 0: y = −x² − 2x.</li>
          <li><strong>Строим:</strong> правая ветвь — парабола с вершиной (2; −4), левая — парабола с вершиной (−1; 1).</li>
          <li><strong>Ответ:</strong> p = −1, p = 4.</li>
        </ol>
      </div>

      <div className="theory-example">
        <h4>Пример 2: Кусочно-заданная функция</h4>
        <p className="theory-p"><strong>Задача:</strong> Постройте график y = {'{'} x²−6x+10 при x ≥ 1;<br/> x+2 при x &lt; 1 {'}'} и определите, при каких m прямая y = m имеет ровно две общие точки.</p>
        <p className="theory-p"><strong>Решение:</strong></p>
        <ol className="theory-ol">
          <li>При x &lt; 1: прямая y = x + 2.</li>
          <li>При x ≥ 1: парабола y = x² − 6x + 10, вершина (3; 1), при x=1 значение y=5.</li>
          <li><strong>Ответ:</strong> m = 1, m = 3.</li>
        </ol>
      </div>

      <div className="theory-example">
        <h4>Пример 3: Дробно-рациональная функция</h4>
        <p className="theory-p"><strong>Задача:</strong> Постройте график y = (x−1)/(x²−x) и определите, при каких k прямая y = kx имеет ровно одну общую точку.</p>
        <p className="theory-p"><strong>Решение:</strong></p>
        <ol className="theory-ol">
          <li>Упрощаем: y = 1/x. ОДЗ: x ≠ 0, x ≠ 1. Точка (1; 1) — выколотая.</li>
          <li>Прямая y = kx проходит через выколотую точку: 1 = k·1 ⇒ k = 1.</li>
          <li><strong>Ответ:</strong> k = 1.</li>
        </ol>
      </div>

      <h3 className="theory-h3">Рекомендации</h3>
      <ul className="theory-ul">
        <li>Всегда начинайте с упрощения выражения и нахождения ОДЗ</li>
        <li>При раскрытии модуля проверяйте знак на каждом интервале</li>
        <li>Выкалывайте точки, где функция не определена (пустые кружки на графике)</li>
        <li>Горизонтальная прямая y = m может: не пересекать график, пересекать в 1/2/3/4 точках, касаться</li>
        <li>Прямая y = kx всегда проходит через начало координат</li>
      </ul>
    </div>
  );
}
