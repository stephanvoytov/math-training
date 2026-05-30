import { Link, useLocation } from 'react-router-dom';
import './Layout.css';

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  const navItems = [
    { to: '/', label: 'Главная' },
    { to: '/topics', label: 'Темы' },
    { to: '/task6', label: '6 задание ОГЭ' },
    { to: '/docs', label: 'Теория' },
  ];

  return (
    <div className="layout">
      <header className="header">
        <div className="header-inner">
          <Link to="/" className="logo">
            <span className="logo-icon">∑</span>
            <span className="logo-text">Математика ОГЭ</span>
          </Link>
          <nav className="nav">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`nav-link ${location.pathname === item.to ? 'active' : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="main">{children}</main>
      <footer className="footer">
        <p>Тренажёр для подготовки к ОГЭ по математике</p>
      </footer>
    </div>
  );
}
