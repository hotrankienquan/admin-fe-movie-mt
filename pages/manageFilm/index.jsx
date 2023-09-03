import React, { useEffect, useState } from "react";
import LayoutRoot from "../../components/layout";
import { useStore } from "../../zustand/store";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Pagination from "../../components/Pagination";
import { useRouter } from "next/router";
import axios from "axios";
import Movie from "./components/Movie";
import { createAxios } from "../../utils/createInstance";
import { getAllMovies } from "../../services/adminRequest";
import ProtectedRoute from "../../utils/ProtectedRoutes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const arrMovies = [
//   {
//     id: 1,
//     title: "Cá mập bạo chúa",
//     desc: "phim nói về con cá mập khổng lồ...",
//     author: ["ben while", "nolan"],
//     actors: ["tan", "tuan"],
//     category: ["kinh di", "sieu nhien"],
//     photo: [
//       "https://d1j8r0kxyu9tj8.cloudfront.net/files/1618301042CTBAF7i4v3cXFfn.jpg",
//     ],
//     video: [],
//     trailer: [],
//     quaility: "hd",
//     rating: 7,
//     yearPublish: 2023,
//     timeVideo: "1h30p",
//     country: "Viet Nam",
//     listUserRating: [],
//     disabled: false,
//   },
//   {
//     id: 2,
//     title: "Peaky Blinder",
//     desc: "phim nói về máy dập Anh Quốc...",
//     author: ["murphy", "nolan"],
//     actors: ["tan", "tuan"],
//     category: ["tâm lý", "hành động"],
//     photo: [
//       "https://www.tallengestore.com/cdn/shop/products/PeakyBlinders-ThomasShelby-GarrisonBombing-NetflixTVShow-ArtPoster_7fef60c1-eddd-41e8-89fd-ac6edeba5038.jpg?v=1619864662",
//     ],
//     video: [],
//     trailer: [],
//     quaility: "hd",
//     rating: 7,
//     yearPublish: 2023,
//     timeVideo: "1h30p",
//     country: "Viet Nam",
//     listUserRating: [],
//     disabled: true,
//   },
// ];

