import { Hardware } from "@mui/icons-material";
import { showToasts } from "../components/toast";
import axios, { axiosPrivate } from "../services/api";
import { baseURL } from "../utils/constants/api";

export const createItem = async (
  item,
  onSuccess = () => {},
  onError = (_message) => {}
) => {
  try {
    const response = await axiosPrivate.post("/api/item/addItem", item);
    if (response.status == 201) {
      onSuccess();
    }
    return response;
  } catch (error) {
    onError(error);
  }
};

export const getAllItems = async (
  onSuccess = () => {},
  onError = (_message) => {}
) => {
  try {
    const response = await axiosPrivate.get("/api/item/getAllItems");
    if (response.status == 200) {
      onSuccess();
    }
    return response;
  } catch (error) {
    onError(error);
  }
};

export const getAllItemsByCategory = async (
  category,
  onSuccess = () => {},
  onError = (_message) => {}
) => {
  try {
    const response = await axiosPrivate.get(
      "/api/item/getItemsByCategory?category=" + category
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
