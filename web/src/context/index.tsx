import React, { createContext, useState } from "react";

type IPropsContext = {
  children: React.ReactNode;
};

export type UserProps = {
  id: string;
  name: string;
  email: string;
  password: string;
  level: number;
  annotations: [];
};

export type EventLog = {
  id: string;
  user: UserProps;
  timestamp: Date;
  eventType: string;
  eventDetails: string;
};

export type AuthenticationDTO = {
  email: string;
  password: string;
};

export const UserValueDefault: UserProps = {
  id: "0",
  name: "",
  email: "",
  password: "",
  level: 0,
  annotations: [],
};

type ContextProps = {
  userId: number;
  setUserId: (users: number) => void;
};

export const NotionContextProvider = createContext<ContextProps>({} as ContextProps);

function CreateContextProvider({ children }: IPropsContext) {
  const [userId, setUserId] = useState<string>([]);

  return <NotionContextProvider.Provider value={{ userId, setUserId }}>{children}</NotionContextProvider.Provider>;
}

export default CreateContextProvider;
