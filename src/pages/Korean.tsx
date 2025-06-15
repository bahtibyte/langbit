import { useSearchParams } from 'react-router-dom';

function Korean() {
  const [searchParams] = useSearchParams();
  const gameType = searchParams.get('game');

  return (
    <div>
      <h1>Korean Game</h1>
      <p>Game Type: {gameType}</p>
    </div>
  );
}

export default Korean; 