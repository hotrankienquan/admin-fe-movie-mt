import {
  loginFailed,
  loginStart,
  loginSuccess,
  logOutSuccess,
  logOutFailed,
  logOutStart,
} from "./authSlice";
import axios from "axios";
import Cookies from "js-cookie";

////////////////////******************** AUTH ********************////////////////////////////

export const login = async (user, dispatch, router, toast) => {
  const base_url = process.env.NEXT_PUBLIC_URL;
  dispatch(loginStart());
  try {
    const res = await axios.post(`${base_url}/api/v1/auth/login`, user);
    if (res.data.code == 200) {
      let accessToken = res.data.data.accessToken.toString();
      // Cookies.set("accessToken", accessToken);
      dispatch(loginSuccess(res.data.data));
      toast("Đăng nhập thành công");
      router.push("/");
    }
  } catch (err) {
    console.log(err);
    dispatch(loginFailed());
    if (err?.response?.data?.code) {
      toast(err.response.data.err.mes);
    }
  }
};

export const register = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    await axios.post("/v1/auth/register", user);
    dispatch(registerSuccess());
    navigate("/login");
  } catch (err) {
    console.log(err);
    dispatch(registerFailed("Something is wrong"));
  }
};

export const getAllUsers = async (token, dispatch, axiosJWT) => {
  dispatch(getUsersStart());
  try {
    const res = await axiosJWT.get("/v1/user/", {
      headers: { token: `Bearer ${token}` },
    });
    dispatch(getUsersSuccess(res.data));
  } catch (err) {
    dispatch(getUsersFailed());
  }
};

export const deleteUser = async (id, dispatch, token) => {
  dispatch(deleteUsersStart());
  try {
    const res = await axios.delete("/v1/user/" + id, {
      headers: { token: `Bearer ${token}` },
    });
    dispatch(deleteUsersSuccess(res.data));
  } catch (err) {
    dispatch(deleteUsersFailed(err.response.data));
  }
};

export const logOut = async (dispatch, id, router, accessToken, axiosJWT) => {
  const base_url = process.env.NEXT_PUBLIC_URL;
  dispatch(logOutStart());
  try {
    await axiosJWT.post(`${base_url}/api/v1/auth/logout`, id, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(logOutSuccess());
    router.push("/");
  } catch (err) {
    dispatch(logOutFailed());
  }
};
