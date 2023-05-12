import CustomTab from '@myriad-chess/components/CustomTab'
import { useGameState } from '@myriad-chess/components/GameStateProvider'
import { RANDOM_AI_URL } from '@myriad-chess/constants'
import { ApiResponse, Outcome, Reason, ReasonString, Winner } from '@myriad-chess/types/api'
import { Chess, PieceSymbol, Square } from 'chess.js'
import { cloneDeep } from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import { Chessboard } from 'react-chessboard'

// Move object with only the necessary properties for game.move()
interface ShortMove {
  from: Square
  to: Square
  promotion?: PieceSymbol
}

const Home = () => {
  // game state
  const [game, setGame] = useState(new Chess())
  // whether it's the AI's turn
  const [aiTurn, setAiTurn] = useState(false)
  // whether it's the white's turn
  const [wTurn, setWTurn] = useState(true)
  // outcome of the game
  const [outcome, setOutcome] = useState<Outcome | null>(null)
  // game mode and startState
  const { gameMode, setGameMode, gameStarted, Ai1, Ai2 } = useGameState()

  const printOutcome = (reason: Reason, winner: Winner) => {
    if (reason === Reason.CHECKMATE) {
      const winnerString = winner === null ? 'DRAW' : winner ? 'WHITE' : 'BLACK'
      console.log(`${winnerString} wins by checkmate`)
    } else {
      console.log(`DRAW by ${ReasonString[reason]}`)
    }
  }

  // make a move, if the move is illegal, return false
  // if the move is legal, update the game state, set aiTurn to true and return true
  const makeAMove = useCallback(
    (move: ShortMove | string) => {
      const gameCopy = cloneDeep(game)
      try {
        gameCopy.move(move)
        setGame(gameCopy)
        setAiTurn(true)
        console.log(aiTurn ? 'ai:' : 'player:', gameCopy.history({ verbose: true }).slice(-1)[0])
        return true
      } catch (error) {
        console.log(error)
        return false
      }
    },
    [aiTurn, game]
  )

  // make a random move from the list of possible moves
  // set aiTurn to false after the move is made
  const aiMove = useCallback(
    async (URL: string) => {
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fen: game.fen()
        })
      })
      const { fen, outcome, move }: ApiResponse = await response.json()
      if (outcome) {
        setOutcome(outcome)
        printOutcome(outcome.termination, outcome.winner)
        return
      } else if (move) {
        setWTurn(!wTurn)
        makeAMove(move)
        // continue moving if ai_vs_ai
        setAiTurn(false || gameMode === 'ai_vs_ai')
      }
    },
    [game, makeAMove]
  )

  // make the AI move if it's the AI's turn and the game is not over (outcome is not null)
  // continue moving if ai_vs_ai
  useEffect(() => {
    const URL =
      gameMode === 'human_vs_ai' || (wTurn && Ai2.color === 'white') || (!wTurn && Ai2.color === 'black')
        ? Ai2.url
        : Ai1.url

    if (!aiTurn || outcome) return

    if (URL === RANDOM_AI_URL) {
      const interval = setInterval(() => aiMove(URL), 200)
      return () => clearInterval(interval)
    } else if (gameMode === 'ai_vs_ai' || (gameMode === 'human_vs_ai' && aiTurn)) {
      aiMove(URL).catch(console.error)
    }
  }, [game, aiMove, aiTurn, outcome, gameMode, wTurn])

  // make the user's move when a piece is dropped
  const onDrop = (sourceSquare: Square, targetSquare: Square) => {
    return makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q' // always promote to a queen if move results in a pawn reaching the 8th rank
    })
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        maxHeight: '100vh',
        maxWidth: '99vw',
        padding: '8px'
      }}
    >
      <div style={{ pointerEvents: gameStarted ? 'auto' : 'none' }}>
        <Chessboard
          position={game.fen()}
          onPieceDrop={onDrop}
          arePiecesDraggable={!game.isGameOver() && !aiTurn}
          boardWidth={720}
        />
      </div>

      <div style={{ flexGrow: 1, marginLeft: '22px' }}>
        <CustomTab
          title1={'AI vs AI'}
          title2={'Human vs AI'}
          setTurn={setAiTurn}
          onClickTitle1={() => {
            setGameMode('ai_vs_ai')
          }}
          onClickTitle2={() => {
            setGameMode('human_vs_ai')
          }}
        />
      </div>
    </div>
  )
}

export default Home
