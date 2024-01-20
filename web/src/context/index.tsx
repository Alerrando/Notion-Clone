import React, { createContext, useContext, useState } from "react";
import uuid from "react-uuid";
import { routesRole } from "../routes";
import { AnnotationType, EventLog, RouterRole, UserDTOProps, UserProps } from "./types";

type IPropsContext = {
  children: React.ReactNode;
};

const userDTOValuesDefault: UserDTOProps = {
  id: "",
  role: "USER",
  annotations: [],
};

export type ContextProps = {
  usersAll: UserProps[];
  setUsersAll: (usersAll: UserProps[]) => void;
  user: UserDTOProps;
  setUser: (user: UserDTOProps) => void;
  eventLog: EventLog[];
  setEventLog: (eventLog: EventLog[]) => void;
  createEventLogRegister: (data: UserProps, eventTypeData: string, eventDetailsData: string) => void;
  verifyRoleUser: () => void;
  updateUserAnnotation: (
    newAnnotation: AnnotationType | undefined,
    isNewAnnotation: boolean,
    annotationsAllUser?: AnnotationType[] | undefined,
  ) => void;
  getDatasLocalStorage: () => string | undefined;
};

export const StoreContext = createContext<ContextProps>({} as ContextProps);

export function UseNotionContext({ children }: IPropsContext) {
  const [usersAll, setUsersAll] = useState<UserProps[]>([]);
  const [user, setUser] = useState<UserDTOProps>(userDTOValuesDefault);
  const [eventLog, setEventLog] = useState<EventLog[]>([]);

  function verifyRoleUser() {
    const pathName = window.location.pathname;
    if (pathName !== "/") {
      routesRole.forEach((route: RouterRole) => {
        if (pathName === route.path && route.role !== user.role) {
          window.location.href = "/";
        }
      });
    }
  }

  async function createEventLogRegister(data: UserProps, eventTypeData: string, eventDetailsData: string) {
    const dataLog: EventLog = {
      id: uuid(),
      userId: data.id,
      timestamp: new Date(),
      eventType: eventTypeData,
      eventDetails: eventDetailsData,
    };

    setEventLog([...eventLog, dataLog]);
  }

  function updateUserAnnotation(
    newAnnotation: AnnotationType | undefined,
    isNewAnnotation: boolean,
    annotationsAllUser: AnnotationType[] | undefined,
  ) {
    const userAux = user;
    isNewAnnotation && newAnnotation && userAux.annotations.push(newAnnotation);

    if (!isNewAnnotation && annotationsAllUser) {
      userAux.annotations = annotationsAllUser;
    }
    const aux: UserProps[] = usersAll.map((user: UserProps) => {
      if (user.id === userAux.id) {
        return {
          ...userAux,
          ...user,
        };
      }
      return user;
    });
    setUser(userAux);
    setUsersAll(aux);

    localStorage.setItem("users-all-notion", JSON.stringify(usersAll));
  }

  function getDatasLocalStorage() {
    if (user?.id?.length === 0 || usersAll.length === 0) {
      const getUsersAll: UserProps[] = JSON.parse(localStorage.getItem("users-all-notion") as string);
      const idUser: string | undefined = localStorage.getItem("user-notion") as string;
      const getUser = getUsersAll?.find((user: UserProps) => user.id === idUser);
      if (getUsersAll && getUser) {
        setUsersAll(getUsersAll);
        setUser(getUser);
      }
      const annotationCurrent: string | null = localStorage.getItem("annotation-current");
      if (annotationCurrent !== null) {
        return annotationCurrent;
      }

      return "";
    }
  }

  return (
    <StoreContext.Provider
      value={{
        usersAll,
        setUsersAll,
        user,
        setUser,
        eventLog,
        setEventLog,
        createEventLogRegister,
        verifyRoleUser,
        updateUserAnnotation,
        getDatasLocalStorage,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(StoreContext);

  return context;
}
