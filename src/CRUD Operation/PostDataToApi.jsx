import { useState } from "react";
import { PostData } from "./PostApi";
export const PostDataToApi = ({ apiData, setApiData }) => {
  const [inputdata, setInputdata] = useState({
    title: "",
    body: "",
  });

  const HandleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputdata((pre) => {
      console.log(pre);
      return {
        ...pre,
        [name]: value,
      };
    });
  };

  const AddpostData = async () => {
    try {
      const response = await PostData(inputdata);
      console.log(response);
      if (response.status === 201) {
        setApiData((prevData) => [...prevData, response.data]); // Append new post
      }
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };
  const HandleFoamSubmit = (e) => {
    e.preventDefault();
    AddpostData();
    setInputdata({ title: "", body: "" });
  };
  return (
    <div className="flex justify-center items-center ">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-4 -mt-18">
          Submit Data
        </h2>
        <form className="space-y-4" onSubmit={HandleFoamSubmit}>
          <input
            type="text"
            id="title"
            name="title"
            value={inputdata.title}
            onChange={HandleChange}
            placeholder="Enter Title"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="body"
            id="body"
            value={inputdata.body}
            onChange={HandleChange}
            placeholder="Enter Paragraph"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
