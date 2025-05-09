import axios from "axios";

const baseURL =
  import.meta.env.VITE_BASE_URL ||
  "https://mini-ecommerce-1-tqqu.onrender.com/";

const api = axios.create({
  baseURL,
});

export const addProduct = (data: FormData) =>
  api.post("/products/add-product", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const getAllProducts = () =>
  api.get("/products", {
    headers: {
      "Content-Type": "application/json",
    },
  });
