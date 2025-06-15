import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'
import Korean from './pages/Korean'

function Home() {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState('korean');

  const handleGameSelect = (type: string) => {
    navigate(`/korean?game=${type}`);
  };

  return (
    <div className="container">
      <h1>Language Learning</h1>
      <select 
        value={selectedLanguage} 
        onChange={(e) => setSelectedLanguage(e.target.value)}
      >
        <option value="">Select a language</option>
        <option value="korean">Korean</option>
      </select>

      {selectedLanguage === 'korean' && (
        <div className="game-cards">
          <div className="card" onClick={() => handleGameSelect('vowels')}>
            <h2>Vowels</h2>
          </div>
          <div className="card" onClick={() => handleGameSelect('consonants')}>
            <h2>Consonants</h2>
          </div>
          <div className="card" onClick={() => handleGameSelect('both')}>
            <h2>Both</h2>
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/korean" element={<Korean />} />
      </Routes>
    </Router>
  );
}

export default App
