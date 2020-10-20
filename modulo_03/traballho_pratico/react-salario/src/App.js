import React from 'react';
import './App.css';
import { materializecss } from "materialize-css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="row">
          <div className="input-field col s12">
            <input placeholder="Salário bruto" id="salario-bruto" type="text" className="validate" />
            <label for="salario-bruto">Salário bruto</label>
          </div>
          <div className="input-field col s3">
            <input disabled id="base-inss" type="text" className="validate" />
            <label for="base-inss">Base INSS</label>
          </div>
          <div className="input-field col s3">
            <input disabled id="desconto-inss" type="text" className="validate" />
            <label for="desconto-inss">Desconto INSS</label>
          </div>
          <div className="input-field col s3">
            <input  disabled id="base-irpf" type="text" className="validate" />
            <label for="base-irpf">Base IRPF</label>
          </div>
          <div className="input-field col s3">
            <input disabled id="desconto-irpf" type="text" className="validate" />
            <label for="desconto-irpf">Desconto IRPF</label>
          </div>
       </div>        
      </header>
    </div>
  );
}

export default App;
