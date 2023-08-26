import { useRef, useState } from "react";
import axios from "axios";

const UploadPhotos = () => {
  const [form, setFormValue] = useState({
    photos: [],
  });
  // console.log(form);
  const [dataRes, setDataRes] = useState([]);
  // console.log(dataRes);
  const inputRefFile = useRef(null);
  const handleChange = (e) => {
    // console.log([e.target]);
    const { name, value } = e.target;
    if (name === "photos") {
      setFormValue((prevState) => ({
        ...prevState,
        // [name]: e.target.files,
        [name]: [...prevState[name], ...e.target.files],
      }));
    } else {
      setFormValue((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value !== null) {
          if (key === "photos") {
            for (let i = 0; i < value.length; i++) {
              formData.append("photos", value[i]);
            }
          } else {
            formData.append(key, value.toString());
          }
        }
      });

      // console.log(...formData.entries());
      // console.log(formData);
      const base_url = process.env.NEXT_PUBLIC_URL;
      const response = await axios.post(
        `${base_url}/upload/photos/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      setFormValue((prev) => ({
        ...prev,
        photos: [],
      }));
      if (response) {
        setDataRes([...response.data.data]);
      }
      alert(response?.data?.message);
      inputRefFile.current.value = "";
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <div className="mt-6 border-t-[1px] border-black">
      <h2 className="mb-2 font-semibold">
        Upload ảnh trước để lấy link paste vào
      </h2>
      <div className="mb-4 w-fit border-[1px] border-black">
        <input
          ref={inputRefFile}
          name="photos"
          type="file"
          multiple
          onChange={handleChange}
          placeholder=""
        />
        <button
          className="py-[6px] px-[12px] font-normal text-base text-white bg-[#009688] rounded hover:opacity-70"
          onClick={handleSubmitForm}
        >
          Submit
        </button>
      </div>

      <div className="w-fit border-[1px] border-black">
        {/* <div>
          <span className="mr-[20px] text-base font-bold">Message:</span>
          <span className="italic">{dataRes?.message || "..."}</span>
        </div> */}
        <div>
          <span className="mr-[20px] text-sm font-bold">Name:</span>
          {dataRes.map((item, i) => (
            <span key={i} className="block italic">
              {"- "}
              {item?.name}
            </span>
          ))}
        </div>
        <div>
          <span className="mr-[20px] text-sm font-bold">Type:</span>
          {dataRes.map((item, i) => (
            <span key={i} className="block italic">
              {"- "}
              {item?.type}
            </span>
          ))}
        </div>
        <div>
          <span className="mr-[20px] text-sm font-bold">Link URL ảnh:</span>
          {dataRes.map((item, i) => (
            <span key={i} className="block italic">
              {"- "}
              {item?.downloadURL}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UploadPhotos;
