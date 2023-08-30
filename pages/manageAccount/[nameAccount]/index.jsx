import React, { useEffect, useState } from "react";

import axios from "axios";
import LayoutRoot from "../../../components/layout";

const DetailAccount = ({ nameAccount, singleAccount }) => {
  console.log(nameAccount);
  // const [singleAccount, setSingleMovie] = useState();
  console.log(singleAccount);

  // useEffect(() => {
  //   const renderSingleMovie = async () => {
  //     try {
  //       let res = await axios.get(
  //         `${process.env.NEXT_PUBLIC_URL}/api/v1/movie/${nameAccount}`
  //       );
  //       // console.log(">>> Results Search <<<", res);
  //       if (res.data.code === 200) {
  //         // console.log(">>> Results Search <<<", res.data.data.movies);
  //         setSingleMovie(res.data.data.movieSingle[0]);
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   // renderSingleMovie();
  // }, [nameAccount]);

  return (
    <LayoutRoot>
      <div className="px-[12px]">
        <div>{nameAccount}</div>
        <div>{singleAccount.title}</div>
      </div>
    </LayoutRoot>
  );
};

export default DetailAccount;

export async function getServerSideProps(context) {
  const nameAccount = context.params.nameAccount;
  let singleAccount = await axios.get(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/user/${nameAccount}`
  );
  // console.log(singleAccount.data.data.movieSingle[0]);

  return {
    props: {
      nameAccount,
      singleAccount: singleAccount.data.data.user[0],
    },
  };
}
