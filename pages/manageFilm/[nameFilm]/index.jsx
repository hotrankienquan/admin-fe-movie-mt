import React, { useEffect, useState } from "react";
import LayoutRoot from "../../../components/layout";
import axios from "axios";

const DetailFilm = ({ nameFilm, singleMovie }) => {
  console.log(nameFilm);
  // const [singleMovie, setSingleMovie] = useState();
  console.log(singleMovie);

  // useEffect(() => {
  //   const renderSingleMovie = async () => {
  //     try {
  //       let res = await axios.get(
  //         `${process.env.NEXT_PUBLIC_URL}/api/v1/movie/${nameFilm}`
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
  // }, [nameFilm]);

  return (
    <LayoutRoot>
      <div className="px-[12px]">
        <div>{nameFilm}</div>
        <div>{singleMovie.title}</div>
      </div>
    </LayoutRoot>
  );
};

export default DetailFilm;

export async function getServerSideProps(context) {
  const nameFilm = context.params.nameFilm;
  let singleMovie = await axios.get(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/movie/${nameFilm}`
  );
  // console.log(singleMovie.data.data.movieSingle[0]);

  return {
    props: { nameFilm, singleMovie: singleMovie.data.data.movieSingle[0] },
  };
}
