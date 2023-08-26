import { useRef, useState } from "react";
import axios from "axios";

const UploadVideo = () => {
  const [form, setFormValue] = useState({
    filename: null,
  });
  // console.log(form);
  const [dataRes, setDataRes] = useState({});
  // console.log(dataRes);
  const inputRefFile = useRef(null);
  const handleChange = (e) => {
    // console.log([e.target]);
    const { name, value } = e.target;
    if (name === "filename") {
      setFormValue((prevState) => ({
        ...prevState,
        filename: e.target.files[0],
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
          if (key === "filename") {
            formData.append(key, value);
          } else {
            formData.append(key, value.toString());
          }
        }
      });

      // console.log(...formData.entries());
      // console.log(formData);
      const base_url = process.env.NEXT_PUBLIC_URL;
      const response = await axios.post(`${base_url}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      setFormValue((prev) => ({
        ...prev,
        filename: null,
      }));
      if (response) {
        setDataRes({ ...response.data });
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
        Upload video trước để lấy link paste vào
      </h2>
      <div className="mb-4 w-fit border-[1px] border-black">
        <input
          ref={inputRefFile}
          name="filename"
          type="file"
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
        <div>
          <span className="mr-[20px] text-base font-bold">Message:</span>
          <span className="italic">{dataRes?.message || "..."}</span>
        </div>
        <div>
          <span className="mr-[20px] text-sm font-bold">Name:</span>
          <span className="italic">{dataRes?.name || "..."}</span>
        </div>
        <div>
          <span className="mr-[20px] text-sm font-bold">Type:</span>
          <span className="italic">{dataRes?.type || "..."}</span>
        </div>
        <div>
          <span className="mr-[20px] text-sm font-bold">Link URL phim:</span>
          <span className="italic">{dataRes?.downloadURL || "..."}</span>
        </div>
      </div>
    </div>
  );
};

export default UploadVideo;
