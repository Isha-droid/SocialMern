import axios from "axios";
import { loginStart } from "./context/AuthActions";

export const loginCall = async (userCredentials, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("http://localhost:5000/api/auth/login", userCredentials);
    dispatch({type:"LOGIN_SUCCESS", payload : res.data});
  } catch (err) {
    dispatch({type:"LOGIN_FAILURE", payload:err});
  }
};
