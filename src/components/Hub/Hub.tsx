import React from 'react'
import './Hub.scss'
import { Container, Header, Content, Footer, Navbar, Nav } from 'rsuite';
import HomeIcon from '@rsuite/icons/legacy/Home';
import CogIcon from '@rsuite/icons/legacy/Cog';

const Hub = () => {
  return (
    <div className="show-fake-browser navbar-page">
    <Container>
      <Header>
        <Navbar appearance="inverse">
          <Navbar.Brand>
            <a style={{ color: '#fff' }}>Elecity</a>
          </Navbar.Brand>
          <Nav>
            <Nav.Item icon={<HomeIcon />}>Accueil</Nav.Item>
            <Nav.Item>Parcs</Nav.Item>
            <Nav.Item>Voitures</Nav.Item>
            <Nav.Item>Offres</Nav.Item>
            <Nav.Menu title="Management">
              <Nav.Item>Clients</Nav.Item>
              <Nav.Item>Collaborateurs</Nav.Item>
              {/* <Nav.Item>blabla</Nav.Item> */}
            </Nav.Menu>
          </Nav>
          <Nav pullRight>
            <Nav.Item icon={<CogIcon />}>Settings</Nav.Item>
          </Nav>
        </Navbar>
      </Header>
      <Content>Content</Content>
      <Footer>Footer</Footer>
    </Container>
  </div>
  )
}

export default Hub