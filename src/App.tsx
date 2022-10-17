import React, { useContext } from "react"
import "rsuite/dist/rsuite.min.css"
import CustomProvider from "rsuite/esm/CustomProvider/CustomProvider"
import AuthContext from "./context/AuthProvider"
import './App.scss'
import Login from './components/Login'
import Hub from "./components/Hub"

const App = () => {
  const { auth } = useContext(AuthContext)
  
  return (
    <CustomProvider theme="dark">
      {auth ?
        <Hub />
      :
        <Login />}
    </CustomProvider>
  );
}
export default App