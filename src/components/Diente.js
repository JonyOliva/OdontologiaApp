import React, { Component } from "react";
import { Group, Rect } from "react-konva";
import ImageComponent from "./Image.js";

const OFFSET = 15;
const TAM = 16;

class Diente extends Component {
  state = {
    left: "",
    up: "",
    right: "",
    center: "",
    down: ""
  };

  onClick = e => {
    this.props.changeState(this.props.data.id, e.target.attrs.id);
    this.setState( this.props.data );
    if(this.props.data.total)
    this.undefineState();
  };

  undefineState(){
    this.setState({left: undefined, center: undefined, down: undefined, right: undefined, up: undefined});
  }

  getImg(){
    const { x, y } = this.props.pos;
    if(this.props.data.total && !this.props.data.left){
      return <ImageComponent x={x} y={y} src={this.props.data.total} />
    }
  }

  render() {
    const { x, y } = this.props.pos;
    const { left, right, up, down, center } = this.state;
    return (
      <Group>
        {this.getImg()}
        <Rect
          x={x - 1}
          y={y + OFFSET}
          width={TAM}
          height={TAM}
          stroke="black"
          fill={left}
          strokeWidth={1}
          onClick={this.onClick}
          id="l"
        />
        <Rect
          x={x + OFFSET}
          y={y - 1}
          width={TAM}
          height={TAM}
          stroke="black"
          fill={up}
          strokeWidth={1}
          onClick={this.onClick}
          id="u"
        />
        <Rect
          x={x + OFFSET * 2 + 1}
          y={y + OFFSET}
          width={TAM}
          height={TAM}
          stroke="black"
          fill={right}
          strokeWidth={1}
          onClick={this.onClick}
          id="r"
        />
        <Rect
          x={x + OFFSET}
          y={y + OFFSET * 2 + 1}
          width={TAM}
          height={TAM}
          stroke="black"
          fill={down}
          strokeWidth={1}
          onClick={this.onClick}
          id="d"
        />
        <Rect
          x={x + OFFSET}
          y={y + OFFSET}
          width={TAM}
          height={TAM}
          stroke="black"
          fill={center}
          strokeWidth={1}
          onClick={this.onClick}
          id="c"
        />
      </Group>
    );
  }
}

export default Diente;
