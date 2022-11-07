import axiosConfig from "../utils/axiosConfig";

const newOrder = async (contact, userName, orderDetails) => {
  const response = await axiosConfig.post("api/order", {
    orderAddress: contact.orderAddress,
    phone: contact.phone,
    userName: userName,
    orderDetails: orderDetails,
  });
  return response;
};

export { newOrder };
