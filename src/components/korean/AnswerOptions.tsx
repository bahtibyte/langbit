interface AnswerOptionsProps {
  options: string[];
  onAnswerClick: (answer: string) => void;
  gameType?: 'vowels' | 'consonants' | 'both';
}

export function AnswerOptions({ options, onAnswerClick, gameType = 'both' }: AnswerOptionsProps) {
  const getGradient = () => {
    switch (gameType) {
      case 'vowels':
        return 'linear-gradient(135deg, #FF768F 0%, #FEA3AA 33%, #F8A293 66%, #FF9572 100%)';
      case 'consonants':
        return 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)';
      case 'both':
        return 'linear-gradient(135deg, #fbc2eb 0%, #fd868c 100%)';
      default:
        return 'linear-gradient(135deg, #fbc2eb 0%, #fd868c 100%)';
    }
  };

  return (
    <div style={{ 
      width: '100%',
      maxWidth: '400px',
      display: 'flex',
      alignItems: 'stretch',
      justifyContent: 'space-between',
      gap: '1rem',
      marginTop: '1.5rem'
    }}>
      {options.map(option => (
        <button
          key={option}
          onClick={() => onAnswerClick(option)}
          className="answer-button"
          style={{
            '--hover-gradient': getGradient()
          } as React.CSSProperties}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

const style = document.createElement('style');
style.textContent = `
  .answer-button {
    flex: 1;
    aspect-ratio: 1;
    border-radius: 16px;
    border: none;
    outline: none;
    background: #2d2d2d;
    color: #FFFFFF;
    cursor: pointer;
    padding: 0.5rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
    font-family: 'Roboto Flex';
    font-weight: 700;
    transform: scale(1);
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), background 0s;
  }

  .answer-button:hover {
    transform: scale(1.1);
    background: var(--hover-gradient);
    animation: shake 1.2s cubic-bezier(0.4, 0, 0.2, 1) infinite alternate;
  }

  .answer-button:focus {
    outline: none;
  }

  @keyframes shake {
    0% { transform: scale(1.1) rotate(0deg); }
    25% { transform: scale(1.1) rotate(2deg); }
    50% { transform: scale(1.1) rotate(-2deg); }
    75% { transform: scale(1.1) rotate(2deg); }
    100% { transform: scale(1.1) rotate(0deg); }
  }
`;
document.head.appendChild(style); 