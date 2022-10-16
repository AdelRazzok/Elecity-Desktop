import React from "react";
import "rsuite/dist/rsuite.min.css"
import CustomProvider from "rsuite/esm/CustomProvider/CustomProvider";
import './App.scss'
import Login from './components/Login';

const App = () => {
  return (
    <CustomProvider theme="dark">
      <Login />
    </CustomProvider>
  );
}
export default App