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
      maxWidth: '400px',
      display: 'flex',
      alignItems: 'stretch',
      justifyContent: 'space-between',
      gap: '1rem',
      marginTop: '1.5rem',
      margin: '0 auto'
    }}>
      {selectedAnswer === null ? (
        options.map(option => (
          <button
            key={option}
            onClick={() => onAnswerClick(option)}
            style={{
              flex: 1,
              aspectRatio: '1',
              borderRadius: '16px',
              border: '1px solid var(--border)',
              background: 'linear-gradient(135deg, #FFFFFF 0%, #F9EFFF 100%)',
              color: 'var(--background)',
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
              aspectRatio: '1',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #FFFFFF 0%, #F9EFFF 100%)',
              color: 'var(--background)',
              border: '1px solid var(--border)',
              cursor: selectedAnswer === currentQuestion?.[1] ? 'pointer' : 'not-allowed',
              padding: '0.5rem',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              opacity: selectedAnswer === currentQuestion?.[1] ? 1 : 0.5,
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
              flex: 1,
              aspectRatio: '1',
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
              textOverflow: 'ellipsis',
              fontSize: '1.5rem'
            }}
          >
            {selectedAnswer}
          </div>

          <button
            onClick={onNext}
            style={{
              flex: 1,
              aspectRatio: '1',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #FFFFFF 0%, #F9EFFF 100%)',
              color: 'var(--background)',
              border: '1px solid var(--border)',
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
        </>
      )}
    </div>
  );
} 