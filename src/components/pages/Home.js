import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
var FA = require("react-fontawesome");

const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await Axios.get("http://localhost:3005/users");
    setUsers(result.data.reverse());
  };

  const deleteUser = async (id) => {
    await Axios.delete(`http://localhost:3005/users/${id}`);
    loadUsers();
  };

  return (
    <div className="container-sm mt-4 col-lg-6 userList">
      <div className="card">
        <div className="card-header">
          <ul className="nav nav-tabs card-header-tabs">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="true" to="/">
                <i className="fas fa-users"></i>&nbsp;User List
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/users/add">
                <i className="fas fa-user-plus"></i>&nbsp;Add User
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/logout">
                <i className="fas fa-sign-out-alt"></i>&nbsp;Logout
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <table className="table tabStart">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                {/* <th scope="col">Username</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th> */}
                <th scope="col">View</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{user.name}</td>
                  {/* <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td> */}
                  <td>
                    <Link
                      title="View user details"
                      className="btn btn-outline-secondary"
                      to={`/users/${user.id}`}
                    >
                      <FA name="eye" />
                    </Link>
                  </td>
                  <td>
                    <Link
                      title="Edit user details"
                      className="btn btn-outline-secondary"
                      to={`/users/edit/${user.id}`}
                    >
                      <FA name="edit" />
                    </Link>
                  </td>
                  <td>
                    <Link
                      title="Remove user"
                      to="/"
                      className="btn btn-outline-danger"
                      onClick={() => deleteUser(user.id)}
                    >
                      <FA name="trash" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
