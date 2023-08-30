import React, { useEffect, useState } from "react";
import LayoutRoot from "../../../components/layout";
import axios from "axios";
import Link from "next/link";
import ReactPlayer from "react-player";
import { useStore } from "../../../zustand/store";
import { createAxios } from "../../../utils/createInstance";

const DetailFilm = ({ nameFilm }) => {
  // console.log(nameFilm);
  const [movie, setMovie] = useState({});
  console.log(movie);
  const poster = movie?.photo?.[0];
  const video = movie?.video?.[0];
  const category = movie?.category?.map((category) => category.name);

  const info = useStore((store) => store.info);
  const accessToken = info[0]?.accessToken;
  let axiosJWT = createAxios(info[0], null, null);

  const arrDetailInfoFilm = [
    { id: 1, name: "ID", text: movie._id },
    { id: 2, name: "Thể loại", text: category },
    { id: 3, name: "Phát hành", text: movie.yearPublish },
    { id: 4, name: "Đạo diễn", text: movie.author },
    { id: 5, name: "Diễn viên", text: movie.actors },
    { id: 6, name: "Quốc gia", text: movie.country },
    { id: 7, name: "Lượt xem", text: movie.views },
  ];

  useEffect(() => {
    const renderSingleMovie = async () => {
      try {
        let res = await axiosJWT.get(
          `${process.env.NEXT_PUBLIC_URL}/api/v1/movie/admin/${nameFilm}`,
          {
            headers: { token: `Bearer ${accessToken}` },
          }
        );
        // console.log(">>> Results Search <<<", res);
        if (res.data.code === 200) {
          // console.log(">>> Results Search <<<", res.data.data.movieSingle[0]);
          setMovie(res.data.data.movieSingle[0]);
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
        <div className="grid grid-cols-7 gap-4 max-w-[1500px] mx-auto">
          {/* LEFT */}
          <div className="col-span-5">
            <div className="p-2.5 bg-[#2D2D2D]">
              <div className="overflow-hidden">
                {/* SECTION VIDEO FILM */}

                <div className="players-container">
                  {/* <JWPlayer
                    library="https://content.jwplatform.com/libraries/j9BLvpMc.js"
                    //   playlist='https://cdn.jwplayer.com/v2/playlists/B8FTSH9D'
                    // playlist={playlistt}
                    // playlist={
                    //   "https://cdn.jwplayer.com/v2/playlists/B8FTSH9D?fbclid=IwAR0j_kzxOGd1oB0pr4Go-MxsNfzI4KYQOlGPYgRKEkt_O5UZvKsK2CY7GM4"
                    // }
                    playlist={
                      "https://firebasestorage.googleapis.com/v0/b/movie-the-stone-d9f38.appspot.com/o/files%2FB%C3%A1%C2%BA%C2%A3n%20in%20l%C3%A1%C2%BB%C2%97i.mp4%20%20%20%20%20%20%202023-8-16%2022%3A53%3A35?alt=media&token=f6bd78f4-3f03-40c8-a4f8-5ec41902866d"
                    }
                  /> */}
                  <ReactPlayer
                    url={video}
                    // url={
                    //   "https://firebasestorage.googleapis.com/v0/b/movie-the-stone-d9f38.appspot.com/o/files%2FB%C3%A1%C2%BA%C2%A3n%20in%20l%C3%A1%C2%BB%C2%97i.mp4%20%20%20%20%20%20%202023-8-16%2022%3A53%3A35?alt=media&token=f6bd78f4-3f03-40c8-a4f8-5ec41902866d"
                    // }
                    controls
                    className=""
                  />
                </div>
              </div>

              {/* SECTION COMMENT */}
              {/* <CommentFilm /> */}
            </div>
          </div>

          {/* RIGHT */}
          <div className="col-span-2">
            <div className=" py-[10px] rounded-md bg-[#1b2d58]">
              <div className="h-full px-[15px]">
                <span className="block w-full">
                  <img
                    className="block w-full h-full"
                    src={poster}
                    alt="poster"
                  />
                </span>
              </div>

              <div>
                <h1 className="mx-[15px] mt-[22.5px] text-lg font-semibold text-white">
                  {movie.title}
                </h1>
                <div className="flex items-center pt-[7.5px] pb-[15px] px-[15px] mb-[15px] border-[1px] border-[#21376c]">
                  <span className="min-w-[20px] px-[3px] bg-[#c7d2ee] text-xs font-medium text-black border-[1px] border-[#c7d2ee]">
                    {movie.quality}
                  </span>
                  <span className="ml-[6px] px-[3px] text-[#c7d2ee] text-xs font-medium border-[1px] border-[#c7d2ee]">
                    PG
                  </span>
                  <span className="ml-[6px] text-base text-white">
                    {movie.timeVideo}
                  </span>
                </div>
                <div className="px-[15px] pb-[15px] border-b-[1px] border-[#21376c]">
                  <p className="scroll_desc max-h-[200px] text-[15px] text-white overflow-y-auto">
                    {movie.desc}
                  </p>
                </div>
                <div className="m-[15px] text-[#c7d2ee]">
                  {arrDetailInfoFilm.map((item, index) => (
                    <div
                      key={item.id}
                      className={`flex text-[14px] font-normal ${
                        index >= 1 ? "mt-[5px]" : ""
                      }`}
                    >
                      <div className="min-w-[90px]">{item.name}:</div>
                      <span className="flex-1">
                        {Array.isArray(item.text) ? (
                          item.text.map((subText, i) => (
                            <React.Fragment key={i}>
                              <Link
                                href="#"
                                className="text-[#f1ffff] hover:text-[#e94a68] transition-all duration-150 ease-in-out"
                              >
                                {subText}
                              </Link>
                              {i !== item.text.length - 1 && ", "}
                            </React.Fragment>
                          ))
                        ) : (
                          <p className="">{item.text}</p>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="bg-[#e94a68] py-[9px] px-[15px] mx-[15px] rounded-[4px] text-center">
                  <div>
                    <span>
                      <b>7.82</b> of <b>10</b> (<span>2754</span> 2,754 reviews)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutRoot>
  );
};

export default DetailFilm;

export async function getServerSideProps(context) {
  const nameFilm = context.params.nameFilm;
  // let movie = await axios.get(
  //   `${process.env.NEXT_PUBLIC_URL}/api/v1/movie/${nameFilm}`
  // );
  // console.log(movie.data.data.movieSingle[0]);

  return {
    props: { nameFilm },
  };
}
