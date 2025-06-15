import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'
import Korean from './pages/Korean'
import Russian from './pages/Russian'

function Home() {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState('');

  const handleGameSelect = (type: string) => {
    if (selectedLanguage === 'korean') {
      navigate(`/korean?game=${type}`);
    } else if (selectedLanguage === 'russian') {
      navigate(`/russian?game=${type}`);
    }
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
        <option value="russian">Russian</option>
      </select>

      {(selectedLanguage === 'korean' || selectedLanguage === 'russian') && (
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
        <Route path="/russian" element={<Russian />} />
      </Routes>
    </Router>
  );
}

export default App
