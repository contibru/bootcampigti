import React, { Component } from 'react';

import { CalculateInterest } from "./../../jurosCompostos";

export default class ProjetoBase extends Component {
  render() {


    console.log(CalculateInterest(15000, 2.9, 36))
    
    


    return (
      <div className="padding default-flex-row">
        <span className="small material-icons">check</span>
        <span>
          Projeto que serve de base para todos os demais projetos feitos com
          React desta disciplina.
        </span>
      </div>
    );
  }
}
