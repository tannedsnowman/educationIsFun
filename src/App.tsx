// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css'; // Import your custom CSS
import PowerFactor from './pages/PowerFactor';
import PhaseAngle from './pages/PhaseAngle';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <Link to="/powerfactor" className="App-link">
              Power factor
            </Link>
            <Link to="/angle" className="App-link">
              Phase angle
            </Link>
          </nav>
        </header>
        <main className="main-content">
          <Routes>
            <Route path="/powerfactor" element={<PowerFactor />} />
            <Route path="/angle" element={<PhaseAngle />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
