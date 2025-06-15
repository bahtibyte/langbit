import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'
import Korean from './pages/Korean'

function ProgressCircle({ percent }: { percent: number }) {
  const radius = 19;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - percent / 100);

  let fontSize = '0.62rem';
  if (percent < 10) fontSize = '0.78rem'; // 1-digit
  else if (percent === 100) fontSize = '0.58rem'; // 100%
  else fontSize = '0.68rem'; // 2-digit

  return (
    <div className="progress-circle">
      <svg width="44" height="44" viewBox="0 0 44 44">
        <circle
          className="circle-bg"
          cx="22"
          cy="22"
          r={radius}
          fill="none"
          stroke="#fff"
          strokeWidth="5.5"
          opacity="0.18"
        />
        <circle
          className="circle"
          cx="22"
          cy="22"
          r={radius}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.4s' }}
          transform="rotate(-90 22 22)"
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
          <div className="card-bg-text">ㅏ ㅐ ㅑ ㅒ ㅓ ㅔ ㅕ ㅖ ㅗ ㅘ ㅙ ㅚ ㅛ ㅜ ㅝ ㅞ ㅟ ㅠ ㅡ ㅢ ㅣ ㅏ ㅐ ㅑ ㅒ ㅓ ㅔ ㅕ ㅖ ㅗ ㅘ ㅙ ㅚ ㅛ ㅜ ㅝ ㅞ ㅟ ㅠ ㅡ ㅢ ㅣ</div>
          <div className="card-symbol">ㅘ</div>
          <ProgressCircle percent={75} />
          <div className="card-bottom">
            <div>
              <div className="card-title">Vowels</div>
              <div className="card-desc">Focus on learning Korean vowels, one by one.</div>
            </div>
            <button className="start-btn" onClick={() => routeToKorean('vowels')}>Start</button>
          </div>
        </div>
        {/* Consonants Card */}
        <div className="game-card consonants-card">
          <div className="card-bg-text">ㄱ ㄲ ㄴ ㄷ ㄸ ㄹ ㅁ ㅂ ㅃ ㅅ ㅆ ㅇ ㅈ ㅉ ㅊ ㅋ ㅌ ㅍ ㅎ ㄱ ㄲ ㄴ ㄷ ㄸ ㄹ ㅁ ㅂ ㅃ ㅅ ㅆ ㅇ ㅈ ㅉ ㅊ ㅋ ㅌ ㅍ ㅎ</div>
          <div className="card-symbol">ㅉ</div>
          <ProgressCircle percent={8} />
          <div className="card-bottom">
            <div>
              <div className="card-title">Consonants</div>
              <div className="card-desc">Learn and review Korean consonants at your own pace.</div>
            </div>
            <button className="start-btn" onClick={() => routeToKorean('consonants')}>Start</button>
          </div>
        </div>
        {/* Mix Letters Card */}
        <div className="game-card mix-card">
          <div className="card-bg-text">ㅏ ㄱ ㅐ ㄲ ㅑ ㄴ ㅒ ㄷ ㅓ ㄸ ㅔ ㄹ ㅕ ㅁ ㅖ ㅂ ㅗ ㅃ ㅘ ㅅ ㅙ ㅆ ㅚ ㅇ ㅛ ㅈ ㅜ ㅉ ㅝ ㅊ ㅞ ㅋ ㅟ ㅌ ㅠ ㅡ ㅍ ㅢ ㅎ ㅣ ㅏ ㄱ ㅐ ㄲ ㅑ ㄴ ㅒ ㄷ ㅓ ㄸ ㅔ ㄹ ㅕ ㅁ ㅖ ㅂ ㅗ ㅃ ㅘ ㅅ ㅙ ㅆ ㅚ ㅇ ㅛ ㅈ ㅜ ㅉ ㅝ ㅊ ㅞ ㅋ ㅟ ㅌ ㅠ ㅡ ㅍ ㅢ ㅎ ㅣ</div>
          <div className="card-symbol mix-symbols">
            <span className="rotated">ㅘ</span> <span>ㅉ</span>
          </div>
          <ProgressCircle percent={100} />
          <div className="card-bottom">
            <div>
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
