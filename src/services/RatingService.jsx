import axiosConfig from "../utils/axiosConfig";

const getAllRatingByProductId = async (props) => {
  try {
    const response = await axiosConfig.get("api/rating/" + props);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const addNewRating = async (props) => {
  try {
    const response = await axiosConfig.post("api/rating", {
      productId: props.newRating.productId,
      userName: props.newRating.userName,
      rating: props.newRating.star,
      comment: props.newRating.comment,
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

export { getAllRatingByProductId, addNewRating };
