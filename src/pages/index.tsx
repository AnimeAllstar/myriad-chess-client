import { useCallback, useEffect, useState } from 'react'
import { Chessboard } from 'react-chessboard'
import { Chess, PieceSymbol, Square } from 'chess.js'
import { cloneDeep } from 'lodash'
import { MINMAX_AI_URL } from '@myriad-chess/constants'
import { ApiResponse, Outcome, Reason, ReasonString, Winner } from '@myriad-chess/types/api'

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
  // outcome of the game
  const [outcome, setOutcome] = useState<Outcome | null>(null)

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
  const aiMove = useCallback(async () => {
    const response = await fetch(MINMAX_AI_URL, {
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
      makeAMove(move)
      setAiTurn(false)
    }
  }, [game, makeAMove])

  // make the AI move if it's the AI's turn and the game is not over (outcome is not null)
  useEffect(() => {
    if (!aiTurn || outcome) return
    aiMove().catch(console.error)
  }, [game, aiMove, aiTurn, outcome])

  // make the user's move when a piece is dropped
  const onDrop = (sourceSquare: Square, targetSquare: Square) => {
    return makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q' // always promote to a queen if move results in a pawn reaching the 8th rank
    })
  }

  return (
    <Chessboard
      position={game.fen()}
      onPieceDrop={onDrop}
      arePiecesDraggable={!game.isGameOver() && !aiTurn}
      boardWidth={720}
    />
  )
}

export default Home
