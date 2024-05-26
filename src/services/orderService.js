import { Hardware } from "@mui/icons-material";
import { showToasts } from "../components/toast";
import axios, { axiosPrivate } from "../services/api";
import { baseURL } from "../utils/constants/api";

export const getAllOrders = async (
  onSuccess = () => {},
  onError = (_message) => {}
) => {
  try {
    const response = await axiosPrivate.get("/api/order/getOrders");
    if (response.status == 200) {
      onSuccess();
    }
    return response;
  } catch (error) {
    onError(error);
  }
};

export const getItemsByOrder = async (
  id,
  onSuccess = () => {},
  onError = (_message) => {}
) => {
  try {
    const response = await axiosPrivate.get(
      "/api/order/getItemsByOrder?id=" + id
    );
    if (response.status == 200) {
      onSuccess();
    }
    return response;
  } catch (error) {
    onError(error);
  }
};

export const getItemsByName = async (
  name,
  category,
  onSuccess = () => {},
  onError = (_message) => {}
) => {
  try {
    const response = await axiosPrivate.get(
      "/api/item/getItemsByName?name=" + name + "&category=" + category
    );
    if (response.status == 200) {
      onSuccess();
    }
    return response;
  } catch (error) {
    onError(error);
  }
};
