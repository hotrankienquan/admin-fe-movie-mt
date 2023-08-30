import axios from "axios";
import Cookies from "js-cookie";

///////// MOVIE ////////
export const getAllMovies = async (
  axiosJWT,
  token,
  currentPage,
  pageSize,
  formFilter,
  searchInput
) => {
  const base_url = process.env.NEXT_PUBLIC_URL;
  try {
    let queryURL = `${base_url}/api/v1/movie/admin-get-movies?page=${currentPage}&pageSize=${pageSize}&filter=${JSON.stringify(
      formFilter
    )}`;
    if (searchInput) {
      queryURL += `&q=${searchInput}`;
    }

    let allMovie = await axiosJWT.get(queryURL, {
      headers: { token: `Bearer ${token}` },
    });
    return allMovie;
  } catch (err) {
    console.log(err);
  }
};

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

///////// USER /////////////////
export const getAllUsers = async (
  axiosJWT,
  token,
  currentPage,
  pageSize,
  formFilter,
  searchInput
) => {
  const base_url = process.env.NEXT_PUBLIC_URL;
  try {
    let queryURL = `${base_url}/api/v1/user/?page=${currentPage}&pageSize=${pageSize}&filter=${JSON.stringify(
      formFilter
    )}`;
    if (searchInput) {
      queryURL += `&q=${searchInput}`;
    }

    let allUsers = await axiosJWT.get(queryURL, {
      headers: { token: `Bearer ${token}` },
    });
    return allUsers;
  } catch (err) {
    console.log(err);
  }
};

export const disabledUser = async (data, axiosJWT, token, router, toast) => {
  const base_url = process.env.NEXT_PUBLIC_URL;

  try {
    const res = await axiosJWT.put(
      `${base_url}/api/v1/user/disabled-user`,
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

export const deleteUser = async (userId, axiosJWT, token, toast) => {
  const base_url = process.env.NEXT_PUBLIC_URL;
  try {
    const res = await axiosJWT.delete(
      `${base_url}/api/v1/user/delete-user/${userId}`,
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
