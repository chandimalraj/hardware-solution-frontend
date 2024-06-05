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

export const editItem = async (
  item,
  onSuccess = () => {},
  onError = (_message) => {}
) => {
  try {
    const response = await axiosPrivate.post("/api/item/editItem", item);
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
  page,
  pageSize,
  onSuccess = () => {},
  onError = (_message) => {}
) => {
  try {
    const response = await axiosPrivate.get(
      "/api/item/getItemsByCategory?category=" + category + "&page=" + page+ "&pageSize=" + pageSize
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
      "/api/item/getItemsByName?name=" + name + "&category=" + category + "&page=1&pageSize=100"
    );
    if (response.status == 200) {
      onSuccess();
    }
    return response;
  } catch (error) {
    onError(error);
  }
};


export const deleteItemById = async (
  id,
  onSuccess = () => {},
  onError = (_message) => {}
) => {
  try {
    const response = await axiosPrivate.delete(
      "/api/item/deleteItem?id=" + id
    );
    if (response.status == 200) {
      onSuccess();
    }
    return response;
  } catch (error) {
    onError(error);
  }
};