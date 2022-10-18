import React, { useState } from 'react'
import './Hub.scss'
import { Container, Header, Content, Footer, Navbar, Nav } from 'rsuite';
import HomeIcon from '@rsuite/icons/legacy/Home';
import CogIcon from '@rsuite/icons/legacy/Cog';
import Parcs from '../Parcs';
import Voitures from '../Voitures';
import Offres from '../Offres';
import Logo from '../../assets/svg/logo.svg'
import Accueil from '../Accueil';

const Hub = () => {

  const [index, setIndex] = useState(0)
  
  return (
    <div className="show-fake-browser navbar-page">
      <Container>
        <Header>
          <Navbar appearance="inverse">
            <Navbar.Brand>
              <a style={{ color: '#fff' }}><Logo /></a>
            </Navbar.Brand>
            <Nav>
              <Nav.Item className='nav-item' active={index === 0} onClick={() => setIndex(0)} icon={<HomeIcon />}>Accueil</Nav.Item>
              <Nav.Item className='nav-item' active={index === 1} onClick={() => setIndex(1)} >Parcs</Nav.Item>
              <Nav.Item className='nav-item' active={index === 2} onClick={() => setIndex(2)} >Voitures</Nav.Item>
              <Nav.Item className='nav-item' active={index === 3} onClick={() => setIndex(3)} >Offres</Nav.Item>
              <Nav.Menu className='nav-item' active={index === 4 || index === 5} title="Management">
                <Nav.Item className='nav-item' active={index === 4} onClick={() => setIndex(4)} >Clients</Nav.Item>
                <Nav.Item className='nav-item' active={index === 5} onClick={() => setIndex(5)} >Collaborateurs</Nav.Item>
                {/* <Nav.Item>blabla</Nav.Item> */}
              </Nav.Menu>
            </Nav>
            <Nav pullRight>
              <Nav.Item className='nav-item' active={index === 6} onClick={() => setIndex(6)} icon={<CogIcon />}>Paramètres</Nav.Item>
            </Nav>
          </Navbar>
        </Header>
        <Content>
          <div className='content-div'>
            { index === 0 && <Accueil /> }
            { index === 1 && <Parcs /> }
            { index === 2 && <Voitures /> }
            { index === 3 && <Offres /> }
          </div>
        </Content>
        <Footer style={{height: "50px"}}></Footer>
      </Container>
    </div>
  )
}

export default Hub