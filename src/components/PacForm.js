import React, { Component } from "react";
import "./border-title.css";
import "./PacForm.css";

class PacForm extends Component {
  state = {};

  getPacData() {
    let name = document.getElementById("name").value.trim();
    let lname = document.getElementById("lname").value.trim();
    let dni = document.getElementById("dni").value.trim();
    if (name && lname && dni) {
      return {
        id: this.props.paciente.id,
        nombre: name,
        apellido: lname,
        dni: dni
      };
    }
  }

  onAdd = () => {
    let newpac = this.getPacData();
    if (newpac) {
      this.props.addHandler(newpac);
    }
  };

  onSaveEdit = () => {
    let newp = this.getPacData();
    if (newp) {
      this.props.saveEdit(newp);
    }
  };

  componentDidUpdate() {
    const { nombre, apellido, dni } = this.props.paciente;
    document.getElementById("name").value = nombre;
    document.getElementById("lname").value = apellido;
    document.getElementById("dni").value = dni;
  }

  submitMode = () => {
    if (this.props.mode === "Nuevo") {
      return (
        <div className="text-center">
          <button onClick={this.onAdd} className="btn btn-primary btn-sm">
            Agregar
          </button>
        </div>
      );
    } else {
      return (
        <div className="text-center">
          <button onClick={this.onSaveEdit} className="btn btn-primary btn-sm">
            Guardar
          </button>
          <button
            onClick={() => {
              this.props.saveEdit(null);
            }}
            className="btn btn-danger btn-sm ml-2"
          >
            Cancelar
          </button>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <h5 className="title"> {this.props.mode} Paciente</h5>
        <div className="b-border b-height">
          <div>
            <div>
              <div>
                <label className="form-label">Nombre</label>
                <input type="text" id="name" className="form-input"></input>
              </div>
              <div>
                <label className="form-label">Apellido</label>
                <input type="text" id="lname" className="form-input"></input>
              </div>
              <div>
                <label className="form-label">DNI</label>
                <input type="number" id="dni" className="form-input"></input>
              </div>
              {this.submitMode()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PacForm;
