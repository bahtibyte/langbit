import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import './App.css'
import Korean from './pages/Korean'

function ProgressCircle({ percent }: { percent: number }) {
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - percent / 100);

  let fontSize = '0.62rem';
  if (percent < 10) fontSize = '0.78rem'; // 1-digit
  else if (percent === 100) fontSize = '0.58rem'; // 100%
  else fontSize = '0.68rem'; // 2-digit

  return (
    <div className="progress-circle">
      <svg width="50" height="50" viewBox="0 0 50 50">
        <circle
          className="circle-bg"
          cx="25"
          cy="25"
          r={radius}
          fill="none"
        />
        <circle
          className="circle"
          cx="25"
          cy="25"
          r={radius}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.4s' }}
          transform="rotate(-90 25 25)"
        />
      </svg>
      <div className="progress-text" style={{ fontSize }}>{percent}%</div>
    </div>
  );
}

function Home() {
  const navigate = useNavigate();
  const routeToKorean = (type: string) => {
    navigate(`/korean?game=${type}`);
  };

  const renderBackgroundChars = (chars: string) => {
    // Split by spaces and duplicate the array to create more characters
    const baseChars = chars.split(' ').filter(char => char.trim() !== '');
    const charArray = [...baseChars, ...baseChars, ...baseChars]; // Triple the number of characters
    
    return (
      <div className="card-bg-text">
        {charArray.map((char, index) => {
          const delay = Math.random() * -15; // Random start time for each character
          return (
            <span 
              key={index} 
              className="bg-char"
              style={{
                animationDelay: `${delay}s`
              }}
            >
              {char}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div className="home-root">
      <div className="top-bar">
        <div className="logo">LangBit</div>
        <div className="lang-selector">
          <span>Korean</span>
          <span className="lang-icon">&#9660;</span>
        </div>
      </div>
      <div className="category-section">
        <div className="category-title">Category</div>
        <div className="category-desc">Select a category to begin your letter-matching journey!</div>
      </div>
      <div className="game-cards">
        {/* Vowels Card */}
        <div className="game-card vowels-card">
          {renderBackgroundChars('ㅏ ㅐ ㅑ ㅒ ㅓ ㅔ ㅕ ㅖ ㅗ ㅘ ㅙ ㅚ ㅛ ㅜ ㅝ ㅞ ㅟ ㅠ ㅡ ㅢ ㅣ')}
          <div className="card-symbol">ㅘ</div>
          <ProgressCircle percent={75} />
          <div className="card-bottom">
            <div className="card-text-content">
              <div className="card-title">Vowels</div>
              <div className="card-desc">Focus on learning Korean vowels, one by one.</div>
            </div>
            <button className="start-btn" onClick={() => routeToKorean('vowels')}>Start</button>
          </div>
        </div>
        {/* Consonants Card */}
        <div className="game-card consonants-card">
          {renderBackgroundChars('ㄱ ㄲ ㄴ ㄷ ㄸ ㄹ ㅁ ㅂ ㅃ ㅅ ㅆ ㅇ ㅈ ㅉ ㅊ ㅋ ㅌ ㅍ ㅎ')}
          <div className="card-symbol">ㅉ</div>
          <ProgressCircle percent={8} />
          <div className="card-bottom">
            <div className="card-text-content">
              <div className="card-title">Consonants</div>
              <div className="card-desc">Learn and review Korean consonants at your own pace.</div>
            </div>
            <button className="start-btn" onClick={() => routeToKorean('consonants')}>Start</button>
          </div>
        </div>
        {/* Mix Letters Card */}
        <div className="game-card mix-card">
          {renderBackgroundChars('ㅏ ㄱ ㅐ ㄲ ㅑ ㄴ ㅒ ㄷ ㅓ ㄸ ㅔ ㄹ ㅕ ㅁ ㅖ ㅂ ㅗ ㅃ ㅘ ㅅ ㅙ ㅆ ㅚ ㅇ ㅛ ㅈ ㅜ ㅉ ㅝ ㅊ ㅞ ㅋ ㅟ ㅌ ㅠ ㅡ ㅍ ㅢ ㅎ ㅣ')}
          <div className="card-symbol mix-symbols">
            <span className="rotated">ㅘ</span> <span>ㅉ</span>
          </div>
          <ProgressCircle percent={100} />
          <div className="card-bottom">
            <div className="card-text-content">
              <div className="card-title">Mix Letters</div>
              <div className="card-desc">Combine vowels and consonants to build a solid foundation.</div>
            </div>
            <button className="start-btn" onClick={() => routeToKorean('both')}>Start</button>
          </div>
        </div>
      </div>
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
