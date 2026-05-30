import { useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { theoryData } from '../../data/theory';
import { Task22Theory } from '../Task22Theory/Task22Theory';
import './Docs.css';

export function Docs() {
  const location = useLocation();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (location.hash && contentRef.current) {
      const id = location.hash.replace('#', '');
      const el = contentRef.current.querySelector(`[data-theory="${id}"]`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location.hash]);

  return (
    <div className="docs-page" ref={contentRef}>
      <h1 className="page-title">Теория и справочные материалы</h1>
      <p className="page-desc">Повторение правил, свойств и алгоритмов для подготовки к ОГЭ</p>

      <div className="docs-toc">
        <h3>Содержание:</h3>
        <div className="docs-toc-list">
          {theoryData.map((s) => (
            <a key={s.key} href={`#${s.key}`} className="docs-toc-link">
              {s.title}
            </a>
          ))}
        </div>
      </div>

      {theoryData.map((section) => (
        <div key={section.key} className="docs-section" data-theory={section.key}>
          {section.key === 'task22' ? (
            <Task22Theory />
          ) : (
            <div
              className="docs-content"
              dangerouslySetInnerHTML={{ __html: section.content }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
