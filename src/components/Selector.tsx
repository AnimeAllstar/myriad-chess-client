import React, { useState } from 'react';
import { NavDropdown, Navbar } from 'react-bootstrap';

const Selector: React.FC = () => {

    const [Ai1, setAi1] = useState({ color: 'white', model: 'random' });
    const [Ai2, setAi2] = useState({ color: 'black', model: 'random' });

    return (
        <>
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
        </>
    );
};

export default Selector;
