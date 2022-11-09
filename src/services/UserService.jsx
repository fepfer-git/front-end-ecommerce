import axiosConfig from "../utils/axiosConfig";

const user = JSON.parse(localStorage.getItem("user"));

const login = async (userName, password) => {
  const params = new URLSearchParams();
  params.append("username", userName);
  params.append("password", password);
  const response = await axiosConfig.post("login", params);
  localStorage.setItem("user", JSON.stringify({ ...response, isLogged: true }));
  console.log(response);
  console.log(JSON.parse(localStorage.getItem("user")));
  return response;
};

const register = async (
  userName,
  fullName,
  password,
  confirmPassword,
  email
) => {
  const response = await axiosConfig.post("api/user", {
    userName: userName,
    fullName: fullName,
    password: password,
    confirmPassword: confirmPassword,
    email: email,
  });
  return response;
};

const getAllUsers = async () => {
  const response = await axiosConfig.get("api/users");
  return response;
};

const getUserByUsername = async (userName) => {
  const response = await axiosConfig.get("api/user/" + userName);
  return response;
};

const updateAUser = async (updatedUser) => {
  const response = await axiosConfig.put("api/user", {
    userName: user.user_name,
    email: updatedUser?.email,
    fullName: updatedUser?.fullName,
    password: updatedUser?.password,
    confirmPassword: updatedUser?.confirmPassword,
  });
  return response;
};

export { login, register, getAllUsers, getUserByUsername, updateAUser };
