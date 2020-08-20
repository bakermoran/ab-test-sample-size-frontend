import React from 'react';
import './App.css';
import '../CalculatorContainer/CalculatorContainer'
import CalculatorContainer from '../CalculatorContainer/CalculatorContainer';
import Navbar from 'react-bootstrap/Navbar';


function App() {
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand >Bayesian AB Test Sample Size Calculator</Navbar.Brand>
      </Navbar>
      <CalculatorContainer />
    </div>
  );
}

export default App;
