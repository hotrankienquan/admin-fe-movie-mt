import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/router";
import { createAxios } from "../../utils/createInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LayoutRoot from "../../components/layout";
import { useStore } from "../../zustand/store";
import { addMovie } from "../../services/adminRequest";
import Select from "react-select";
import axios from "axios";
import UploadVideo from "../uploadVideo";
import UploadPhotos from "../uploadPhoto";

const AddFilm = ({ categories }) => {
  console.log(categories);
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
  //   const [password] = watch(["password"]);

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
      slug,
      titleWithoutAccent,
      authorWithoutAccent,
      actorsWithoutAccent,
    };
    console.log(dataFilm);
    addMovie(dataFilm, axiosJWT, accessToken, router, toast);
    reset();
  };

  return (
    <LayoutRoot>
      <div className="px-[12px]">
        <div className="mb-3">
          <h2 className="text-lg font-semibold">THÊM PHIM</h2>
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
              {/* <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:border-primary-600 block w-full p-2.5"
                placeholder="..."
                {...register("category", { required: true })}
              /> */}
              {/* <Select
                isMulti
                options={options}
                className="basic-multi-select bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:border-primary-600 block w-full p-2.5"
                classNamePrefix="select"
                {...register("category", { required: true })}
              /> */}

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
                // {...register("category", { required: true })}
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
              Thêm phim
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

export default AddFilm;

export async function getServerSideProps(context) {
  // if need accesstoken, get here
  // nếu api nào cần verify token, thì gắn accesstoken này vào rồi call api
  // console.log(context.req.cookies.accessToken) // get cookie accessToken
  let allCategory = await axios.get(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/category`
  );
  return {
    props: {
      categories: allCategory.data.data,
    },
  };
}
