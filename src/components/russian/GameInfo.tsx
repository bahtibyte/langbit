interface GameInfoProps {
  remainingCount: number;
}

export function GameInfo({ remainingCount }: GameInfoProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '1rem'
    }}>
      <h1 style={{
        color: 'var(--russian-accent)',
        margin: 0,
        fontSize: '2rem'
      }}>
        Russian
      </h1>
      <p style={{
        color: 'var(--text)',
        margin: 0,
        opacity: 0.8
      }}>
        Studying {remainingCount} letters.
      </p>
    </div>
  );
} 