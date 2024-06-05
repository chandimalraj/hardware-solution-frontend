import { Hardware } from "@mui/icons-material";
import { showToasts } from "../components/toast";
import axios, { axiosPrivate } from "../services/api";
import { baseURL } from "../utils/constants/api";

export const createCustomer = async (
  customer,
  onSuccess = () => {},
  onError = (_message) => {}
) => {
  try {
    const response = await axiosPrivate.post(
      "/api/customer/addCustomer",
      customer
    );
    if (response.status == 201) {
      onSuccess();
    }
    return response;
  } catch (error) {
    onError(error);
  }
};

export const editCustomer = async (
  customer,
  onSuccess = () => {},
  onError = (_message) => {}
) => {
  try {
    const response = await axiosPrivate.post(
      "/api/customer/editCustomer",
      customer
    );
    if (response.status == 201) {
      onSuccess();
    }
    return response;
  } catch (error) {
    onError(error);
  }
};

export const getAllCustomers = async (
  page,
  pageSize,
  onSuccess = () => {},
  onError = (_message) => {}
) => {
  try {
    const response = await axiosPrivate.get(
      "/api/customer/getCustomers?page=" + page + "&perPage=" + pageSize
    );
    if (response.status == 200) {
      onSuccess();
    }
    return response;
  } catch (error) {
    onError(error);
  }
};

export const getCustomersByName = async (
  name,
  onSuccess = () => {},
  onError = (_message) => {}
) => {
  try {
    const response = await axiosPrivate.get(
      "/api/customer/getCustomersByName?name=" + name
    );
    if (response.status == 200) {
      onSuccess();
    }
    return response;
  } catch (error) {
    onError(error);
  }
};

export const getCustomersByAreas = async (
  areas,
  onSuccess = () => {},
  onError = (_message) => {}
) => {
  try {
    const response = await axiosPrivate.get(
      "/api/customer/getCustomersByAreas?areas=" + areas
    );
    if (response.status == 200) {
      onSuccess();
    }
    return response;
  } catch (error) {
    onError(error);
  }
}


export const deleteCustomerById = async (
  id,
  onSuccess = () => {},
  onError = (_message) => {}
) => {
  try {
    const response = await axiosPrivate.delete(
      "/api/customer/deleteCustomer?id=" + id
    );
    if (response.status == 200) {
      onSuccess();
    }
    return response;
  } catch (error) {
    onError(error);
  }
};