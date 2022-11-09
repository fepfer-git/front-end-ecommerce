import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { getUserByUsername, updateAUser } from "../services/UserService";

const UserPage = () => {
  const [user, setUser] = useState({});
  const [updatedUser, setUpdatedUser] = useState({});
  const [reload, setReload] = useState(0);

  useEffect(() => {
    fetchUser();
  }, [reload]);

  const fetchUser = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    getUserByUsername(user.user_name)
      .then((result) => setUser(result))
      .catch((err) => console.log(err));
  };

  const updateUserHandler = (event) => {
    event.preventDefault();
    console.log(updatedUser);
    updateAUser(updatedUser)
      .then((result) => {
        toast.success("Update success!");
        setReload(Math.random);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <div>
      <form id="contact-form" onSubmit={(event) => updateUserHandler(event)}>
        <h1>Your Information</h1>
        <label htmlFor="fullName">Full Name</label>
        <input
          onChange={(event) => {
            setUpdatedUser({
              ...updatedUser,
              [event.target.name]: event.target.value,
            });
          }}
          placeholder={user.fullName}
          name="fullName"
          type="text"
        />
        <label htmlFor="productDescription">Email</label>
        <input
          onChange={(event) => {
            setUpdatedUser({
              ...updatedUser,
              [event.target.name]: event.target.value,
            });
          }}
          placeholder={user.email}
          name="email"
          type="email"
        />
        <label htmlFor="Category">Password</label>
        <input
          onChange={(event) => {
            setUpdatedUser({
              ...updatedUser,
              [event.target.name]: event.target.value,
            });
          }}
          name="password"
          type="password"
        />
        <label htmlFor="Category">Confirm Password</label>

        <input
          onChange={(event) => {
            setUpdatedUser({
              ...updatedUser,
              [event.target.name]: event.target.value,
            });
          }}
          name="confirmPassword"
          type="password"
        />
        <button type="submit"> Update</button>
      </form>
    </div>
  );
};

export default UserPage;
