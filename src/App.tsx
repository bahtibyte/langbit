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
        <footer className="footer">
          <p>Copyright © 2025 Bahti & Anon8</p>
          <a href="https://github.com/bahtibyte/langbit" target="_blank" rel="noopener noreferrer" className="github-link">
            <svg height="20" width="20" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
            </svg>
          </a>
        </footer>
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
