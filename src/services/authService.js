import { showToasts } from "../components/toast";
import axios, { axiosPrivate } from "../services/api";
import { baseURL } from "../utils/constants/api";

export const userLogin = async (
  user,
  onSuccess = () => {},
  onError = (_message) => {}
) => {
  try {
    const response = await axios.post("/api/auth/login", {
      username: user.username,
      password: user.password,
    });
    if (response.status == 200) {
      onSuccess();
      const token = response.data.data;
      console.log(token);
      localStorage.setItem("jwtToken", token);
    }
    return response;
  } catch (error) {
    onError()
  }
  
};
