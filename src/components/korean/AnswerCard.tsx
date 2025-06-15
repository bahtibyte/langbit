interface AnswerCardProps {
  options: string[];
  selectedAnswer: string | null;
  currentQuestion: [string, string] | null;
  onAnswerClick: (answer: string) => void;
  onRemove: () => void;
  onNext: () => void;
}

export function AnswerCard({
  options,
  selectedAnswer,
  currentQuestion,
  onAnswerClick,
  onRemove,
  onNext
}: AnswerCardProps) {
  return (
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
            onClick={() => onAnswerClick(option)}
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
            onClick={onRemove}
            disabled={selectedAnswer !== currentQuestion?.[1]}
            style={{
              flex: 1,
              borderRadius: '8px',
              backgroundColor: 'var(--background)',
              color: 'var(--text)',
              border: '1px solid var(--border)',
              cursor: selectedAnswer === currentQuestion?.[1] ? 'pointer' : 'not-allowed',
              padding: '0.5rem',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              opacity: selectedAnswer === currentQuestion?.[1] ? 1 : 0.5
            }}
          >
            Remove
          </button>

          <div
            style={{
              flex: 1,
              borderRadius: '8px',
              backgroundColor: selectedAnswer === currentQuestion?.[1] ? 'lightgreen' : 'salmon',
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
            onClick={onNext}
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
  );
} 