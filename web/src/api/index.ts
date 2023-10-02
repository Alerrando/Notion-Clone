import axios from "axios";
import { CreateFormRegisterData } from "../pages/Login/FormRegister";

const api = "http://localhost:8080";

export function createRegister(info: CreateFormRegisterData) {
  const aux = axios
    .post(`${api}/user`, info)
    .then((response) => response)
    .catch((error) => error);

  return aux;
}
