import axiosConfig from "../utils/axiosConfig";

const getProductDetailById = async (productDetailId) => {
  try {
    const response = await axiosConfig.get(
      "api/productDetail/" + productDetailId
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export { getProductDetailById };
