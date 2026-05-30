import { Link } from 'react-router-dom';
import { getLastSessions } from '../../utils/stats';
import type { SessionResult } from '../../utils/stats';
import './Home.css';

const topics = [
  {
    key: 'addsub',
    title: 'Сложение и вычитание',
    desc: 'Устный счёт с двузначными, трёхзначными и отрицательными числами',
    icon: '➕',
    path: '/practice/addsub',
  },
  {
    key: 'muldiv',
    title: 'Умножение и деление',
    desc: 'Таблица умножения, деление, быстрые приёмы счёта',
    icon: '✖️',
    path: '/practice/muldiv',
  },
  {
    key: 'powers',
    title: 'Степени',
    desc: 'Свойства степеней, умножение и деление степеней',
    icon: '🔢',
    path: '/practice/powers',
  },
  {
    key: 'task6',
    title: '6 задание ОГЭ',
    desc: 'Числовые выражения со степенями, корнями, дробями',
    icon: '📝',
    path: '/task6',
  },
  {
    key: 'task22',
    title: '22 задание ОГЭ',
    desc: 'Построение графиков функций и определение точек пересечения',
    icon: '📈',
    path: '/task22',
  },
];

function formatDate(iso: string): string {
  const d = new Date(iso);
  return `${d.getDate().toString().padStart(2, '0')}.${(d.getMonth() + 1).toString().padStart(2, '0')} ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
}

function sessionColor(s: SessionResult): string {
  const pct = s.total > 0 ? s.correct / s.total : 0;
  if (pct >= 0.8) return '#10b981';
  if (pct >= 0.5) return '#f59e0b';
  return '#ef4444';
}

export function Home() {
  const lastSessions = getLastSessions(5);

  return (
    <div className="home">
      <div className="hero">
        <h1>Подготовка к ОГЭ по математике</h1>
        <p>Тренажёр для отработки вычислительных навыков. Выберите тему для тренировки или перейдите к теории.</p>
      </div>

      {lastSessions.length > 0 && (
        <div className="recent-sessions">
          <h2 className="recent-title">Последние тренировки</h2>
          <div className="recent-list">
            {lastSessions.map((s, i) => {
              const pct = s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0;
              return (
                <div key={i} className="recent-item">
                  <span className="recent-topic">{s.topic}</span>
                  <span className="recent-score" style={{ color: sessionColor(s) }}>
                    {s.correct}/{s.total} ({pct}%)
                  </span>
                  <span className="recent-date">{formatDate(s.date)}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="topics-grid">
        {topics.map((topic) => (
          <Link to={topic.path} key={topic.key} className="topic-card">
            <div className="topic-icon"><span aria-hidden="true">{topic.icon}</span></div>
            <h2 className="topic-title">{topic.title}</h2>
            <p className="topic-desc">{topic.desc}</p>
          </Link>
        ))}
      </div>

      <div className="quick-links">
        <Link to="/docs" className="quick-link">
          📖 Изучить теорию
        </Link>
        <Link to="/task6" className="quick-link primary">
          🎯 Тренировка 6 задания
        </Link>
        <Link to="/task22" className="quick-link">
          📈 22 задание
        </Link>
      </div>
    </div>
  );
}
