import axiosConfig from "../utils/axiosConfig";

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

export { login, register, getAllUsers };
