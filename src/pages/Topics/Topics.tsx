import { Link } from 'react-router-dom';
import './Topics.css';

const topics = [
  { key: 'addsub', title: 'Сложение и вычитание', desc: 'Устный счёт', icon: '➕', color: '#10b981' },
  { key: 'muldiv', title: 'Умножение и деление', desc: 'Таблица умножения', icon: '✖️', color: '#3b82f6' },
  { key: 'powers', title: 'Степени', desc: 'Свойства степеней', icon: '🔢', color: '#8b5cf6' },
];

export function Topics() {
  return (
    <div className="topics-page">
      <h1 className="page-title">Темы для тренировки</h1>
      <p className="page-desc">Выберите тему и начните решать примеры</p>
      <div className="topics-list">
        {topics.map((t) => (
          <Link to={`/practice/${t.key}`} key={t.key} className="topics-item" style={{ borderLeftColor: t.color }}>
            <div className="topics-item-icon"><span aria-hidden="true">{t.icon}</span></div>
            <div className="topics-item-body">
              <h3>{t.title}</h3>
              <p>{t.desc}</p>
            </div>
            <div className="topics-item-arrow">→</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
