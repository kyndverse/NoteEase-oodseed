import axios from "axios";

export const aiClient = axios.create({
  baseURL: "http://localhost:8000/api",
});
