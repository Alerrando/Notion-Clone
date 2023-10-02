import React, { createContext, useState } from "react";

type IPropsContext = {
  children: React.ReactNode;
};

export type UserProps = {
  id: number;
  name: string;
  email: string;
  password: string;
  annotaions: [];
};

type ContextProps = {
  users: UserProps[];
  setUsers: (users: UserProps[]) => void;
};

export const NotionContextProvider = createContext<ContextProps>(
  {} as ContextProps,
);

function CreateContextProvider({ children }: IPropsContext) {
  const [users, setUsers] = useState<UserProps[]>([]);

  return (
    <NotionContextProvider.Provider value={{ users, setUsers }}>
      {children}
    </NotionContextProvider.Provider>
  );
}

export default CreateContextProvider;