const ManageFilm = ({}) => {
  // console.log(">>> CATEGORIES <<<", categories);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageNumber = searchParams.get("page");

  const [arrMovies, setArrMovies] = useState([]);
  const [totalFilm, setTotalFilm] = useState(0);
  // console.log(arrMovies);

  const [currentPage, setCurrentPage] = useState(parseInt(pageNumber) || 1);
  const [pageSize, setPageSize] = useState(30);
  const [totalPages, setTotalPages] = useState(0);
  const info = useStore((store) => store.info);
  const accessToken = info[0]?.accessToken;
  let axiosJWT = createAxios(info[0], null, null);

  const [searchInput, setSearchInput] = useState("");
  const [formFilter, setFormFilter] = useState({
    filterDisabled: "",
    filterSort: 0,
  });
  console.log("render");

  //   console.log(formFilter);
  const { filterDisabled, filterSort } = formFilter;
  // console.log(">>> filterDisabled <<<", filterDisabled);
  // console.log(">>> filterSort <<<", filterSort);

  const handleSearchInput = async (e) => {
    const { name, value } = e.target;
    setSearchInput(value);
  };
  const handleSubmitSearchInput = async (e) => {
    e.preventDefault();
    try {
      const allMovie = await getAllMovies(
        axiosJWT,
        accessToken,
        currentPage,
        pageSize,
        searchInput
      );
      console.log(">>> Results Search <<<", allMovie);
      if (allMovie.data.code === 200) {
        // console.log(">>> Results Search <<<", res.data.data.movies);
        setArrMovies(allMovie.data.data.movie);
        setTotalPages(Math.ceil(allMovie.data.data.totalCount / pageSize));
        setTotalFilm(allMovie.data.data.totalCount);
      }
    } catch (err) {
      console.log(err);
    }
    // setSearchInput("");
  };

  const handleChangeFilter = (e) => {
    const { name, value } = e.target;
    if (value) {
      setFormFilter((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      setFormFilter((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    const renderAllMovies = async () => {
      try {
        let searchParam = null;
        if (searchInput) {
          searchParam = searchInput;
        }

        const allMovie = await getAllMovies(
          axiosJWT,
          accessToken,
          currentPage,
          pageSize,
          formFilter,
          searchParam
        );

        console.log(">>> Results Search <<<", allMovie);
        if (allMovie.data.code === 200) {
          // console.log(">>> Results Search <<<", res.data.data.movies);
          setArrMovies(allMovie.data.data.movie);
          setTotalPages(Math.ceil(allMovie.data.data.totalCount / pageSize));
          setTotalFilm(allMovie.data.data.totalCount);
        }
      } catch (err) {
        console.log(err);
      }
    };
    renderAllMovies();
  }, [
    currentPage,
    pageSize,
    searchInput,
    accessToken,
    formFilter,
    filterDisabled,
    filterSort,
  ]);

  useEffect(() => {
    router.push(`/manageFilm/?page=${currentPage}`);
  }, [currentPage]);

  return (
    <ProtectedRoute>
      <LayoutRoot>
        <div className="px-[12px]">
          <div className="mb-3">
            <h2 className="text-lg font-semibold">QUẢN LÝ PHIM</h2>
          </div>

          <div className="mb-7 flex items-center justify-between">
            <div className="flex items-center">
              <div className="relative mr-4">
                <label className="mr-2">Search</label>
                <input
                  className="h-[38px] px-[20px] py-[6px] border-[1px] border-black rounded-[30px] placeholder:italic placeholder:text-xs"
                  type="text"
                  name="searchInput"
                  placeholder="tên phim, đạo diễn, diễn viên"
                  value={searchInput}
                  onChange={handleSearchInput}
                />
                <i
                  className="fa-solid fa-magnifying-glass absolute right-3 top-[50%] -translate-y-1/2 cursor-pointer"
                  onClick={handleSubmitSearchInput}
                ></i>
              </div>

              <div className="mr-2">
                <label className="mr-2">Filter</label>
                <select
                  className=" border-[1px] border-black"
                  name="filterDisabled"
                  value={filterDisabled}
                  onChange={handleChangeFilter}
                >
                  <option value="">Tất cả</option>
                  <option value={false}>Hiện</option>
                  <option value={true}>Ẩn</option>
                </select>
              </div>

              <div>
                <label className="mr-2">Sort</label>
                <select
                  className="border-[1px] border-black"
                  name="filterSort"
                  value={filterSort}
                  onChange={handleChangeFilter}
                >
                  <option value={0}>Mới nhất</option>
                  <option value={1}>Cũ nhất</option>
                </select>
              </div>
            </div>

            <Link
              href="/addFilm"
              className="py-[6px] px-[12px] font-normal text-base text-white bg-[#009688] rounded hover:opacity-70"
            >
              Thêm phim
            </Link>
          </div>

          <div>
            <p className="font-semibold italic">
              Tổng số lượng phim: {totalFilm}
            </p>
          </div>

          <div className="mt-2">
            <table className="w-full border-collapse border border-slate-500 overflow-auto">
              <thead className="text-white bg-[#3e5265]">
                <tr className="h-[70px] whitespace-nowrap">
                  <th className="px-2 w-[150px] border border-slate-400">ID</th>
                  <th className="px-2 w-[350px] border border-slate-400">
                    Tên phim
                  </th>
                  <th className="px-2 w-[250px] border border-slate-400">
                    Poster
                  </th>
                  <th className="px-2 w-[200px] border border-slate-400">
                    Thời lượng
                  </th>
                  <th className="px-2 w-[200px] border border-slate-400">
                    Trạng thái
                  </th>
                  <th className="px-2 w-[200px] border border-slate-400">
                    Hành động
                  </th>
                </tr>
              </thead>

              <tbody>
                {arrMovies.map((item, index) => (
                  <Movie
                    key={index}
                    item={item}
                    index={index}
                    setArrMovies={setArrMovies}
                    toast={toast}
                  />
                ))}
              </tbody>
            </table>
          </div>

          <Pagination
            paginationData={{
              currentPage,
              totalPages,
              setCurrentPage: setCurrentPage,
            }}
          />

          <ToastContainer />
        </div>
      </LayoutRoot>
    </ProtectedRoute>
  );
};

export default ManageFilm;

export async function getServerSideProps(context) {
  // if need accesstoken, get here
  // nếu api nào cần verify token, thì gắn accesstoken này vào rồi call api
  // console.log(context.req.cookies.accessToken) // get cookie accessToken
  // let allCategory = await axios.get(
  //   `${process.env.NEXT_PUBLIC_URL}/api/v1/category`
  // );
  return {
    props: {
      // categories: allCategory.data.data,
    },
  };
}
