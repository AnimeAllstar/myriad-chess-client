import { useGameState } from '@myriad-chess/components/GameStateProvider'
import { MINIMAX_AI_URL } from '@myriad-chess/constants'
import { Button } from 'react-bootstrap'

interface InGameDisplayProps {
  onReset?: () => void
}

const InGameDisplay: React.FC<InGameDisplayProps> = ({ onReset }) => {
  const { gameMode, setAi1, setAi2, setPlayer, setGameMode, setGameStarted } = useGameState()

  const handleReset = () => {}

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>{gameMode}</h2>
      <Button variant='primary' onClick={handleReset}>
        Reset
      </Button>
    </div>
  )
}

export default InGameDisplay
