import React, { useEffect, useState } from 'react';

interface QuestionCardProps {
  question: string;
  gameType: 'vowels' | 'consonants' | 'both';
  isIncorrect?: boolean;
  isCorrect?: boolean;
}

const getGradient = (gameType: 'vowels' | 'consonants' | 'both') => {
  switch (gameType) {
    case 'vowels':
      return 'linear-gradient(135deg, #FF768F 0%, #FEA3AA 33%, #F8A293 66%, #FF9572 100%)';
    case 'consonants':
      return 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)';
    case 'both':
      return 'linear-gradient(135deg, #fbc2eb 0%, #fd868c 100%)';
  }
};

export const QuestionCard: React.FC<QuestionCardProps> = ({ question, gameType, isIncorrect, isCorrect }) => {
  const [shake, setShake] = useState(false);
  const [bounce, setBounce] = useState(false);

  useEffect(() => {
    if (isIncorrect) {
      setShake(true);
      const timer = setTimeout(() => setShake(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isIncorrect]);

  useEffect(() => {
    if (isCorrect) {
      setBounce(true);
      const timer = setTimeout(() => setBounce(false), 600);
      return () => clearTimeout(timer);
    }
  }, [isCorrect]);

  const style = document.createElement('style');
  style.textContent = `
    .question-card {
      aspect-ratio: 1;
      width: 100%;
      max-width: 350px;
      max-height: 350px;
      padding: 1rem;
      font-size: 8rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid var(--border);
      border-radius: 12px;
      background: ${getGradient(gameType)};
      color: #FFFFFF;
      margin: 0 auto;
      transition: transform 0.1s ease;
    }

    .question-card.shake {
      animation: incorrect-shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
    }

    .question-card.bounce {
      animation: correct-bounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both;
    }

    @keyframes incorrect-shake {
      10%, 90% { transform: translate3d(-1px, 0, 0); }
      20%, 80% { transform: translate3d(2px, 0, 0); }
      30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
      40%, 60% { transform: translate3d(4px, 0, 0); }
    }

    @keyframes correct-bounce {
      0% { transform: scale(1); }
      50% { transform: scale(1.08); }
      100% { transform: scale(1); }
    }
  `;
  document.head.appendChild(style);

  return (
    <div className={`question-card ${shake ? 'shake' : ''} ${bounce ? 'bounce' : ''}`}>
      {question}
    </div>
  );
}; 