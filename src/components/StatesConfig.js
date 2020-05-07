import React, { Component } from "react";
import Modal from "react-modal";
import "./border-title.css";
import "./estados.css";
import EstadoColor from "./EstadoColor.js";
import EstadoForma from "./EstadoForma.js";
import lineas from "../resources/lineas.png";
import cruz from "../resources/cruz.png";
import circulo from "../resources/circulo.png";

const defImg = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";

class StateConfig extends Component {
  state = {
    modalIsOpen: false,
    modalOpenby: false,
    colores: [
      { nombre: "Empaste", color: "blue"},
      { nombre: "Carie", color: "red" }
    ],
    formas: [{ nombre: "Extracción", forma: cruz }],
    coloresDisp: [
      "grey",
      "yellow",
      "green",
      "lightgreen",
      "lightblue",
      "orange"
    ],
    formasDisp: [lineas, circulo]
  };

  constructor(props) {
    super(props);
    this.subtitle = null;
    this.selectShape = null;
    this.selectColor = null;
  }

  addNewColor = () => {
    let color = this.selectColor.style.backgroundColor;
    let nombre = document.getElementById("nameColor").value.trim();
    let newEstado = { nombre: nombre, color: color };
    console.log(newEstado)
    if (
      color &&
      nombre &&
      this.state.colores.find(e => e.color === color && e.nombre === nombre) !==
        -1
    ) {
      let newcolores = this.state.colores;
      newcolores.push(newEstado);
      this.setState({ colores: newcolores });
      this.setState({
        coloresDisp: this.state.coloresDisp.filter(c => c !== color)
      });
      document.getElementById("nameColor").value = "";
      this.selectColor.style.backgroundColor = "";
    }
  };

  addNewShape = () => {
    let shape = this.selectShape.src;
    let nombre = document.getElementById("nameShape").value.trim();
    let newShape = { nombre: nombre, forma: shape };
    if (
      shape &&
      nombre &&
      this.state.formas.find(e => e.forma === shape && e.nombre === nombre) !==
        -1
    ) {
      let newFormas = this.state.formas;
      newFormas.push(newShape);
      this.setState({ formas: newFormas });
      this.setState({
        formasDisp: this.state.formasDisp.filter(c => c !== shape)
      });
      document.getElementById("nameShape").value = "";
      this.selectShape.src = defImg;
    }
  };

  toggleModalShape = img => {
    this.setState({ modalIsOpen: !this.state.modalIsOpen });
    this.selectShape.src = img;
  };

  toggleModalColor = color => {
    this.setState({ modalIsOpen: !this.state.modalIsOpen });
    this.selectColor.style.backgroundColor = color;
  };

  render() {
    const { nombre } = this.props.cState;
    const { openModalBy } = this.state;
    return (
      <React.Fragment>
        <fieldset className="b-border">
          <legend className="title mb-2 mt-2 titulo">Estados parciales</legend>
          <div className="ml-3">
            <div>
              {this.state.colores.map((e, i) => {
                return (
                  <EstadoColor
                    key={i}
                    data={{...e, tipo: true}}
                    isSelected={e.nombre === nombre}
                    changeCurrentState={this.props.changeCurrentState}
                  />
                );
              })}
            </div>
            <h6 className="title mb-2 mt-3 subtitulo">Agregar nuevo</h6>
            <div className="row">
              <input
                type="text"
                id="nameColor"
                placeholder="Nuevo..."
                style={{ padding: "2px 3px", left: "flex", width: "47%" }}
              />
              <button
                onClick={() => {
                  this.setState({ openModalBy: true });
                  this.setState({ modalIsOpen: !this.state.modalIsOpen });
                }}
                className="ml-1"
                style={{left: "flex"}}
              >
                <div
                  style={{ width: "24px", height: "24px"}}
                  ref={_color => (this.selectColor = _color)}
                ></div>
              </button>
              <button
                onClick={this.addNewColor}
                style={{left: "flex"}}
                className="btn btn-primary btn-sm ml-1 mr-1"
              >
                Agregar
              </button>
              
            </div>
          </div>
        </fieldset>
        <br />
        <fieldset className="b-border">
          <legend className="title mb-2 mt-2 titulo" >Estados totales</legend>
          <div className="ml-3">
            <div>
              {this.state.formas.map((e, i) => {
                return (
                  <EstadoForma
                    key={i}
                    data={{...e, tipo: false}}
                    isSelected={e.nombre === nombre}
                    changeCurrentState={this.props.changeCurrentState}
                  />
                );
              })}
            </div>
            <h6 className="title mb-2 mt-3 subtitulo" >Agregar nuevo</h6>
            <div className="row">
              <input
                type="text"
                id="nameShape"
                placeholder="Nuevo..."
                style={{ padding: "2px 3px", left: "flex", width: "47%" }}
              />
              <button
                onClick={() => {
                  this.setState({ openModalBy: false });
                  this.setState({ modalIsOpen: !this.state.modalIsOpen });
                }}
                style={{left: "flex"}}
                className="ml-1"
              >
                <img
                  style={{ width: "24px" }}
                  ref={_sShape => (this.selectShape = _sShape)}
                  alt=""
                ></img>
              </button>
              <button
              style={{left: "flex"}}
                onClick={this.addNewShape}
                className="btn btn-primary btn-sm ml-1 mr-1"
              >
                Agregar
              </button>
            </div>
          </div>
        </fieldset>
        <br />

        <div>
          <Modal
            ariaHideApp={false}
            isOpen={this.state.modalIsOpen}
            style={{
              content: {
                top: "50%",
                left: "50%",
                right: "auto",
                bottom: "auto",
                marginRight: "-50%",
                transform: "translate(-50%, -50%)"
              }
            }}
          >
            <div className="row">
              <h5
                className="title"
                ref={_subtitle => (this.subtitle = _subtitle)}
              >
                Seleccione {openModalBy ? "un color" : "una figura"}
              </h5>
            </div>
            {openModalBy
              ? this.state.coloresDisp.map((e, i) => {
                  return (
                    <button
                      onClick={() => {
                        this.toggleModalColor(e);
                      }}
                      key={i}
                      className="btn btn-outline-primary m-1"
                    >
                      <div
                        style={{
                          backgroundColor: e,
                          width: "45px",
                          height: "45px"
                        }}
                      ></div>
                    </button>
                  );
                })
              : this.state.formasDisp.map((e, i) => {
                  return (
                    <button
                      onClick={() => {
                        this.toggleModalShape(e);
                      }}
                      key={i}
                      className="btn btn-outline-primary m-1"
                    >
                      <img src={e} alt="shape" style={{ width: "45px" }}></img>
                    </button>
                  );
                })}
          </Modal>
        </div>
      </React.Fragment>
    );
  }
}

export default StateConfig;
