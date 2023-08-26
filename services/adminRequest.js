import axios from "axios";
import Cookies from "js-cookie";

export const addMovie = async (dataMovie, axiosJWT, token, router, toast) => {
  const base_url = process.env.NEXT_PUBLIC_URL;

  try {
    const res = await axiosJWT.post(
      `${base_url}/api/v1/movie/add-movie`,
      dataMovie,
      {
        headers: { token: `Bearer ${token}` },
      }
    );
    console.log(res);
    if (res?.status === 200) {
      toast(res.data.message);
    }
  } catch (err) {
    console.log(err);
    console.log(err?.response?.data?.err?.message);
    if (err?.response?.data?.err?.message) {
      toast(err.response.data.err.message);
    }
  }
};

export const updateMovie = async (
  dataMovie,
  axiosJWT,
  token,
  router,
  toast
) => {
  const base_url = process.env.NEXT_PUBLIC_URL;

  try {
    const res = await axiosJWT.put(
      `${base_url}/api/v1/movie/update-movie`,
      dataMovie,
      {
        headers: { token: `Bearer ${token}` },
      }
    );
    console.log(res);
    if (res?.status === 200) {
      toast(res.data.message);
    }
  } catch (err) {
    console.log(err);
    console.log(err?.response?.data?.err?.message);
    if (err?.response?.data?.err?.message) {
      toast(err.response.data.err.message);
    }
  }
};

export const disabledMovie = async (data, axiosJWT, token, router, toast) => {
  const base_url = process.env.NEXT_PUBLIC_URL;

  try {
    const res = await axiosJWT.put(
      `${base_url}/api/v1/movie/disabled-movie`,
      data,
      {
        headers: { token: `Bearer ${token}` },
      }
    );
    // console.log(res);
    // if (res?.status === 200) {
    //   toast(res.data.message);
    // }
    return res;
  } catch (err) {
    console.log(err);
    console.log(err?.response?.data?.err?.message);
    if (err?.response?.data?.err?.message) {
      toast(err.response.data.err.message);
    }
  }
};

export const deleteMovie = async (movieId, axiosJWT, token, toast) => {
  const base_url = process.env.NEXT_PUBLIC_URL;

  try {
    const res = await axiosJWT.delete(
      `${base_url}/api/v1/movie/delete-movie/${movieId}`,
      {
        headers: { token: `Bearer ${token}` },
      }
    );
    console.log(res);
    return res;
  } catch (err) {
    return err;
  }
};
