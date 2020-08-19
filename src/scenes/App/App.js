import React from 'react';
import './App.css';
import '../CalculatorContainer/CalculatorContainer'
import CalculatorContainer from '../CalculatorContainer/CalculatorContainer';

function App() {
  return (
    <div className="App">
      <div className="App-header">Bayesian AB Test Sample Size Calculator</div>
      <CalculatorContainer />
    </div>
  );
}

export default App;
