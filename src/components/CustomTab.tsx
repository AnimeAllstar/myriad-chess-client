import Selector from '@myriad-chess/components/Selector';
import React, { ReactNode } from 'react';
import { Button, Col, Nav, Row, Tab } from 'react-bootstrap';

interface CustomTabProps {
  title1?: string;
  title2?: string;
  content1?: ReactNode;
  content2?: ReactNode;
}

const CustomTab: React.FC<CustomTabProps> = ({ title1, title2, content1, content2 }) => {

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
              {content1 || (<Selector hasAI1={true} hasAI2={true}/>)}
            </Tab.Pane>
            <Tab.Pane eventKey="second" className="">
              {content2 || (<Selector hasAI1={false} hasAI2={true}/>)}
            </Tab.Pane>
          </Tab.Content>
        </Row>

        <Row>
          <Button variant="primary" onClick={()=>{alert('start')}}>
            PLAY
          </Button>
        </Row>
      </Col>
    </Tab.Container>
  );
};

export default CustomTab;
