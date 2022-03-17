import './App.css';
import './assets/style/global.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Welcome } from './pages/Welcome';
import { Wait } from './pages/Wait';
import { Playing } from './pages/Playing';
import { ChooseWord } from './pages/ChooseWord';

function App() {
  return (
    <section className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/wait" element={<Wait />} />
          <Route path="/playing/:rule" element={<Playing />} />
          <Route path="/choosing" element={<ChooseWord />} />
        </Routes>
      </BrowserRouter>
    </section>
  );
}

export default App;