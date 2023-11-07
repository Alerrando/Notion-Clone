import React, { createContext, useState } from "react";
import { createEventLog } from "../api";
import { EventLog, UserDTOProps, UserProps } from "./typesContext";

type IPropsContext = {
  children: React.ReactNode;
};

export const UserValueDefault: UserProps = {
  id: "0",
  name: "",
  email: "",
  password: "",
  level: 0,
  annotations: [],
  role: "USER",
};

const UserDTOValuesDefault: UserDTOProps = {
  id: "0",
  role: "USER",
  annotations: [],
};

type ContextProps = {
  user: UserDTOProps;
  setUser: (users: UserDTOProps) => void;
  EventLogRegister: (data: UserProps, eventTypeData: string, eventDetailsData: string) => void;
};

export const NotionContextProvider = createContext<ContextProps>({} as ContextProps);

function CreateContextProvider({ children }: IPropsContext) {
  const [user, setUser] = useState<UserDTOProps>(UserDTOValuesDefault);

  async function EventLogRegister(data: UserProps, eventTypeData: string, eventDetailsData: string) {
    const dataLog: EventLog = {
      id: "0",
      user: data,
      timestamp: Date.now(),
      eventType: eventTypeData,
      eventDetails: eventDetailsData,
    };

    await createEventLog(dataLog);
  }

  return (
    <NotionContextProvider.Provider value={{ user, setUser, EventLogRegister }}>
      {children}
    </NotionContextProvider.Provider>
  );
}

export default CreateContextProvider;
