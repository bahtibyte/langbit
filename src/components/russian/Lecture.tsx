interface LectureProps {
  russianLetter: string;
  translation: string;
  show: boolean;
}

export function Lecture({ russianLetter, translation, show }: LectureProps) {
  if (!show) return null;

  return (
    <div style={{
      width: '100%',
      maxWidth: '400px',
      padding: '1rem',
      backgroundColor: 'var(--russian-accent)',
      borderRadius: '12px',
      border: '2px solid var(--border)',
      textAlign: 'center',
      margin: '0 auto',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    }}>
      <p style={{ margin: 0, color: 'var(--text)', opacity: 0.8 }}>
        Incorrect, <span style={{ color: '#2ecc71', fontWeight: 'bold' }}>{russianLetter}</span> is translated to <span style={{ color: '#2ecc71', fontWeight: 'bold' }}>{translation}</span>
      </p>
    </div>
  );
} 