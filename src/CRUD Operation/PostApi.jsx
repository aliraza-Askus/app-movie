import axios from "axios";

const API = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const GetMethod = () => {
  return API.get("/posts");
};

export const DeleteMethod = (id) => {
  return API.delete(`/posts/${id}`);
};

export const PostData = (postdata) => {
  return API.post("/posts", postdata);
};
