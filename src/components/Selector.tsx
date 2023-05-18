import { useGameState } from '@myriad-chess/components/GameStateProvider'
import React from 'react'
import { NavDropdown, Navbar } from 'react-bootstrap'
import { MINIMAX_AI_URL, RANDOM_AI_URL } from '@myriad-chess/constants'

interface SelectorProps {
  hasAI1?: boolean
  hasAI2?: boolean
}

const Selector: React.FC<SelectorProps> = ({ hasAI1, hasAI2 }) => {
  const { Ai1, setAi1, Ai2, setAi2, player, setPlayer } = useGameState()

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '1rem',
        padding: '1rem'
      }}
    >
      {hasAI1 && (
        <Navbar.Text>
          AI 1 - color: <b>{Ai1.color}</b> model: <b>{Ai1.model}</b>
        </Navbar.Text>
      )}

      {!hasAI1 && (
        <Navbar.Text>
          Your color: <b>{player.color}</b>
        </Navbar.Text>
      )}

      {hasAI2 && (
        <Navbar.Text style={{ marginBottom: '3rem' }}>
          AI 2 - color: <b>{Ai2.color}</b> model: <b>{Ai2.model}</b>
        </Navbar.Text>
      )}

      {hasAI1 && (
        <>
          <NavDropdown
            style={{
              marginBottom: '6rem'
            }}
            title='AI 1 COLOR'
            id='nav-left-color-dropdown1'
          >
            <NavDropdown.Item
              eventKey='color-w1'
              onClick={() => {
                setAi1({ ...Ai1, color: 'white' })
                setAi2({ ...Ai2, color: 'black' })
              }}
            >
              white
            </NavDropdown.Item>
            <NavDropdown.Item
              eventKey='color-b1'
              onClick={() => {
                setAi1({ ...Ai1, color: 'black' })
                setAi2({ ...Ai2, color: 'white' })
              }}
            >
              black
            </NavDropdown.Item>
          </NavDropdown>

          <NavDropdown
            style={{
              marginBottom: '6rem'
            }}
            title='AI 1 MODEL'
            id='nav-left-model-dropdown1'
          >
            <NavDropdown.Item
              eventKey='model-mini1'
              onClick={() => {
                setAi1({ ...Ai1, model: 'minimax', url: MINIMAX_AI_URL })
              }}
            >
              minimax
            </NavDropdown.Item>
            <NavDropdown.Item
              eventKey='model-rand1'
              onClick={() => {
                setAi1({ ...Ai1, model: 'random', url: RANDOM_AI_URL })
              }}
            >
              random
            </NavDropdown.Item>
          </NavDropdown>
        </>
      )}

      {!hasAI1 && (
        <>
          <NavDropdown
            style={{
              marginBottom: '6rem'
            }}
            title='YOUR COLOR'
            id='nav-left-color-dropdown-player'
          >
            <NavDropdown.Item
              eventKey='color-w-player'
              onClick={() => {
                setPlayer({ color: 'white' })
                setAi2({ ...Ai2, color: 'black' })
              }}
            >
              white
            </NavDropdown.Item>
            <NavDropdown.Item
              eventKey='color-b-player'
              onClick={() => {
                setPlayer({ color: 'black' })
                setAi2({ ...Ai2, color: 'white' })
              }}
            >
              black
            </NavDropdown.Item>
          </NavDropdown>
        </>
      )}

      {hasAI2 && (
        <>
          <NavDropdown
            style={{
              marginBottom: '6rem'
            }}
            title='AI 2 COLOR'
            id='nav-left-color-dropdown2'
          >
            <NavDropdown.Item
              eventKey='color-w2'
              onClick={() => {
                setAi2({ ...Ai2, color: 'white' })
                setPlayer({ color: 'black' })
                setAi1({ ...Ai1, color: 'black' })
              }}
            >
              white
            </NavDropdown.Item>
            <NavDropdown.Item
              eventKey='color-b2'
              onClick={() => {
                setAi2({ ...Ai2, color: 'black' })
                setPlayer({ color: 'white' })
                setAi1({ ...Ai1, color: 'white' })
              }}
            >
              black
            </NavDropdown.Item>
          </NavDropdown>

          <NavDropdown
            style={{
              marginBottom: '6rem'
            }}
            title='AI 2 MODEL'
            id='nav-left-model-dropdown2'
          >
            <NavDropdown.Item
              eventKey='model-mini2'
              onClick={() => {
                setAi2({ ...Ai2, model: 'minimax', url: MINIMAX_AI_URL })
              }}
            >
              minimax
            </NavDropdown.Item>
            <NavDropdown.Item
              eventKey='model-rand2'
              onClick={() => {
                setAi2({ ...Ai2, model: 'random', url: RANDOM_AI_URL })
              }}
            >
              random
            </NavDropdown.Item>
          </NavDropdown>
        </>
      )}
    </div>
  )
}

export default Selector
