interface QuestionCardProps {
  question: string;
  gameType?: 'vowels' | 'consonants' | 'both';
}

export function QuestionCard({ question, gameType = 'both' }: QuestionCardProps) {
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
        background: getGradient(),
        color: '#FFFFFF',
        margin: '0 auto'
      }}
    >
      {question}
    </div>
  );
} 