import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';

const VOWELS: Record<string, string> = {
  'ㅏ': 'a', 'ㅑ': 'ya', 'ㅓ': 'eo', 'ㅕ': 'yeo', 'ㅗ': 'o',
  'ㅛ': 'yo', 'ㅜ': 'u', 'ㅠ': 'yu', 'ㅡ': 'eu', 'ㅣ': 'i',
  'ㅐ': 'ae', 'ㅒ': 'yae', 'ㅔ': 'e', 'ㅖ': 'ye'
};

const CONSONANTS: Record<string, string> = {
  'ㄱ': 'g', 'ㄴ': 'n', 'ㄷ': 'd', 'ㄹ': 'r/l', 'ㅁ': 'm',
  'ㅂ': 'b', 'ㅅ': 's', 'ㅇ': 'ng', 'ㅈ': 'j', 'ㅊ': 'ch',
  'ㅋ': 'k', 'ㅌ': 't', 'ㅍ': 'p', 'ㅎ': 'h'
};

function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

function Korean() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const gameType = searchParams.get('game'); // "vowels" | "consonants" | "both"

  const [questionPool, setQuestionPool] = useState<[string, string][]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<[string, string] | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);

  const selectedMap = useMemo(() => {
    if (gameType === 'vowels') return VOWELS;
    if (gameType === 'consonants') return CONSONANTS;
    return { ...VOWELS, ...CONSONANTS };
  }, [gameType]);

  useEffect(() => {
    const entries = Object.entries(selectedMap);
    setQuestionPool(shuffleArray(entries));
  }, [selectedMap]);

  const nextRound = () => {
    if (questionPool.length === 0) {
      setCurrentQuestion(null);
      return;
    }

    const [next, ...rest] = questionPool;
    setQuestionPool(rest);
    setCurrentQuestion(next);
    setSelectedAnswer(null);

    const allAnswers = Object.values(selectedMap).filter(val => val !== next[1]);
    const randomWrongAnswers = shuffleArray(allAnswers).slice(0, 4);
    const mixedOptions = shuffleArray([...randomWrongAnswers, next[1]]);
    setOptions(mixedOptions);
  };

  useEffect(() => {
    if (questionPool.length > 0 && !currentQuestion) {
      nextRound();
    }
  }, [questionPool]);

  const handleAnswerClick = (answer: string) => {
    if (selectedAnswer) return;
    setSelectedAnswer(answer);
    if (answer === currentQuestion?.[1]) {
      setCorrectAnswers(prev => prev + 1);
    } else {
      setIncorrectAnswers(prev => prev + 1);
    }
  };

  const handleRemove = () => {
    if (selectedAnswer === currentQuestion?.[1]) {
      setQuestionPool(prev => prev.filter(([k]) => k !== currentQuestion[0]));
    }
    nextRound();
  };

  const handleNext = () => {
    setQuestionPool(prev => [...prev, currentQuestion!]); // Push back to end if not removed
    nextRound();
  };

  if (!currentQuestion) {
    return <div><h1>Game Over!</h1><p>You finished all questions.</p></div>;
  }

  return (
    <div className="app-container">
      <div style={{ 
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem',
          borderBottom: '1px solid var(--border)',
          backgroundColor: 'var(--card-bg)',
          color: 'var(--text)'
        }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
              color: 'var(--text)'
            }}
          >
            ←
          </button>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: 'green' }}>✓</span>
              <span>{correctAnswers}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: 'red' }}>✗</span>
              <span>{incorrectAnswers}</span>
            </div>
          </div>
        </div>

        <div style={{ 
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: '1rem',
          gap: '1rem',
          overflow: 'hidden'
        }}>
          <div
            style={{
              aspectRatio: '1',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid var(--border)',
              borderRadius: '12px',
              backgroundColor: 'var(--card-bg)'
            }}
          >
            {currentQuestion[0]}
          </div>

          <div style={{ 
            width: '100%',
            display: 'flex',
            alignItems: 'stretch',
            justifyContent: 'space-between',
            gap: '0.5rem',
            backgroundColor: 'var(--card-bg)',
            borderRadius: '12px',
            border: '2px solid var(--border)',
            padding: '0.5rem'
          }}>
            {selectedAnswer === null ? (
              options.map(option => (
                <button
                  key={option}
                  onClick={() => handleAnswerClick(option)}
                  style={{
                    flex: 1,
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    backgroundColor: 'var(--background)',
                    color: 'var(--text)',
                    cursor: 'pointer',
                    padding: '0.5rem',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {option}
                </button>
              ))
            ) : (
              <>
                <button
                  onClick={handleRemove}
                  disabled={selectedAnswer !== currentQuestion[1]}
                  style={{
                    flex: 1,
                    borderRadius: '8px',
                    backgroundColor: selectedAnswer === currentQuestion[1] ? '#dfffe0' : 'var(--background)',
                    color: 'var(--text)',
                    border: '1px solid var(--border)',
                    cursor: selectedAnswer === currentQuestion[1] ? 'pointer' : 'not-allowed',
                    padding: '0.5rem',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  Remove
                </button>

                <div
                  style={{
                    flex: 1,
                    borderRadius: '8px',
                    backgroundColor: selectedAnswer === currentQuestion[1] ? 'lightgreen' : 'salmon',
                    color: 'black',
                    border: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0.5rem',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {selectedAnswer}
                </div>

                <button
                  onClick={handleNext}
                  style={{
                    flex: 1,
                    borderRadius: '8px',
                    backgroundColor: 'var(--background)',
                    color: 'var(--text)',
                    border: '1px solid var(--border)',
                    cursor: 'pointer',
                    padding: '0.5rem',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  Next
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Korean;
