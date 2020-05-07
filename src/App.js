import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/Navbar.js";
import Users from "./components/Users.js";
import PacForm from "./components/PacForm.js";
import StatesConfig from "./components/StatesConfig.js";
import Odontogram from "./components/Odontograma.js";

class App extends Component {
  state = {
    mode: "Nuevo",
    pacientes: [],
    dataPaciente: { id: -1, nombre: "", apellido: "", dni: "" },
    currentState: { nombre: "", color: "", tipo: true }
  };

  addPacHandler = newPac => {
    let pacientes = this.state.pacientes;
    let index = pacientes.length > 0 ? pacientes[pacientes.length - 1].id : 0;
    newPac.id = index + 1;
    pacientes.push(newPac);
    this.setState({ pacientes: pacientes });
  };

  modeEdit = pac => {
    this.setState({ dataPaciente: pac });
    this.setState({ mode: "Editar" });
  };

  modeNew = () => {
    this.setState({ mode: "Nuevo" });
    this.setState({
      dataPaciente: { id: -1, nombre: "", apellido: "", dni: "" }
    });
  };

  saveEdit = pac => {
    if (pac) {
      let pacientes = this.state.pacientes;
      let index = pacientes.findIndex(x => x.id === pac.id);
      if (index !== -1) {
        pacientes[index] = pac;
        this.setState({ pacientes: pacientes });
      }
    }
    this.modeNew();
  };

  deletePacHandler = id => {
    let pacientes = this.state.pacientes.filter(p => {
      return p.id !== id;
    });
    this.setState({ pacientes: pacientes });
  };

  changeCurrentState = (state) => {
    this.setState({currentState: state});
  }

  render() {
    const {currentState} = this.state;
    return (
      <div>
        <Navbar />
        <div className="row">
          <div className="col-6 top-m left-m">
            <Users
              pacientes={this.state.pacientes}
              deleteHandler={this.deletePacHandler}
              toEdit={this.modeEdit}
            />
          </div>
          <div className="col-5 top-m ">
            <PacForm
              addHandler={this.addPacHandler}
              paciente={this.state.dataPaciente}
              mode={this.state.mode}
              saveEdit={this.saveEdit}
            />
          </div>
          <div
            className="row conteiner-fluid mt-4 ml-4"
            style={{
              border: "1px solid",
              borderRadius: "1%",
              borderColor: "#2471A3",
              padding: "7px",
              width: "95%"
            }}
          >
            <div style={{width: "22%", marginRight: "3%"}}>
              <StatesConfig cState={currentState} changeCurrentState={this.changeCurrentState}/>
            </div>
            <div style={{width: "71%"}}>
              <Odontogram currentState={currentState}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
