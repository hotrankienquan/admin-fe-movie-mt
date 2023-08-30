import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useStore } from "../zustand/store";
import { createAxios } from "./createInstance";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  // const user = useSelector((state) => state.auth.login.currentUser) || null;
  // console.log(user);

  const info = useStore((store) => store.info);
  const accessToken = info[0]?.accessToken;
  // console.log(accessToken);

  if (info.length === 0 || !accessToken) {
    router.push("/login");
    return;
  }

  if (!info?.length === 0 || accessToken) {
    return children;
  }
};

export default ProtectedRoute;
