import { useState } from 'react';
import './CheatSheet.css';

const sections = [
  {
    key: 'powers',
    label: 'Степени',
    content: `
      <strong>Свойства степеней:</strong><br>
      a<sup>m</sup> · a<sup>n</sup> = a<sup>m+n</sup><br>
      a<sup>m</sup> ÷ a<sup>n</sup> = a<sup>m−n</sup><br>
      (a<sup>m</sup>)<sup>n</sup> = a<sup>m·n</sup><br>
      a<sup>0</sup> = 1<br>
      a<sup>−n</sup> = 1 / a<sup>n</sup><br>
      (a·b)<sup>n</sup> = a<sup>n</sup> · b<sup>n</sup>
    `,
  },
  {
    key: 'roots',
    label: 'Корни',
    content: `
      <strong>Свойства корней:</strong><br>
      √(a·b) = √a · √b<br>
      √(a/b) = √a / √b<br>
      (√a)² = a<br>
      √a² = |a|<br>
      a√b + c√b = (a+c)√b
    `,
  },
  {
    key: 'order',
    label: 'Порядок действий',
    content: `
      <strong>Порядок действий:</strong><br>
      1. Скобки<br>
      2. Степени и корни<br>
      3. Умножение и деление<br>
      4. Сложение и вычитание<br><br>
      <em>«Скобки, степени, умножь-подели,<br>потом сложи-вычти»</em>
    `,
  },
  {
    key: 'graphs',
    label: 'Графики',
    content: `
      <strong>Основные функции:</strong><br>
      y = kx + b — прямая<br>
      y = ax² + bx + c — парабола<br>
      y = k/x — гипербола<br>
      y = |x| — модуль<br>
      y = √x — корень<br>
      y = x³ — кубическая
    `,
  },
];

export function CheatSheet() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState(sections[0].key);

  return (
    <>
      <button
        type="button"
        className="cheatsheet-toggle"
        onClick={() => setOpen((v) => !v)}
        aria-label="Открыть шпаргалку"
        title="Шпаргалка"
      >
        ⚡
      </button>
      {open && (
        <div className="cheatsheet-overlay" onClick={() => setOpen(false)}>
          <div className="cheatsheet-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Шпаргалка">
            <div className="cheatsheet-header">
              <h3>Шпаргалка</h3>
              <button type="button" className="cheatsheet-close" onClick={() => setOpen(false)}>✕</button>
            </div>
            <div className="cheatsheet-tabs">
              {sections.map((s) => (
                <button
                  key={s.key}
                  type="button"
                  className={`cheatsheet-tab ${tab === s.key ? 'active' : ''}`}
                  onClick={() => setTab(s.key)}
                >
                  {s.label}
                </button>
              ))}
            </div>
            <div
              className="cheatsheet-body"
              dangerouslySetInnerHTML={{ __html: sections.find((s) => s.key === tab)?.content || '' }}
            />
          </div>
        </div>
      )}
    </>
  );
}
