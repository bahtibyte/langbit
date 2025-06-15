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
          backgroundColor: 'var(--russian-accent)',
          color: 'var(--text)',
          cursor: isCorrect ? 'pointer' : 'not-allowed',
          padding: '0.5rem',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          opacity: isCorrect ? 1 : 0.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem',
          transition: 'transform 0.2s ease'
        }}
        onMouseOver={(e) => {
          if (isCorrect) {
            e.currentTarget.style.transform = 'translateY(-2px)';
          }
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        Remove
      </button>

      <div
        style={{
          width: '80px',
          borderRadius: '12px',
          backgroundColor: isCorrect ? '#2ecc71' : '#e74c3c',
          color: 'white',
          border: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0.5rem',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          fontSize: '1.5rem',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
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
          backgroundColor: 'var(--russian-accent)',
          color: 'var(--text)',
          cursor: 'pointer',
          padding: '0.5rem',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem',
          transition: 'transform 0.2s ease'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        Next
      </button>
    </div>
  );
} 