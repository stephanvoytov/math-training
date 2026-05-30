import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { Home } from './pages/Home/Home';
import { Topics } from './pages/Topics/Topics';
import { Practice } from './pages/Practice/Practice';
import { Task6 } from './pages/Task6/Task6';
import { Docs } from './pages/Docs/Docs';
import { Task22 } from './pages/Task22/Task22';

const titles: Record<string, string> = {
  '/': 'Главная',
  '/topics': 'Темы',
  '/task6': '6 задание ОГЭ',
  '/task22': '22 задание — Графики',
  '/docs': 'Теория',
};

function TitleUpdater() {
  const location = useLocation();
  useEffect(() => {
    const t = titles[location.pathname];
    document.title = t ? `Математика ОГЭ — ${t}` : 'Математика ОГЭ — Тренажёр';
  }, [location.pathname]);
  return null;
}

function App() {
  return (
    <BrowserRouter basename="/math-training">
      <ErrorBoundary>
        <Layout>
          <TitleUpdater />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/topics" element={<Topics />} />
            <Route path="/practice/:topic" element={<Practice />} />
            <Route path="/task6" element={<Task6 />} />
            <Route path="/task22" element={<Task22 />} />
            <Route path="/docs" element={<Docs />} />
          </Routes>
        </Layout>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
