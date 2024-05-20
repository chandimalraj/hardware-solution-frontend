import { showToasts } from "../components/toast";
import axios, { axiosPrivate } from "../services/api";
import { baseURL } from "../utils/constants/api";

export const createSalesRep = async (
  salesRep,
  onSuccess = () => {},
  onError = (_message) => {}
) => {
  try {
    const response = await axiosPrivate.post(
      "/api/salesrep/addSalesRep",
      salesRep
    );
    if (response.status == 201) {
      onSuccess();
    }
    return response;
  } catch (error) {
    onError(error);
  }
};

export const getAllSalesReps = async (
  onSuccess = () => {},
  onError = (_message) => {}
) => {
  try {
    const response = await axiosPrivate.get("/api/salesrep/getSalesReps");
    if (response.status == 200) {
      onSuccess();
    }
    return response;
  } catch (error) {
    onError(error);
  }
};

export const deleteSalesRepById = async (
  id,
  onSuccess = () => {},
  onError = (_message) => {}
) => {
  try {
    const response = await axiosPrivate.delete(
      "/api/salesrep/deleteSalesRep?id=" + id
    );
    if (response.status == 200) {
      onSuccess();
    }
    return response;
  } catch (error) {
    onError(error);
  }
};
