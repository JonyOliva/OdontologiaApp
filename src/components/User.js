import React, { Component } from 'react';
import './User.css';
import editLogo from "../resources/edit.png";
import delLogo from "../resources/delete.png";
import viewLogo from "../resources/view.png";

class User extends Component {
    state = {  }

    render() { 
      const {User} = this.props;
      return ( 
          <tr>
            <td>{User.nombre}</td>
            <td>{User.apellido}</td>
            <td>{User.dni}</td>
            <td>
              <img className="imgLogo mr-3" src={editLogo} alt="edit" onClick={() => {this.props.toEdit(User)}} />
              <img className="imgLogo mr-3" src={delLogo} alt="del" onClick={() => {this.props.onDelete(User.id)}} />
              <img className="imgLogo" src={viewLogo} alt="view" />
            </td>
          </tr>
        );
    }
}
 
export default User;