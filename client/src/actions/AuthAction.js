import * as AuthApi from "../api/AuthRequest";

export const signUp = (registrationData, navigate) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.signUp(registrationData);
    dispatch({ type: "AUTH_SUCCESS", data: data });
    navigate("../login", { replace: true });
  } catch (error) {
    console.log(error);
    dispatch({ type: "AUTH_FAIL" });
  }
};

export const logIn = (loginData, navigate) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.logIn(loginData);
    dispatch({ type: "AUTH_SUCCESS", data: data });
    navigate("../feed", { replace: true });
  } catch (error) {
    console.log(error);
    dispatch({ type: "AUTH_FAIL" });
  }
};

export const logOut = () => async(dispatch) => {
  dispatch({type: "LOG_OUT"})
}
