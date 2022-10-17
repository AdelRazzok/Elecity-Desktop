import React, { useContext, useState } from 'react'
import AuthContext from '../../context/AuthProvider'
import './Login.scss'
import {
  Container,
  Header,
  Content,
  Footer,
  Form,
  ButtonToolbar,
  Button,
  Navbar,
  Panel,
  FlexboxGrid
} from 'rsuite';

// @ts-ignore
const Login = () => {
  const { auth, setAuth } = useContext(AuthContext)
  const [credentials, setCredentials] = useState<any>({})

  // @ts-ignore
  const handleChange = (_, event) => {
    const { name, value } = event.target
    setCredentials((prev: any) => {
      return {
        ...prev,
        [name]: value,
      }
    })
  }

  const handleClick = async () => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials)
    }
    const res = await (await fetch('http://localhost:80/api/v1/users/login', options)).json()
    setAuth(res.accessToken)
  }

  return (
    <div className="show-fake-browser login-page">
      <Container className='Login-container'>
        <Header>
          <Navbar appearance="inverse">
            <Navbar.Brand>
              <a style={{ color: '#fff' }}>Brand</a>
            </Navbar.Brand>
          </Navbar>
        </Header>
        <Content>
          <FlexboxGrid justify="center">
            <FlexboxGrid.Item colspan={8}>
              <Panel header={<h3>Se connecter</h3>} bordered>
                <Form fluid>
                  <Form.Group>
                    <Form.ControlLabel>Adresse mail :</Form.ControlLabel>
                    <Form.Control name="mail" onChange={handleChange} />
                  </Form.Group>
                  <Form.Group>
                    <Form.ControlLabel>Mot de passe :</Form.ControlLabel>
                    <Form.Control name="password" type="password" onChange={handleChange} autoComplete="off" />
                  </Form.Group>
                  <Form.Group>
                    <ButtonToolbar>
                      <Button appearance="primary" onClick={handleClick}>Connexion</Button>
                      <Button appearance="link">Mot de passe oublié ?</Button>
                    </ButtonToolbar>
                  </Form.Group>
                </Form>
              </Panel>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Content>
        <Footer>Footer</Footer>
      </Container>
    </div>
  )
}

export default Login