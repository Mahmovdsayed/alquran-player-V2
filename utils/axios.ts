import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.quran.com/api/v4",
  headers: {
    "Content-Type": "application/json",
  },
});
