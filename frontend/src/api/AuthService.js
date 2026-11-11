/**
 * Concreta las llamadas a la api relacionadas con autenticaccion
 */

import axiosClient from "./axiosClient";

export async function iniciarSesion(email, password) {
  const response = await axiosClient.post("/auth/login", { email, password });
  return response.data; // { token, user }
}

export async function obtenerPerfil() {
  const response = await axiosClient.get("/auth/profile");
  return response.data;
}