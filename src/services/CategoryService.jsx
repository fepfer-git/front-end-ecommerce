import axiosConfig from "../utils/axiosConfig";

const getAllCategories = async () => {
  try {
    const response = await axiosConfig.get("api/categories");
    return response;
  } catch (error) {
    console.error(error);
  }
};

const addNewCategory = async (categoryName) => {
  const response = await axiosConfig.post("api/category", {
    categoryName: categoryName,
  });
  return response;
};

const deleteCategory = async (categoryId) => {
  const response = await axiosConfig.delete("api/category/" + categoryId);
  return response;
};

export { getAllCategories, addNewCategory, deleteCategory };
