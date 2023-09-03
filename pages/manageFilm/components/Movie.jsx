import Link from "next/link";
import React from "react";
import { deleteMovie, disabledMovie } from "../../../services/adminRequest";
import { createAxios } from "../../../utils/createInstance";
import { useStore } from "../../../zustand/store";
import { useRouter } from "next/router";

const Movie = ({ item, index, setArrMovies, toast }) => {
  const router = useRouter();
  const info = useStore((store) => store.info);
  //   console.log(info[0]);
  const accessToken = info[0]?.accessToken;
  let axiosJWT = createAxios(info[0], null, null);

  const handleDeleteMovie = async (movieId) => {
    try {
      if (window.confirm("Bạn có chắc chắn muốn xóa phim này không?")) {
        console.log(movieId);
        const res = await deleteMovie(movieId, axiosJWT, accessToken, toast);
        console.log(res);
        if (res?.status === 200) {
          setArrMovies((prevMovies) =>
            prevMovies.filter((movie) => movie._id !== movieId)
          );
        }
        toast(res?.data);
      }
    } catch (err) {
      console.log(err);
      toast(err);
    }
  };

  const handleDisableMovie = async (movieId, disableMovie) => {
    try {
      const toggleDisable = !disableMovie;
      console.log(movieId, toggleDisable);
      const data = { movieId, toggleDisable };
      const res = await disabledMovie(
        data,
        axiosJWT,
        accessToken,
        router,
        toast
      );
      console.log(res);
      setArrMovies((prevMovies) => {
        const updatedMovies = prevMovies.map((movie) => {
          if (movie._id === movieId) {
            return {
              ...movie,
              disabled: toggleDisable,
            };
          }
          return movie;
        });
        return updatedMovies;
      });
      toast(res?.data?.message);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <tr className="h-[140px] border-b-[1px] border-black text-center">
        <td className="px-2 py-4 break-words max-w-[150px]">{index + 1}</td>
        <td className="px-2 py-4 break-words max-w-[350px] font-semibold">
          {item.title}
        </td>
        <td className="px-2 py-4 max-w-[250px]">
          <img
            className="h-[130px] mx-auto object-contain"
            src={item.photo[0]}
            alt="pic"
          />
        </td>
        <td className="px-2 py-4 break-words max-w-[200px]">
          {item.timeVideo}
        </td>
        <td className="px-2 py-4 break-words max-w-[200px]">
          <span className="">{item.disabled === false ? "Hiện" : "Ẩn"}</span>
        </td>
        <td className="px-2 py-4 max-w-[200px]">
          <div className="mb-2">
            <Link
              // href={`/manageFilm/${item.title.replace(/\s+/g, "-")}`}
              href={`/manageFilm/${item.slug}`}
              className=""
            >
              <i className="fa-solid fa-circle-info text-blue-600"></i>
            </Link>
          </div>

          <div className="mb-2">
            <Link
              // href={`/editFilm/${item.title.replace(/\s+/g, "-")}`}
              href={`/editFilm/${item.slug}`}
              className=""
            >
              <i className="fa-solid fa-pen text-yellow-600"></i>
            </Link>
          </div>

          <div className="mb-2">
            <button
              className=""
              onClick={(e) => {
                e.preventDefault();
                return handleDeleteMovie(item._id);
              }}
            >
              <i className="fa-solid fa-trash text-red-600"></i>
            </button>
          </div>

          <div className="mb-2">
            <button
              className=""
              onClick={(e) => {
                e.preventDefault();
                return handleDisableMovie(item._id, item.disabled);
              }}
            >
              {item.disabled === false ? (
                <i className="fa-solid fa-eye-slash text-gray-500"></i>
              ) : (
                <i className="fa-solid fa-eye text-green-600"></i>
              )}
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default Movie;
