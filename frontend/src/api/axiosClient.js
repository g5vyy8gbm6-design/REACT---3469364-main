/**
 * Se crea una instancia configurada de axios para hablar con el
 * backend (node/express) en vez de escribir la url completa.
 * Cada petición la dejamos configurada una sola vez aquí.
 */

import axios from "axios";

const API_URL = "http://localhost:4000/api";

const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosClient;