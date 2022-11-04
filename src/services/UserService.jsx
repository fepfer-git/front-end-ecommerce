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

export default login;
