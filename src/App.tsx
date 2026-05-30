import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { Home } from './pages/Home/Home';
import { Topics } from './pages/Topics/Topics';
import { Practice } from './pages/Practice/Practice';
import { Task6 } from './pages/Task6/Task6';
import { Docs } from './pages/Docs/Docs';
import { Task22 } from './pages/Task22/Task22';

function App() {
  return (
    <BrowserRouter basename="/math-training">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/practice/:topic" element={<Practice />} />
          <Route path="/task6" element={<Task6 />} />
          <Route path="/task22" element={<Task22 />} />
          <Route path="/docs" element={<Docs />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
