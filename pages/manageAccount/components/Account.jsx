import Link from "next/link";
import React from "react";
import { deleteUser, disabledUser } from "../../../services/adminRequest";
import { createAxios } from "../../../utils/createInstance";
import { useStore } from "../../../zustand/store";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Account = ({ item, index, setArrAccount }) => {
  const router = useRouter();
  const info = useStore((store) => store.info);
  //   console.log(info[0]);
  const accessToken = info[0]?.accessToken;
  let axiosJWT = createAxios(info[0], null, null);

  const handleDeleteAccount = async (accountId) => {
    try {
      if (window.confirm("Bạn có chắc chắn muốn xóa tài khoản này không?")) {
        console.log(accountId);
        const res = await deleteUser(accountId, axiosJWT, accessToken, toast);
        console.log(res);
        if (res?.status === 200) {
          setArrAccount((prevAccounts) =>
            prevAccounts.filter((account) => account._id !== accountId)
          );
        }
        alert(res?.data);
      }
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };

  const handleDisableAccount = async (accountId, disableAccount) => {
    try {
      const toggleDisable = !disableAccount;
      console.log(accountId, toggleDisable);
      const data = { accountId, toggleDisable };
      const res = await disabledUser(
        data,
        axiosJWT,
        accessToken,
        router,
        toast
      );
      console.log(res);
      setArrAccount((prevAccounts) => {
        const updatedMovies = prevAccounts.map((account) => {
          if (account._id === accountId) {
            return {
              ...account,
              disabled: toggleDisable,
            };
          }
          return account;
        });
        return updatedMovies;
      });
      alert(res?.data?.message);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <tr className="h-[140px] border-b-[1px] border-black text-center">
        <td className="px-2 py-4 break-words max-w-[150px]">{index + 1}</td>
        <td className="px-2 py-4 break-words max-w-[300px] font-semibold">
          {item.username}
        </td>
        <td className="px-2 py-4 break-words max-w-[400px] font-semibold">
          {item.email}
        </td>
        <td className="px-2 py-4 break-words max-w-[150px]">
          {item.isAdmin.toString()}
        </td>
        <td className="px-2 py-4 break-words max-w-[200px]">{item.national}</td>
        <td className="px-2 py-4 break-words max-w-[150px]">
          <span className="">
            {item.disabled === false ? "Kích hoạt" : "Khóa"}
          </span>
        </td>
        <td className="px-2 py-4 max-w-[200px]">
          <div className="mb-2">
            <Link
              // href={`/manageFilm/${item.title.replace(/\s+/g, "-")}`}
              href={`/manageAccount/${item.username}`}
              className=""
            >
              <i className="fa-solid fa-circle-info text-blue-600"></i>
            </Link>
          </div>

          {/* <div className="mb-2">
            <Link
              // href={`/editFilm/${item.title.replace(/\s+/g, "-")}`}
              href={`/editAccount/${item.username}`}
              className=""
            >
              <i className="fa-solid fa-pen text-yellow-600"></i>
            </Link>
          </div> */}

          <div className="mb-2">
            <button
              className=""
              onClick={(e) => {
                e.preventDefault();
                return handleDeleteAccount(item._id);
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
                return handleDisableAccount(item._id, item.disabled);
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

export default Account;
