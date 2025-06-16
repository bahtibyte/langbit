import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import './App.css'
import Korean from './pages/Korean'
import BackgroundChars from './components/BackgroundChars'

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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('Korean');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const routeToKorean = (type: string) => {
    navigate(`/korean?game=${type}`);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    setIsDropdownOpen(false);
  };

  return (
    <div className="home-root">
      <div className="scrollable-container">
        <div className="top-bar">
          <div className="logo">Langbit<span className="logo-korean">랑</span><span className="logo-korean">빗</span></div>
          <div className="lang-selector" ref={dropdownRef} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <div className="lang-selector-button">
              <span>{selectedLanguage}</span>
              <span className="lang-icon">&#9660;</span>
            </div>
            {isDropdownOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '0.2rem',
                backgroundColor: 'var(--card-bg)',
                borderRadius: '12px',
                padding: '0.5rem',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                zIndex: 1000,
                minWidth: '180px'
              }}>
                <div
                  style={{
                    padding: '0.5rem 1rem',
                    cursor: 'pointer',
                    borderRadius: '8px',
                    transition: 'background-color 0.2s ease',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: selectedLanguage === 'Korean' ? 'rgba(255, 255, 255, 0.05)' : 'transparent'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = selectedLanguage === 'Korean' ? 'rgba(255, 255, 255, 0.05)' : 'transparent')}
                  onClick={() => handleLanguageSelect('Korean')}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginRight: '0.5rem', width: '1.2em', textAlign: 'center', fontWeight: 'bold', color: 'rgba(255, 255, 255, 0.7)' }}>랑</span><span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Korean</span>
                  </div>
                  {selectedLanguage === 'Korean' && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  )}
                </div>
                <div
                  style={{
                    padding: '0.5rem 1rem',
                    cursor: 'pointer',
                    borderRadius: '8px',
                    transition: 'background-color 0.2s ease',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: selectedLanguage === 'Russian' ? 'rgba(255, 255, 255, 0.05)' : 'transparent'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = selectedLanguage === 'Russian' ? 'rgba(255, 255, 255, 0.05)' : 'transparent')}
                  onClick={() => handleLanguageSelect('Russian')}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginRight: '0.5rem', width: '1.2em', textAlign: 'center', fontWeight: 'bold', color: 'rgba(255, 255, 255, 0.7)' }}>Я</span><span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Russian</span>
                  </div>
                  {selectedLanguage === 'Russian' && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="category-section">
          <div className="category-title">Category</div>
          <div className="category-desc">Select a category to begin your letter-matching journey!</div>
        </div>
        <div className="game-cards">
          {/* Vowels Card */}
          <div className="game-card vowels-card">
            <BackgroundChars chars='ㅏ ㅐ ㅑ ㅒ ㅓ ㅔ ㅕ ㅖ ㅗ ㅘ ㅙ ㅚ ㅛ ㅜ ㅝ ㅞ ㅟ ㅠ ㅡ ㅢ ㅣ' />
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
            <BackgroundChars chars='ㄱ ㄲ ㄴ ㄷ ㄸ ㄹ ㅁ ㅂ ㅃ ㅅ ㅆ ㅇ ㅈ ㅉ ㅊ ㅋ ㅌ ㅍ ㅎ' />
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
            <BackgroundChars chars='ㅏ ㄱ ㅐ ㄲ ㅑ ㄴ ㅒ ㄷ ㅓ ㄸ ㅔ ㄹ ㅕ ㅁ ㅖ ㅂ ㅗ ㅃ ㅘ ㅅ ㅙ ㅆ ㅚ ㅇ ㅛ ㅈ ㅜ ㅉ ㅝ ㅊ ㅞ ㅋ ㅟ ㅌ ㅠ ㅡ ㅍ ㅢ ㅎ ㅣ' />
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
        <div className="bottom-spacer"></div>
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
