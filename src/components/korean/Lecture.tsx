interface LectureProps {
  koreanLetter: string;
  translation: string;
  show: boolean;
}

export function Lecture({ koreanLetter, translation, show }: LectureProps) {
  if (!show) return null;

  return (
    <div style={{
      width: '100%',
      maxWidth: '400px',
      padding: '1rem',
      backgroundColor: 'var(--card-bg)',
      borderRadius: '12px',
      border: '2px solid var(--border)',
      textAlign: 'center',
      margin: '0 auto'
    }}>
      <p style={{ margin: 0, color: 'var(--text)', opacity: 0.8 }}>
        Incorrect, <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>{koreanLetter}</span> is translated to <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>{translation}</span>
      </p>
    </div>
  );
} 