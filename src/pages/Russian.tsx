import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { Header } from '../components/russian/Header';
import { QuestionCard } from '../components/russian/QuestionCard';
import { AnswerOptions } from '../components/russian/AnswerOptions';
import { RoundControls } from '../components/russian/RoundControls';
import { GameInfo } from '../components/russian/GameInfo';
import { Lecture } from '../components/russian/Lecture';

const VOWELS: Record<string, string> = {
  'а': 'a', 'е': 'ye', 'ё': 'yo', 'и': 'i', 'о': 'o',
  'у': 'u', 'ы': 'y', 'э': 'e', 'ю': 'yu', 'я': 'ya'
};

const CONSONANTS: Record<string, string> = {
  'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'ж': 'zh',
  'з': 'z', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
  'н': 'n', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't',
  'ф': 'f', 'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh',
  'щ': 'shch'
};

function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

function Russian() {
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

    const randomIndex = Math.floor(Math.random() * questionPool.length);
    const next = questionPool[randomIndex];
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
        <Header 
          onBack={() => navigate(-1)}
          correctAnswers={correctAnswers}
          incorrectAnswers={incorrectAnswers}
        />

        <div style={{ 
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: '1rem',
          gap: '1rem',
          overflow: 'hidden'
        }}>
          <GameInfo remainingCount={questionPool.length} />
          <QuestionCard question={currentQuestion[0]} />

          <div style={{ 
            width: '100%',
            maxWidth: '400px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            margin: '0 auto'
          }}>
            {!selectedAnswer ? (
              <AnswerOptions 
                options={options} 
                onAnswerClick={handleAnswerClick} 
              />
            ) : (
              <RoundControls 
                selectedAnswer={selectedAnswer}
                currentQuestion={currentQuestion}
                onRemove={handleRemove}
                onNext={handleNext}
              />
            )}
          </div>
          
          <Lecture
            russianLetter={currentQuestion[0]}
            translation={currentQuestion[1]}
            show={selectedAnswer !== null && selectedAnswer !== currentQuestion[1]}
          />
        </div>
      </div>
    </div>
  );
}

export default Russian; 