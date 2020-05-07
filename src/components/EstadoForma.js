import React, { Component } from "react";

class EstadoForma extends Component {
  state = {};

  render() {
    const { nombre, forma } = this.props.data;
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
        <img
          src={forma}
          alt={"forma"}
          style={{
            width: "24px",
            height: "24px",
            borderRadius: "15%"
          }}
        />
        <p className="ml-2" style={{ fontSize: "16px" }}>
          {nombre}
        </p>
      </button>
    );
  }
}

export default EstadoForma;
