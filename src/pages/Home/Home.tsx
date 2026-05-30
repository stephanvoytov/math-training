import { Link } from 'react-router-dom';
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
];

export function Home() {
  return (
    <div className="home">
      <div className="hero">
        <h1>Подготовка к ОГЭ по математике</h1>
        <p>Тренажёр для отработки вычислительных навыков. Выберите тему для тренировки или перейдите к теории.</p>
      </div>

      <div className="topics-grid">
        {topics.map((topic) => (
          <Link to={topic.path} key={topic.key} className="topic-card">
            <div className="topic-icon"><span aria-hidden="true">{topic.icon}</span></div>
            <h2 className="topic-title">{topic.title}</h2>
            <p className="topic-desc">{topic.desc}</p>
            {/*<ProgressBar current={0} total={0} />*/}
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
      </div>
    </div>
  );
}
