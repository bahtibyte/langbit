interface AnswerOptionsProps {
  options: string[];
  onAnswerClick: (answer: string) => void;
}

export function AnswerOptions({ options, onAnswerClick }: AnswerOptionsProps) {
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
      ))}
    </div>
  );
} 