import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import { useStore } from "../../../zustand/store";
import { createAxios } from "../../../utils/createInstance";
import { updateMovie } from "../../../services/adminRequest";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import axios from "axios";
import LayoutRoot from "../../../components/layout";
import UploadVideo from "../../uploadVideo";
import UploadPhotos from "../../uploadPhoto";

const EditFilm = ({ categories, nameFilm }) => {
  // console.log(nameFilm);
  // console.log(categories);
  const [movieEdit, setMovieEdit] = useState({});
  console.log(movieEdit);
  const options = categories.map((category) => ({
    value: category._id,
    label: category.name,
  }));

  const router = useRouter();
  const schema = yup.object().shape({
    title: yup.string().required(),
    author: yup.string().required(),
    actors: yup.string().required(),
    awards: yup.string().required(),
    category: yup.array().required(),
    timeVideo: yup.string().required(),
    photo: yup.string().required(),
    video: yup.string().required(),
    desc: yup.string().required(),
    quality: yup.string().required(),
    country: yup.string().required(),
    yearPublish: yup.number().required(),
  });

  const info = useStore((store) => store.info);
  //   console.log(info[0]);
  const accessToken = info[0]?.accessToken;
  let axiosJWT = createAxios(info[0], null, null);

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [isPaid] = watch(["isPaid"]);
  console.log("isPaid", isPaid);

  const removeAccents = (str) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace("Đ", "D")
      .replace("đ", "d");
  };
  const becomeSlug = (str) => {
    const nonDiacriticString = str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace("Đ", "D")
      .replace("đ", "d");
    const withoutSpaces = nonDiacriticString.replace(/\s+/g, "-");
    return withoutSpaces.toLowerCase();
  };

  const onSubmit = async (data) => {
    // console.log(">>> Data LOGIN <<<", data);
    const slug = becomeSlug(data.title);
    const titleWithoutAccent = removeAccents(data.title);
    const authorWithoutAccent = removeAccents(data.author);
    const actorsWithoutAccent = removeAccents(data.actors);

    // console.log(slug);
    // console.log(titleWithoutAccent);
    // console.log(authorWithoutAccent);
    // console.log(actorsWithoutAccent);

    const dataFilm = {
      ...data,
      id: movieEdit._id,
      slug,
      titleWithoutAccent,
      authorWithoutAccent,
      actorsWithoutAccent,
    };
    console.log(dataFilm);
    updateMovie(dataFilm, axiosJWT, accessToken, router, toast);
  };

  useEffect(() => {
    const renderSingleMovie = async () => {
      try {
        const movie = await axiosJWT.get(
          `${process.env.NEXT_PUBLIC_URL}/api/v1/movie/admin/${nameFilm}`,
          {
            headers: { token: `Bearer ${accessToken}` },
          }
        );

        console.log(">>> Results <<<", movie);
        if (movie.data.code === 200) {
          const singleMovie = movie.data.data.movieSingle[0];
          const movieFields = {
            title: singleMovie.title,
            yearPublish: singleMovie.yearPublish,
            category: singleMovie.category.map((category) => ({
              value: category._id,
              label: category.name,
            })),
            timeVideo: singleMovie.timeVideo,
            country: singleMovie.country,
            author: singleMovie.author.join(", "),
            actors: singleMovie.actors.join(", "),
            awards: singleMovie.awards.join(", "),
            photo: singleMovie.photo.join(""),
            video: singleMovie.video.join(""),
            quality: singleMovie.quality,
            desc: singleMovie.desc,
            isPaid: singleMovie.isPaid,
          };

          for (const field in movieFields) {
            setValue(field, movieFields[field]);
          }

          setMovieEdit(singleMovie);
        }
      } catch (err) {
        console.log(err);
      }
    };
    renderSingleMovie();
  }, [nameFilm]);

  return (
    <LayoutRoot>
      <div className="px-[12px]">
        <div className="mb-3">
          <h2 className="text-lg font-semibold">CHỈNH SỬA PHIM</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-6 gap-4">
            <div className="col-span-2">
              <label className="inline-block mb-1">Tên phim</label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:border-primary-600 block w-full p-2.5"
                placeholder="tên phim"
                {...register("title", { required: true })}
              />
              {<span className="text-red-500">{errors.title?.message}</span>}
            </div>
            <div className="col-span-1">
              <label className="inline-block mb-1">Năm phát hành</label>
              <input
                type="number"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:border-primary-600 block w-full p-2.5"
                placeholder="..."
                {...register("yearPublish", { required: true })}
              />
              {
                <span className="text-red-500">
                  {errors.yearPublish?.message}
                </span>
              }
            </div>
            <div className="col-span-1">
              <label className="inline-block mb-1">Thể loại</label>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    isMulti
                    options={options}
                    onChange={(selectedOption) => {
                      setValue("category", selectedOption);
                    }}
                  />
                )}
              />
              {<span className="text-red-500">{errors.category?.message}</span>}
            </div>

            <div className="col-span-1">
              <label className="inline-block mb-1">Thời lượng</label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:border-primary-600 block w-full p-2.5"
                placeholder="..."
                {...register("timeVideo", { required: true })}
              />
              {
                <span className="text-red-500">
                  {errors.timeVideo?.message}
                </span>
              }
            </div>
            <div className="col-span-1">
              <label className="inline-block mb-1">Quốc gia</label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:border-primary-600 block w-full p-2.5"
                placeholder="..."
                {...register("country", { required: true })}
              />
              {<span className="text-red-500">{errors.country?.message}</span>}
            </div>
            <div className="col-span-2">
              <label className="inline-block mb-1">Đạo diễn</label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:border-primary-600 block w-full p-2.5"
                placeholder="..."
                {...register("author", { required: true })}
              />
              {<span className="text-red-500">{errors.author?.message}</span>}
            </div>
            <div className="col-span-2">
              <label className="inline-block mb-1">Diễn viên</label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:border-primary-600 block w-full p-2.5"
                placeholder="..."
                {...register("actors", { required: true })}
              />
              {<span className="text-red-500">{errors.actors?.message}</span>}
            </div>
            <div className="col-span-2">
              <label className="inline-block mb-1">Giải thưởng</label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:border-primary-600 block w-full p-2.5"
                placeholder="..."
                {...register("awards", { required: true })}
              />
              {<span className="text-red-500">{errors.awards?.message}</span>}
            </div>
            <div className="col-span-2">
              <label className="inline-block mb-1">Poster</label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:border-primary-600 block w-full p-2.5"
                placeholder="link"
                {...register("photo", { required: true })}
              />
              {<span className="text-red-500">{errors.photo?.message}</span>}
            </div>
            <div className="col-span-2">
              <label className="inline-block mb-1">Video</label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:border-primary-600 block w-full p-2.5"
                placeholder="link"
                {...register("video", { required: true })}
              />
              {<span className="text-red-500">{errors.video?.message}</span>}
            </div>
            <div className="col-span-1">
              <label className="inline-block mb-1">Chất lượng</label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:border-primary-600 block w-full p-2.5"
                placeholder="hd"
                {...register("quality", { required: true })}
              />
              {<span className="text-red-500">{errors.quality?.message}</span>}
            </div>
            <div className="col-span-1 border-[1px] border-black text-center my-auto">
              <input
                type="checkbox"
                id="yellow-checkbox"
                className="w-4 h-4 text-yellow-400 bg-gray-100 border-gray-300 rounded cursor-pointer"
                {...register("isPaid")}
              />
              <label
                htmlFor="yellow-checkbox"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer"
              >
                isPaid
              </label>
              {<span className="text-red-500">{errors.isPaid?.message}</span>}
            </div>
            <div className="col-span-2">
              <label className="inline-block mb-1">Miêu tả</label>
              <textarea
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:border-primary-600 block w-full p-2.5"
                placeholder="...."
                {...register("desc", { required: true })}
              ></textarea>
              {<span className="text-red-500">{errors.desc?.message}</span>}
            </div>
          </div>

          <div className="flex justify-end items-center">
            <button
              type="submit"
              className="mt-2 text-white bg-black hover:opacity-70 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Lưu
            </button>
          </div>
        </form>

        <UploadVideo />
        <UploadPhotos />
      </div>
      <ToastContainer />
    </LayoutRoot>
  );
};

export default EditFilm;

export async function getServerSideProps(context) {
  const nameFilm = context.params.nameFilm;
  let allCategory = await axios.get(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/category`
  );
  // let singleMovie = await axios.get(
  //   `${process.env.NEXT_PUBLIC_URL}/api/v1/movie/user/${nameFilm}`
  // );
  return {
    props: {
      nameFilm,
      categories: allCategory.data.data,
      // singleMovie: singleMovie.data.data.movieSingle[0],
    },
  };
}
