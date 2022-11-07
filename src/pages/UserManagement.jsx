import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllUsers } from "../services/UserService";
import "../styles/Table.css";

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers()
      .then((result) => {
        setUsers(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>User Management</h1>
      <br />
      <h2>
        <Link to="/admin">Manage Product</Link> |
        <Link to="/size">Manage size</Link>|{" "}
        <Link to="/category">Manage categoy</Link> | Manage user
      </h2>
      <table style={{ marginTop: "20px" }} id="customers">
        <tr>
          <th>User Id</th>
          <th>User full Name</th>
          <th>Email</th>
          <th></th>
        </tr>
        {users.map((user, index) => (
          <tr>
            <td>{user?.userId}</td>
            <td>{user?.fullName}</td>
            <td>{user?.email}</td>
            <td>
              <p></p>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default UserManagement;
