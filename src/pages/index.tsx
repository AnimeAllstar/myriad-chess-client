import { useCallback, useEffect, useState } from 'react'
import { Chessboard } from 'react-chessboard'
import { Chess, PieceSymbol, Square } from 'chess.js'
import { cloneDeep } from 'lodash'

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

  // make a move, if the move is illegal, return false
  // if the move is legal, update the game state, set aiTurn to true and return true
  const makeAMove = useCallback(
    (move: ShortMove) => {
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
  const aiMove = useCallback(() => {
    const possibleMoves = game.moves({ verbose: true })
    const randomIndex = Math.floor(Math.random() * possibleMoves.length)
    makeAMove(possibleMoves[randomIndex])
    setAiTurn(false)
  }, [game, makeAMove])

  // make the AI move if it's the AI's turn and the game is not over
  useEffect(() => {
    if (!aiTurn) return
    if (game.isGameOver()) {
      if (game.isCheckmate()) {
        const winner = game.turn() === 'w' ? 'Black' : 'White'
        console.log(`Checkmate! ${winner} wins!`)
      } else if (game.isDraw()) {
        console.log('Draw!')
      } else {
        console.log('Stalemate / 3-fold repetition!')
      }
      return
    }
    const interval = setInterval(() => aiMove(), 200)
    return () => clearInterval(interval)
  }, [game, aiMove, aiTurn])

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
