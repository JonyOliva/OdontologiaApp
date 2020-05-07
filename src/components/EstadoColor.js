import React, { Component } from "react";

class EstadoColor extends Component {
  state = {};

  render() {
    const { nombre, color } = this.props.data;
    return (
      <button
        onClick={() => {
          this.props.changeCurrentState(this.props.data);
        }}
        className="row "
        style={{
          width: "60%",
          height: "30px",
          marginBottom: "5px",
          borderRadius: "1%",
          backgroundColor: (this.props.isSelected) ? "#0095c4" : ""
        }}
      >
        <div
          style={{
            width: "24px",
            height: "24px",
            borderRadius: "15%",
            backgroundColor: color
          }}
        />
        <p className="ml-2" style={{ fontSize: "16px" }}>
          {nombre}
        </p>
      </button>
    );
  }
}

export default EstadoColor;
