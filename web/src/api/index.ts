import axios from "axios";
import { AuthenticationDTO, EventLog } from "../context";
import { AnnotationType } from "../context/types";
import { CreateFormRegisterData } from "../pages/Login/FormRegister";

const api = "http://localhost:9090";

export function getAllUsers() {
  const aux = axios
    .get(`${api}/user`, {
      withCredentials: true,
    })
    .then((response) => response)
    .catch((error) => error);

  return aux;
}

export function getLogin(user: AuthenticationDTO) {
  const aux = axios
    .post(`${api}/user/find`, user, {
      withCredentials: true,
    })
    .then((response) => response)
    .catch((error) => error);

  return aux;
}

export function createRegister(info: CreateFormRegisterData) {
  const aux = axios
    .post(`${api}/user`, info, {
      withCredentials: true,
    })
    .then((response) => response)
    .catch((error) => error);

  return aux;
}

// ------------------------- API Annotation ------------------------- //

export function createAnnotation(annotations: AnnotationType) {
  const aux = axios
    .post(`${api}/annotation`, annotations, {
      withCredentials: true,
    })
    .then((response) => response)
    .catch((error) => error);

  return aux;
}

export function updateAnnotation(annotations: AnnotationType[]) {
  const aux = axios
    .put(`${api}/annotation`, annotations, {
      withCredentials: true,
    })
    .then((response) => response)
    .catch((error) => error);

  return aux;
}

// ------------------------- API EventLog ------------------------- //
export function getFindAllEventLog() {
  const aux = axios
    .get(`${api}/event-log`)
    .then((response) => response.data, {
      withCredentials: true,
    })
    .catch((error) => error);

  return aux;
}

export function getEventLogById(id: number) {
  const aux = axios
    .get(`${api}/event-log/${id}`)
    .then((response) => response.data, {
      withCredentials: true,
    })
    .catch((error) => error);

  return aux;
}

export function createEventLog(dataLog: EventLog) {
  const aux = axios
    .post(`${api}/event-log`, dataLog, {
      withCredentials: true,
    })
    .then((response) => response)
    .catch((error) => error);

  return aux;
}
