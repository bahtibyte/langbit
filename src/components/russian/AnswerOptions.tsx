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
            transition: 'transform 0.2s ease',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
          }}
        >
          {option}
        </button>
      ))}
    </div>
  );
} 