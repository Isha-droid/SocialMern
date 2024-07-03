import axios from "axios";
import { loginStart } from "./context/AuthActions";

export const loginCall = async (userCredentials, dispatch) => {
  dispatch(loginStart());
  try {
    console.log(userCredentials)
    const res = await axios.post("http://localhost:5000/api/auth/login", userCredentials);
    console.log(res.data.user)
    localStorage.setItem('token', res.data.token);

    dispatch({type:"LOGIN_SUCCESS", payload : res.data.user});
  } catch (err) {
    dispatch({type:"LOGIN_FAILURE", payload:err});
  }
};
