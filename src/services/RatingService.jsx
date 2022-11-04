import axiosConfig from "../utils/axiosConfig";

const getAllRatingByProductId = async (props) => {
  try {
    const response = await axiosConfig.get("api/rating/" + props);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const addNewRating = async (comment, star, userName, productId) => {
  const response = await axiosConfig.post("api/rating", {
    productId: productId,
    userName: userName,
    rating: star,
    comment: comment,
  });
  return response;
};

export { getAllRatingByProductId, addNewRating };
