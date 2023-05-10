import React, { ReactNode, useState } from 'react';
import { Col, Nav, NavDropdown, Navbar, Row, Tab } from 'react-bootstrap';

interface CustomTabProps {
  title1?: string;
  title2?: string;
  content1?: ReactNode;
  content2?: ReactNode;
}

const CustomTab: React.FC<CustomTabProps> = ({ title1, title2, content1, content2 }) => {

  const [Ai1, setAi1] = useState({ color: 'white', model: 'random' });
  const [Ai2, setAi2] = useState({ color: 'black', model: 'random' });

  return (
    <Tab.Container id="left-right-tab" defaultActiveKey="first">
      <Col>
        <Row>
          <Nav variant="pills" fill justify className="m-2">
            <Nav.Item
              style={{
                border: 'solid',
                borderTopLeftRadius: '0.375rem',
                borderBottomLeftRadius: '0.375rem',
                borderRight: 'none',
              }}
            >
              <Nav.Link eventKey="first">{title1}</Nav.Link>
            </Nav.Item>
            <Nav.Item
              style={{
                border: 'solid',
                borderTopRightRadius: '0.375rem',
                borderBottomRightRadius: '0.375rem',
                borderLeft: 'none',
              }}
            >
              <Nav.Link eventKey="second">{title2}</Nav.Link>
            </Nav.Item>
          </Nav>
        </Row>
        <Row>
          <Tab.Content>
            <Tab.Pane eventKey="first" className="">
              {content1 || (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '1rem',
                    padding: '1rem',
                  }}
                >
                  <Navbar.Text>
                    AI 1 - color: <b>{Ai1.color}</b> model: <b>{Ai1.model}</b>
                  </Navbar.Text>
                  <Navbar.Text style={{ marginBottom: '3rem' }}>
                    AI 2 - color: <b>{Ai2.color}</b> model: <b>{Ai2.model}</b>
                  </Navbar.Text>

                  <NavDropdown style={{
                    marginBottom: '6rem',
                  }} title="AI 1 COLOR" id="nav-left-color-dropdown1">

                    <NavDropdown.Item eventKey="color-w1"
                      onClick={() => {
                        setAi1({ ...Ai1, color: 'white' });
                        setAi2({ ...Ai2, color: 'black' });
                      }}
                    >
                      white
                    </NavDropdown.Item>
                    <NavDropdown.Item eventKey="color-b1"
                      onClick={() => {
                        setAi1({ ...Ai1, color: 'black' });
                        setAi2({ ...Ai2, color: 'white' });
                      }}
                    >
                      black
                    </NavDropdown.Item>
                  </NavDropdown>

                  <NavDropdown style={{
                    marginBottom: '6rem',
                  }} title="AI 1 MODEL" id="nav-left-model-dropdown1">
                    <NavDropdown.Item eventKey="model-rand1"
                      onClick={() => {
                        setAi1({ ...Ai1, model: 'random' });
                      }}
                    >
                      random
                    </NavDropdown.Item>
                  </NavDropdown>

                  <NavDropdown style={{
                    marginBottom: '6rem',
                  }} title="AI 2 COLOR" id="nav-left-color-dropdown2">

                    <NavDropdown.Item eventKey="color-w2"
                      onClick={() => {
                        setAi2({ ...Ai2, color: 'white' });
                        setAi1({ ...Ai1, color: 'black' });
                      }}
                    >
                      white
                    </NavDropdown.Item>
                    <NavDropdown.Item eventKey="color-b2"
                      onClick={() => {
                        setAi2({ ...Ai2, color: 'black' });
                        setAi1({ ...Ai1, color: 'white' });
                      }}
                    >
                      black
                    </NavDropdown.Item>
                  </NavDropdown>

                  <NavDropdown style={{
                    marginBottom: '6rem',
                  }} title="AI 1 MODEL" id="nav-left-model-dropdown2">
                    <NavDropdown.Item eventKey="model-rand2"
                      onClick={() => {
                        setAi2({ ...Ai2, model: 'random' });
                      }}
                    >
                      random
                    </NavDropdown.Item>
                  </NavDropdown>
                </div>
              )}
            </Tab.Pane>
            <Tab.Pane eventKey="second" className="">
              {content2}
            </Tab.Pane>
          </Tab.Content>
        </Row>
      </Col>
    </Tab.Container>
  );
};

export default CustomTab;
