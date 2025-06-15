interface HeaderProps {
  onBack: () => void;
  correctAnswers: number;
  incorrectAnswers: number;
}

export function Header({ onBack, correctAnswers, incorrectAnswers }: HeaderProps) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem',
      borderBottom: '1px solid var(--border)',
      backgroundColor: 'var(--card-bg)',
      color: 'var(--text)'
    }}>
      <button
        onClick={onBack}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '0.5rem',
          color: 'var(--text)'
        }}
      >
        ←
      </button>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ color: '#2ecc71' }}>✓</span>
          <span>{correctAnswers}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ color: '#e74c3c' }}>✗</span>
          <span>{incorrectAnswers}</span>
        </div>
      </div>
    </div>
  );
} 