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
  const response = await axiosConfig.get("api/product/search/" + keyword);
  return response;
};

export { getAllProduct, getProductById, searchPorudctByName };
