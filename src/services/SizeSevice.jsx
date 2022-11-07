import axiosConfig from "../utils/axiosConfig";

const getAllSizes = async () => {
  const response = await axiosConfig.get("api/sizes");
  return response;
};

const addNewSize = async (sizeName) => {
  const response = await axiosConfig.post("api/size", {
    sizeName: sizeName,
  });
  return response;
};

const deleteSize = async (sizeId) => {
  const response = await axiosConfig.delete("api/size/" + sizeId);
  return response;
};

export { getAllSizes, addNewSize, deleteSize };
