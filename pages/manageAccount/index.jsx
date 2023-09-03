import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import Account from "./components/Account";
import { useStore } from "../../zustand/store";
import { createAxios } from "../../utils/createInstance";
import { getAllMovies, getAllUsers } from "../../services/adminRequest";
import ProtectedRoute from "../../utils/ProtectedRoutes";
import LayoutRoot from "../../components/layout";
import Pagination from "../../components/Pagination";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const arrAccount = [
//   {
//     id: 1,
//     username: "tonystark",
//     email: "kienquan@gmail.com",
//     isAdmin: "false",
//     loveMovie: [],
//     markBookMovie: [],
//     avatar:
//       "https://scontent.fsgn8-4.fna.fbcdn.net/v/t39.30808-6/329103902_1170346807183250_1864135939632522915_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=05he3j1BiSQAX_XsqVm&_nc_ht=scontent.fsgn8-4.fna&oh=00_AfAGXxGqcH7svVCmuIixV32Hv0Bdl-wtIZVWRQWPyrR7xQ&oe=64E93359",
//     familyName: "Tuan",
//     givenName: "Tran",
//     national: "viet nam",
//     disabled: false,
//   },
//   {
//     id: 2,
//     username: "captain",
//     email: "captain@gmail.com",
//     isAdmin: "false",
//     loveMovie: [],
//     markBookMovie: [],
//     avatar:
//       "https://scontent.fsgn8-4.fna.fbcdn.net/v/t39.30808-6/329103902_1170346807183250_1864135939632522915_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=05he3j1BiSQAX_XsqVm&_nc_ht=scontent.fsgn8-4.fna&oh=00_AfAGXxGqcH7svVCmuIixV32Hv0Bdl-wtIZVWRQWPyrR7xQ&oe=64E93359",
//     familyName: "america",
//     givenName: "capuchino",
//     national: "viet nam",
//     disabled: false,
//   },
// ];

const ManageAccount = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageNumber = searchParams.get("page");

  const [arrAccount, setArrAccount] = useState([]);
  const [totalAccount, setTotalAccount] = useState(0);
  // console.log(arrAccount);

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
    filterIsAdmin: "",
  });
  //   console.log(formFilter);
  const { filterDisabled, filterSort, filterIsAdmin } = formFilter;
  // console.log(">>> filterDisabled <<<", filterDisabled);
  // console.log(">>> filterSort <<<", filterSort);
  const handleSearchInput = async (e) => {
    const { name, value } = e.target;
    setSearchInput(value);
  };
  const handleSubmitSearchInput = async (e) => {
    e.preventDefault();
    try {
      const allAccount = await getAllMovies(
        axiosJWT,
        accessToken,
        currentPage,
        pageSize,
        searchInput
      );
      console.log(">>> Results Search <<<", allAccount);
      if (allAccount.data.code === 200) {
        // console.log(">>> Results Search <<<", res.data.data.users);
        setArrAccount(allAccount.data.data.users);
        setTotalPages(Math.ceil(allAccount.data.data.totalCount / pageSize));
        setTotalAccount(allAccount.data.data.totalCount);
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

        const allAccount = await getAllUsers(
          axiosJWT,
          accessToken,
          currentPage,
          pageSize,
          formFilter,
          searchParam
        );

        console.log(">>> Results Search <<<", allAccount);
        if (allAccount.data.code === 200) {
          // console.log(">>> Results Search <<<", res.data.data.users);
          setArrAccount(allAccount.data.data.users);
          setTotalPages(Math.ceil(allAccount.data.data.totalCount / pageSize));
          setTotalAccount(allAccount.data.data.totalCount);
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
    formFilter,
    filterDisabled,
    filterSort,
  ]);

  useEffect(() => {
    router.push(`/manageAccount/?page=${currentPage}`);
  }, [currentPage]);

  return (
    <ProtectedRoute>
      <LayoutRoot>
        <div className="px-[12px]">
          <div className="mb-3">
            <h2 className="text-lg font-semibold">QUẢN LÝ TÀI KHOẢN</h2>
          </div>

          <div className="mb-7 flex items-center justify-between">
            <div className="flex items-center">
              <div className="relative mr-4">
                <label className="mr-2">Search</label>
                <input
                  className="h-[38px] px-[20px] py-[6px] border-[1px] border-black rounded-[30px] placeholder:italic placeholder:text-xs"
                  type="text"
                  name="searchInput"
                  placeholder="username..."
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
                  <option value={false}>Kích hoạt</option>
                  <option value={true}>Khóa</option>
                </select>
              </div>

              <div className="mr-2">
                <label className="mr-2">isAdmin</label>
                <select
                  className=" border-[1px] border-black"
                  name="filterIsAdmin"
                  value={filterIsAdmin}
                  onChange={handleChangeFilter}
                >
                  <option value="">Tất cả</option>
                  <option value={false}>User</option>
                  <option value={true}>Admin</option>
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

            {/* <Link
              href="/addFilm"
              className="py-[6px] px-[12px] font-normal text-base text-white bg-[#009688] rounded hover:opacity-70"
            >
              Thêm phim
            </Link> */}
          </div>

          <div>
            <p className="font-semibold italic">
              Tổng số lượng tài khoản: {totalAccount}
            </p>
          </div>

          <div className="mt-2">
            <table className="w-full border-collapse border border-slate-500 overflow-auto">
              <thead className="text-white bg-[#3e5265]">
                <tr className="h-[70px] whitespace-nowrap">
                  <th className="px-2 w-[150px] border border-slate-400">ID</th>
                  <th className="px-2 w-[300px] border border-slate-400">
                    Username
                  </th>
                  <th className="px-2 w-[400px] border border-slate-400">
                    Email
                  </th>
                  <th className="px-2 w-[150px] border border-slate-400">
                    isAdmin
                  </th>
                  <th className="px-2 w-[200px] border border-slate-400">
                    Quốc gia
                  </th>
                  <th className="px-2 w-[150px] border border-slate-400">
                    Trạng thái
                  </th>
                  <th className="px-2 w-[200px] border border-slate-400">
                    Hành động
                  </th>
                </tr>
              </thead>

              <tbody>
                {arrAccount.map((item, index) => (
                  <Account
                    key={index}
                    item={item}
                    index={index}
                    setArrAccount={setArrAccount}
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

export default ManageAccount;

export async function getServerSideProps(context) {
  // if need accesstoken, get here
  // nếu api nào cần verify token, thì gắn accesstoken này vào rồi call api
  // console.log(context.req.cookies.accessToken) // get cookie accessToken
  //   let allCategory = await axios.get(
  //     `${process.env.NEXT_PUBLIC_URL}/api/v1/category`
  //   );
  return {
    props: {
      //   categories: allCategory.data.data,
    },
  };
}
