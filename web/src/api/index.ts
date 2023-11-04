import axios from "axios";
import { CreateFormLoginData } from "../pages/Login/FormLogin";
import { CreateFormRegisterData } from "../pages/Login/FormRegister";
import { EventLog } from "../context";

const api = "http://localhost:8080";

export function getLogin(user: CreateFormLoginData) {
  const aux = axios
    .get(`${api}/user/find/${user.email}/${user.password}`)
    .then((response) => response.data)
    .catch((error) => error);

  return aux;
}

export function createRegister(info: CreateFormRegisterData) {
  const aux = axios
    .post(`${api}/user`, info)
    .then((response) => response)
    .catch((error) => error);

  return aux;
}

// ------------------------- API EventLog -------------------------
export function getFindAllEventLog() {
  const aux = axios
    .get(`${api}/event-log`)
    .then((response) => response.data)
    .catch((error) => error);

  return aux;
}

export function getEventLogById(id: number) {
  const aux = axios
    .get(`${api}/event-log/${id}`)
    .then((response) => response.data)
    .catch((error) => error);

  return aux;
}

export function createEventLog(dataLog: EventLog) {
  console.log(dataLog);
  const aux = axios
    .post(`${api}/event-log`, dataLog)
    .then((response) => response)
    .catch((error) => error);

  return aux;
}
