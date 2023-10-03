import axios from "axios";
import { CreateFormRegisterData } from "../pages/Login/FormRegister";
import { CreateFormLoginData } from "../pages/Login/FormLogin";

const api = "http://localhost:8080";

export function createRegister(info: CreateFormRegisterData) {
  const aux = axios
    .post(`${api}/user`, info)
    .then((response) => response)
    .catch((error) => error);

  return aux;
}

export function getLogin(user: CreateFormLoginData) {
  const aux = axios
    .get(`${api}/user/find/${user.email}/${user.password}`)
    .then((response) => response.data)
    .catch((error) => error);

  return aux;
}
