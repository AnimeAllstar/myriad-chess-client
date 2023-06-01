import { useGameState } from '@myriad-chess/components/GameStateProvider'
import Selector from '@myriad-chess/components/Selector'
import React, { Dispatch, ReactNode, SetStateAction } from 'react'
import { Button, Col, Nav, Row, Tab } from 'react-bootstrap'

interface PreGameDisplayProps {
  title1?: string
  title2?: string
  content1?: ReactNode
  content2?: ReactNode
  setTurn?: Dispatch<SetStateAction<boolean>>
  onClickTitle1?: () => void
  onClickTitle2?: () => void
}

const PreGameDisplay: React.FC<PreGameDisplayProps> = ({
  title1,
  title2,
  content1,
  content2,
  setTurn,
  onClickTitle1,
  onClickTitle2
}) => {
  const { Ai2, gameMode, gameStarted, setGameStarted } = useGameState()

  return (
    <Tab.Container id='left-right-tab' defaultActiveKey='first'>
      <Col>
        <Row>
          <Nav
            variant='pills'
            fill
            justify
            className='m-2'
            onSelect={(eventKey) => {
              eventKey === 'first' ? onClickTitle1?.() : onClickTitle2?.()
            }}
          >
            <Nav.Item
              style={{
                border: 'solid',
                borderTopLeftRadius: '0.375rem',
                borderBottomLeftRadius: '0.375rem',
                borderRight: 'none'
              }}
            >
              <Nav.Link eventKey='first' disabled={gameStarted}>
                {title1}
              </Nav.Link>
            </Nav.Item>
            <Nav.Item
              style={{
                border: 'solid',
                borderTopRightRadius: '0.375rem',
                borderBottomRightRadius: '0.375rem',
                borderLeft: 'none'
              }}
            >
              <Nav.Link eventKey='second' disabled={gameStarted}>
                {title2}
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Row>

        <Row>
          <Tab.Content>
            <Tab.Pane eventKey='first' className=''>
              {content1 || <Selector hasAI1={true} hasAI2={true} />}
            </Tab.Pane>
            <Tab.Pane eventKey='second' className=''>
              {content2 || <Selector hasAI1={false} hasAI2={true} />}
            </Tab.Pane>
          </Tab.Content>
        </Row>

        <Row>
          <Button
            variant='primary'
            onClick={() => {
              if (gameMode === 'ai_vs_ai' || (gameMode === 'human_vs_ai' && Ai2.color == 'white')) {
                setTurn!(true)
              }
              setGameStarted(true)
            }}
            disabled={gameStarted}
          >
            PLAY
          </Button>
        </Row>
      </Col>
    </Tab.Container>
  )
}

export default PreGameDisplay
