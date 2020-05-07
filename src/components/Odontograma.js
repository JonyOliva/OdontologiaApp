import React, { Component } from "react";
import { Stage, Layer } from 'react-konva';
import ImageComponent from './Image.js';
import manImg from '../resources/mandibular.png';
import maxImg from '../resources/maxilar.png';
import Diente from './Diente.js';

const distEntreDientes = 52; //min 45 (OFFSET*3)
const OFFSETX = 4;
const yMaxilar = 160;
const yMandibular = 290;
const names = [18, 17, 16, 15, 14, 13, 12, 11,
              21, 22, 23, 24, 25, 26, 27, 28,
              48, 47, 46, 45, 44, 43, 42, 41,
              31, 32, 33, 34, 35, 36, 37, 38]

const odontogram = names.map((e) => {
  return {
    id: e,
    left: "",
    up: "",
    right: "",
    center: "",
    down: ""
  }});

class Odontograma extends Component {
  state = {
    dientes: odontogram
  };

  changeState = (id, namePart) => {
    const {currentState} = this.props;
    let index = this.state.dientes.findIndex( d => d.id === id);
    let dientes = this.state.dientes;
    if(currentState.tipo){
      if(dientes[index].total){
        dientes[index] = {
          id: id,
          left: "",
          up: "",
          right: "",
          center: "",
          down: ""
        }
      }
      switch(namePart){
        case "l":
          dientes[index].left = currentState.color;
          break;
        case "r":
          dientes[index].right = currentState.color;
          break;
        case "u":
          dientes[index].up = currentState.color;
          break;
        case "d":
          dientes[index].down = currentState.color;
          break;
        case "c":
          dientes[index].center = currentState.color;
          break;
        default:
          console.log("ups");
      }
    }else{
      dientes[index]= {
        id: id,
        total: currentState.forma
      }
    }
    this.setState({dientes: dientes})
  }

  render() {
    const {dientes} = this.state;
    return (
      <Stage width={860} height={480} style={{ border: "1px solid"}}>
        <Layer>
          <ImageComponent x={-1} y={40} src={maxImg} />
          {names.map((e, index) => {
            if(index < 8 )
              return <Diente key={e} changeState={this.changeState} pos={{x: distEntreDientes * index + OFFSETX, y: yMaxilar}} data={dientes[index]}/>
            else if(index < 16)
              return <Diente key={e} changeState={this.changeState} pos={{x: distEntreDientes * index + OFFSETX + distEntreDientes / 2, y: yMaxilar}} data={dientes[index]}/>
            else if(index < 24)
              return <Diente key={e} changeState={this.changeState} pos={{x: distEntreDientes * (index-16) + OFFSETX, y: yMandibular}} data={dientes[index]}/>
            else
              return <Diente key={e} changeState={this.changeState} pos={{x: distEntreDientes * (index-16) + OFFSETX + distEntreDientes / 2, y: yMandibular}} data={dientes[index]}/>

          })}
          <ImageComponent x={-1} y={360} src={manImg} />
        </Layer>
      </Stage>
    
    );
  }
}

export default Odontograma;
