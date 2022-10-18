import React from 'react'
import './Accueil.scss'

import { Button, ButtonGroup, Col, Grid, Panel, PanelGroup, Placeholder, Row, Stack, Table } from 'rsuite';

const { HeaderCell, Cell, Column } = Table;

const createRowData = (rowIndex: any) => {
  const randomKey = Math.floor(Math.random() * 9)
  const names = ['Hal', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert', 'Hazel'];
  const citys = [
    'Beijing',
    'Shanghai',
    'New Amieshire',
    'New Gust',
    'Lefflerstad',
    'East Catalina',
    'Ritchieborough',
    'Gilberthaven',
    'Eulaliabury'
  ];
  const emails = [
    'yahoo.com',
    'gmail.com',
    'hotmail.com',
    'outlook.com',
    'aol.com',
    'live.com',
    'msn.com',
    'yandex.com',
    'mail.ru'
  ]

  return {
    id: rowIndex + 1,
    name: names[randomKey],
    city: citys[randomKey],
    email: names[randomKey].toLocaleLowerCase() + '@' + emails[randomKey]
  }
}

const data = Array.from({ length: 20 }).map((_, index) => createRowData(index))

const Accueil = () => (
  <div className='Accueil'>
    <Grid fluid>
      <Row className="show-grid" gutter={50}>
        <Col xs={12}>
          <Panel
            bordered
            header={
              <Stack justifyContent="space-between">
                <span>Report Title</span>
                <ButtonGroup>
                  <Button active>Day</Button>
                  <Button>Week</Button>
                  <Button>Month</Button>
                </ButtonGroup>
              </Stack>
            }
          >
            <Placeholder.Paragraph rows={5} graph="image" />
          </Panel>
        </Col>
        <Col xs={12}>
          <Panel
            bordered
            header={
              <Stack justifyContent="space-between">
                <span>Report Title</span>
                <ButtonGroup>
                  <Button active>Day</Button>
                  <Button>Week</Button>
                  <Button>Month</Button>
                </ButtonGroup>
              </Stack>
            }
          >
            <Placeholder.Paragraph rows={5} graph="image" />
          </Panel>
        </Col>
      </Row>
      <br />
      <br />
      <Row className="show-grid">
        <Col xs={24}>
          <PanelGroup accordion bordered>
            <Panel header="Panel 1" defaultExpanded>
              <Placeholder.Paragraph />
            </Panel>
            <Panel header="Panel 2">
              <Placeholder.Paragraph />
            </Panel>
            <Panel header="Panel 3">
              <Placeholder.Paragraph />
            </Panel>
          </PanelGroup>
        </Col>
      </Row>
      <br />
      <br />
      <Row className="show-grid">
        <Col xs={24}>
          <Panel header="User List" bordered bodyFill>
            <Table height={400} data={data}>
              <Column flexGrow={1} align="center" fixed>
                <HeaderCell>Id</HeaderCell>
                <Cell dataKey="id" />
              </Column>

              <Column flexGrow={1} fixed>
                <HeaderCell>Name</HeaderCell>
                <Cell dataKey="name" />
              </Column>

              <Column flexGrow={1}>
                <HeaderCell>City</HeaderCell>
                <Cell dataKey="city" />
              </Column>

              <Column flexGrow={1}>
                <HeaderCell>Email</HeaderCell>
                <Cell dataKey="email" />
              </Column>
            </Table>
          </Panel>
        </Col>
      </Row>
    </Grid>
  </div>
);


export default Accueil