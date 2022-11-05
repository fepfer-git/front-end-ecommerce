import axiosConfig from "../utils/axiosConfig";

const getAllCategories = async () => {
  try {
    const response = await axiosConfig.get("api/categories");
    return response;
  } catch (error) {
    console.error(error);
  }
};

export { getAllCategories };
