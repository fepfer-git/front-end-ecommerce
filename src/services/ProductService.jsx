import axios from "axios";
import axiosConfig from "../utils/axiosConfig";

const getAllProduct = async () => {
  try {
    const response = await axiosConfig.get("api/products/available");
    return response;
  } catch (error) {
    console.error(error);
  }
};

const getProductById = async (productId) => {
  try {
    const response = await axiosConfig.get("api/product/" + productId);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const searchPorudctByName = async (keyword) => {
  const response = await axiosConfig.get(
    "api/product/search?searchName=" + keyword
  );
  return response;
};

const getAllProductByCategory = async (categoryId) => {
  try {
    const response = await axiosConfig.get(
      "api/products/category?categoryId=" + categoryId
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export {
  getAllProduct,
  getProductById,
  searchPorudctByName,
  getAllProductByCategory,
};
