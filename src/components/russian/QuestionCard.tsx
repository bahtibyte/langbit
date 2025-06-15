interface QuestionCardProps {
  question: string;
}

export function QuestionCard({ question }: QuestionCardProps) {
  return (
    <div
      style={{
        aspectRatio: '1',
        width: '100%',
        maxWidth: '350px',
        maxHeight: '350px',
        padding: '1rem',
        fontSize: '8rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px solid var(--border)',
        borderRadius: '12px',
        backgroundColor: 'var(--russian-accent)',
        color: 'var(--text)',
        margin: '0 auto',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}
    >
      {question}
    </div>
  );
} 