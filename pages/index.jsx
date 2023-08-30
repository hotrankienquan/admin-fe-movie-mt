import { Inter } from "next/font/google";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useStore } from "../zustand/store";
import LayoutRoot from "../components/layout";
import Dashboard from "./Dashboard";
import ProtectedRoute from "../utils/ProtectedRoutes";
const inter = Inter({ subsets: ["latin"] });

const Home = (props) => {
  const info = useStore((store) => store.info);
  const addUser = useStore((store) => store.addUser);
  const accessToken = info[0]?.accessToken;

  console.log(">>>Check info accessToken", accessToken);
  console.log(">>>Check info user", info);
  return (
    <>
      <Head>
        <title>The Stone</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta property="og:type" content="blog" />
        <meta
          property="og:image"
          content="https://img.freepik.com/free-vector/flat-vertical-hotel-information-flyer-template_23-2148898863.jpg?w=2000"
        ></meta>
        <meta
          name="description"
          content="Web site created using create-react-app"
        />
        <meta property="og:title" content="My page title" key="title" />
      </Head>

      <ProtectedRoute>
        <LayoutRoot>
          <Dashboard />
        </LayoutRoot>
      </ProtectedRoute>

      {/* <div>
        <p>Du lieu trong kho zustand : {info && info[0]?.username}</p>
        <input
          className="border border-green-400"
          type="text"
          value={state.username}
          onChange={(e) =>
            setState((prev) => ({ ...prev, username: e.target.value }))
          }
        />
        <input
          className="border border-green-400"
          type="text"
          value={state.password}
          onChange={(e) =>
            setState((prev) => ({ ...prev, password: e.target.value }))
          }
        />
        <button
          className="bg-red-500"
          onClick={() => {
            addUser(state.username, state.password);
            setState({
              username: "",
              password: "",
            });
          }}
        >
          Submit
        </button>
      </div> */}
    </>
  );
};
export default Home;
