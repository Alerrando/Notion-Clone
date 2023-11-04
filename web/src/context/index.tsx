import React, { createContext, useState } from "react";

type IPropsContext = {
  children: React.ReactNode;
};

export type UserProps = {
  id: number;
  name: string;
  email: string;
  password: string;
  level: number;
  annotaions: [];
};

export type EventLog = {
  id: number;
  user: UserProps;
  timestamp: Date;
  eventType: string;
  eventDetails: string;
};

type ContextProps = {
  userId: number;
  setUserId: (users: number) => void;
};

export const NotionContextProvider = createContext<ContextProps>({} as ContextProps);

function CreateContextProvider({ children }: IPropsContext) {
  const [userId, setUserId] = useState<number>([]);

  return <NotionContextProvider.Provider value={{ userId, setUserId }}>{children}</NotionContextProvider.Provider>;
}

export default CreateContextProvider;
