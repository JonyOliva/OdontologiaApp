import React, { Component } from "react";
import "./Users.css";
import "./border-title.css";
import User from "./User.js";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    };
  }

  onChange = () => {
    let string = document.getElementById("search").value;
    this.setState({ search: string });
    console.log(string);
  };

  contains = p => {
    let str = this.state.search.toLowerCase();
    if (str.trim())
      return (
        p.nombre.toLowerCase().includes(str) ||
        p.apellido.toLowerCase().includes(str) ||
        p.dni.toLowerCase().includes(str)
      );
    else return false;
  };

  render() {
    const { pacientes } = this.props;
    return (
      <div>
        <h5 className="title">Pacientes</h5>
        <div className="table-wrapper-scroll-y my-custom-scrollbar b-border b-height">
          <div className="row">
          <p className="ml-3 mr-3 mt-1">Buscar: </p>
          <input
            onChange={this.onChange}
            id="search"
            type="text"
            value={this.state.search}
           style={{height: "35px"}}
          ></input>
          </div>
          <table className="table table-bordered table-striped mb-0">
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Apellido</th>
                <th scope="col">DNI</th>
                <th scope="col" className="">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {pacientes
                .filter(p => this.state.search==="" || this.contains(p))
                .map(pac => {
                  return (
                    <User
                      User={pac}
                      key={pac.id}
                      onDelete={this.props.deleteHandler}
                      toEdit={this.props.toEdit}
                    />
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Users;
