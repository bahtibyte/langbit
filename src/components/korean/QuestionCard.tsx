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
        background: 'linear-gradient(135deg, #FFFFFF 0%, #E9E6F5 100%)',
        color: 'var(--background)',
        margin: '0 auto'
      }}
    >
      {question}
    </div>
  );
} 