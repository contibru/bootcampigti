import React, { useState } from 'react';
import './App.css';
import { materializecss } from "materialize-css";
import { calculateSalaryFrom, getCurrencyFromNumber, getPercentage } from "./business/salary.js";

function App() {

  const [fullSalary, setFullSalary] = useState(0);
  const [baseInss, setBaseInss] = useState(0);
  const [descontoInss, setDescontoInss] = useState(0);
  const [baseIrpf, setBaseIrpf] = useState(0);
  const [descontoIrpf, setDescontoIrpf] = useState(0);
  const [salarioLiquido, setSalarioLiquido] = useState(0);

  const handleSalary = (event) => {
    setFullSalary(event.target.value)
    const calculatedSalary = calculateSalaryFrom(event.target.value)
    
    setBaseInss(calculatedSalary.baseINSS)
    setDescontoInss(calculatedSalary.discountINSS)
    setBaseIrpf(calculatedSalary.baseIRPF)
    setDescontoIrpf(calculatedSalary.discountIRPF)  
    setSalarioLiquido(calculatedSalary.netSalary)

  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="row">
          <div className="input-field col s12">
            <input onChange={handleSalary} placeholder="Salário bruto" id="salario-bruto" type="text" className="validate" />
            <label htmlFor="salario-bruto">Salário bruto</label>
          </div>
          <div className="input-field col s3">
            <input readOnly id="base-inss" value={`${getCurrencyFromNumber(baseInss)} (${getPercentage(fullSalary, baseInss)}%)`} type="text" className="validate" />
            <label htmlFor="base-inss">Base INSS</label>
          </div>
          <div className="input-field col s3">
            <input readOnly id="desconto-inss" value={`${getCurrencyFromNumber(descontoInss)} (${getPercentage(fullSalary, descontoInss)}%)`} type="text" className="validate" />
            <label htmlFor="desconto-inss">Desconto INSS</label>
          </div>
          <div className="input-field col s3">
            <input readOnly id="base-irpf" value={`${getCurrencyFromNumber(baseIrpf)} (${getPercentage(fullSalary, baseIrpf)}%)`} type="text" className="validate" />
            <label htmlFor="base-irpf">Base IRPF</label>
          </div>
          <div className="input-field col s3">
            <input readOnly id="desconto-irpf" value={`${getCurrencyFromNumber(descontoIrpf)} (${getPercentage(fullSalary, descontoIrpf)}%)`} type="text" className="validate" />
            <label htmlFor="desconto-irpf">Desconto IRPF</label>
          </div>
          <div className="input-field col s12">
            <input readOnly placeholder="Salário líquido" value={`${getCurrencyFromNumber(salarioLiquido)} (${getPercentage(fullSalary, salarioLiquido)}%)`} id="salario-liquido" type="text" className="validate" />
            <label htmlFor="salario-liquido">Salário líquido</label>
          </div>          
       </div>        
      </header>
    </div>
  );
}

export default App;
