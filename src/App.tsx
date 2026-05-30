import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { Home } from './pages/Home/Home';
import { Topics } from './pages/Topics/Topics';
import { Practice } from './pages/Practice/Practice';
import { Task6 } from './pages/Task6/Task6';
import { Docs } from './pages/Docs/Docs';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/practice/:topic" element={<Practice />} />
          <Route path="/task6" element={<Task6 />} />
          <Route path="/docs" element={<Docs />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
