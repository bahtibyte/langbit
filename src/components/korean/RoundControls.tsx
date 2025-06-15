interface RoundControlsProps {
  selectedAnswer: string;
  currentQuestion: [string, string];
  onRemove: () => void;
  onNext: () => void;
}

export function RoundControls({ selectedAnswer, currentQuestion, onRemove, onNext }: RoundControlsProps) {
  const isCorrect = selectedAnswer === currentQuestion[1];

  return (
    <div style={{ 
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1.5rem',
      marginTop: '1rem'
    }}>
      <button
        onClick={onRemove}
        disabled={!isCorrect}
        style={{
          width: '120px',
          borderRadius: '12px',
          border: '1px solid var(--border)',
          backgroundColor: 'var(--background)',
          color: 'var(--foreground)',
          cursor: isCorrect ? 'pointer' : 'not-allowed',
          padding: '0.5rem',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          opacity: isCorrect ? 1 : 0.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem'
        }}
      >
        Remove
      </button>

      <div
        style={{
          width: '80px',
          borderRadius: '12px',
          backgroundColor: isCorrect ? 'lightgreen' : 'salmon',
          color: 'black',
          border: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0.5rem',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          fontSize: '1.5rem'
        }}
      >
        {selectedAnswer}
      </div>

      <button
        onClick={onNext}
        style={{
          width: '120px',
          borderRadius: '12px',
          border: '1px solid var(--border)',
          backgroundColor: 'var(--background)',
          color: 'var(--foreground)',
          cursor: 'pointer',
          padding: '0.5rem',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem'
        }}
      >
        Next
      </button>
    </div>
  );
} 