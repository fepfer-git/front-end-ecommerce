import React, { useContext, useState } from "react";
import LoginImg from "../assets/images/Login-Img.jpg";
import "../styles/Login.css";
import { login } from "../services/UserService";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { LoginContext } from "../components/Layout";

function Login() {
  const history = useHistory();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const { checkLogin, setCheckLogin } = useContext(LoginContext);

  const loginHandeler = (event) => {
    event.preventDefault();
    login(user.username, user.password)
      .then((result) => {
        if ("USER" === result.user_role) {
          setCheckLogin({
            userName: result.user_name,
            userRole: result.user_role,
            expiration: result.expiration,
          });
          history.push("/");
          toast.success("Welcome " + result?.user_name);
        } else {
          setCheckLogin({
            userName: result.user_name,
            userRole: result.user_role,
            expiration: result.expiration,
          });
          history.push("/admin");
          toast.success("Welcome Admin: " + result?.user_name);
        }
      })
      .catch((err) => {
        toast.error("Wrong username or password!");
        setError("Wrong username or password!");
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
        <h1>
          {" "}
          Login / <Link to={`/register`}>Register now!</Link>{" "}
        </h1>

        <form id="contact-form" onSubmit={(event) => loginHandeler(event)}>
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
          />
          <p style={{ color: "red" }}>{error}</p>
          <button type="submit"> Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
