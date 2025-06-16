import React from 'react';

interface BackgroundCharsProps {
  chars: string;
}

const BackgroundChars: React.FC<BackgroundCharsProps> = ({ chars }) => {
  const baseChars = chars.split(' ').filter(char => char.trim() !== '');
  const charArray = [...baseChars, ...baseChars, ...baseChars];

  return (
    <div className="card-bg-text">
      {charArray.map((char, index) => {
        const delay = Math.random() * -15;
        return (
          <span 
            key={index} 
            className="bg-char"
            style={{
              animationDelay: `${delay}s`
            }}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
};

export default React.memo(BackgroundChars); 