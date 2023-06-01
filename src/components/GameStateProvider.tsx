import { MINIMAX_AI_URL } from '@myriad-chess/constants'
import { Outcome } from '@myriad-chess/types/api'
import { Chess } from 'chess.js'
import { ReactNode, createContext, useContext, useState } from 'react'

type GameStateContextType = {
  game: Chess
  setGame: React.Dispatch<React.SetStateAction<Chess>>
  aiTurn: boolean
  setAiTurn: React.Dispatch<React.SetStateAction<boolean>>
  wTurn: boolean
  setWTurn: React.Dispatch<React.SetStateAction<boolean>>
  outcome: Outcome | null
  setOutcome: React.Dispatch<React.SetStateAction<Outcome | null>>
  Ai1: { color: string; model: string; url: string }
  setAi1: React.Dispatch<React.SetStateAction<{ color: string; model: string; url: string }>>
  Ai2: { color: string; model: string; url: string }
  setAi2: React.Dispatch<React.SetStateAction<{ color: string; model: string; url: string }>>
  player: { color: string }
  setPlayer: React.Dispatch<React.SetStateAction<{ color: string }>>
  gameMode: 'ai_vs_ai' | 'human_vs_ai'
  setGameMode: React.Dispatch<React.SetStateAction<'ai_vs_ai' | 'human_vs_ai'>>
  gameStarted: boolean
  setGameStarted: React.Dispatch<React.SetStateAction<boolean>>
}

interface GameStateProviderProps {
  children: ReactNode
}

const GameStateContext = createContext<GameStateContextType>({
  game: new Chess(),
  setGame: () => {},
  aiTurn: false,
  setAiTurn: () => {},
  wTurn: true,
  setWTurn: () => {},
  outcome: null,
  setOutcome: () => {},
  Ai1: { color: 'white', model: 'minimax', url: MINIMAX_AI_URL },
  setAi1: () => {},
  Ai2: { color: 'black', model: 'minimax', url: MINIMAX_AI_URL },
  setAi2: () => {},
  player: { color: 'white' },
  setPlayer: () => {},
  gameMode: 'ai_vs_ai',
  setGameMode: () => {},
  gameStarted: false,
  setGameStarted: () => {}
})

export const GameStateProvider: React.FC<GameStateProviderProps> = ({ children }) => {
  const [game, setGame] = useState(new Chess())
  const [aiTurn, setAiTurn] = useState(false)
  const [wTurn, setWTurn] = useState(true)
  const [outcome, setOutcome] = useState<Outcome | null>(null)
  const [Ai1, setAi1] = useState({ color: 'white', model: 'minimax', url: MINIMAX_AI_URL })
  const [Ai2, setAi2] = useState({ color: 'black', model: 'minimax', url: MINIMAX_AI_URL })
  const [player, setPlayer] = useState({ color: 'white' })
  const [gameMode, setGameMode] = useState<'ai_vs_ai' | 'human_vs_ai'>('ai_vs_ai')
  const [gameStarted, setGameStarted] = useState(false)

  return (
    <GameStateContext.Provider
      value={{
        game,
        setGame,
        aiTurn,
        setAiTurn,
        wTurn,
        setWTurn,
        outcome,
        setOutcome,
        Ai1,
        setAi1,
        Ai2,
        setAi2,
        player,
        setPlayer,
        gameMode,
        setGameMode,
        gameStarted,
        setGameStarted
      }}
    >
      {children}
    </GameStateContext.Provider>
  )
}

export const useGameState = () => useContext(GameStateContext)
