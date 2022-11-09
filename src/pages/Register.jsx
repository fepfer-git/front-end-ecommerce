import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import LoginImg from "../assets/images/register-pic.jpg";
import { register } from "../services/UserService";

const Register = () => {
  const history = useHistory();
  const [user, setUser] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const registerHandeler = (event) => {
    event.preventDefault();
    register(
      user.username,
      user.fullName,
      user.password,
      user.confirmPassword,
      user.email
    )
      .then((result) => {
        if (result) {
          history.push("/");
          toast.success("Register successfully!");
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        console.log(err);
      });
    console.log(user);
  };

  return (
    <div className="contact">
      <div
        className="leftSide"
        style={{ backgroundImage: `url(${LoginImg})` }}
      ></div>
      <div className="rightSide">
        <h1> Register</h1>

        <form id="contact-form" onSubmit={(event) => registerHandeler(event)}>
          <label htmlFor="name">User Name</label>
          <input
            required
            onChange={(event) => {
              setUser({
                ...user,
                [event.target.name]: event.target.value,
              });
            }}
            name="username"
            placeholder="Enter your user name..."
            type="text"
            maxlength="15"
            minLength="3"
          />
          <label htmlFor="Password">Full name</label>
          <input
            required
            onChange={(event) => {
              setUser({
                ...user,
                [event.target.name]: event.target.value,
              });
            }}
            name="fullName"
            placeholder="Enter your name..."
            type="text"
            maxlength="35"
            minLength="3"
          />
          <label htmlFor="Password">Email</label>
          <input
            required
            onChange={(event) => {
              setUser({
                ...user,
                [event.target.name]: event.target.value,
              });
            }}
            name="email"
            placeholder="Enter your email.. ."
            type="email"
          />
          <label htmlFor="Password">Password</label>
          <input
            required
            onChange={(event) => {
              setUser({ ...user, [event.target.name]: event.target.value });
            }}
            name="password"
            placeholder="Enter your password..."
            type="password"
            maxlength="20"
            minLength="6"
          />
          <label htmlFor="Password">Confirm password</label>
          <input
            required
            onChange={(event) => {
              setUser({ ...user, [event.target.name]: event.target.value });
            }}
            name="confirmPassword"
            placeholder="Enter your password again..."
            type="password"
            maxlength="20"
            minLength="6"
          />
          {/* <p style={{ color: "red" }}>{error}</p> */}
          <button type="submit"> Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
