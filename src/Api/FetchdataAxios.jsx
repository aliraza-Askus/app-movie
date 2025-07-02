import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

export const FetchAxios = () => {
  const [apiData, setApidata] = useState([]);
  const getApiData = async () => {
    try {
      const Api = await axios.get(
        `http://www.omdbapi.com/?i=tt3896198&apikey=${
          import.meta.env.VITE_API_KEY
        }=titanic&page=1`
      );
      setApidata(Api.data.Search);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getApiData();
  }, []);
  return (
    <>
      <div>Hello Home page</div>
    </>
  );
};
