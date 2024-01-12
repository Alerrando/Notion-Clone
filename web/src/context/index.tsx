import React, { createContext, useContext, useState } from "react";
import uuid from "react-uuid";
import { routesRole } from "../routes";
import { AnnotationType, RouterRole, UserDTOProps, UserProps } from "./types";

type IPropsContext = {
  children: React.ReactNode;
};

export const UserValueDefault: UserProps = {
  id: "",
  name: "",
  email: "",
  password: "",
  annotations: [
    {
      id: uuid(),
      title: "Começando com o Notion",
      content: `
            <h1>Começando com o Notion</h1>
            <ul>
            <li><input type="checkbox"> Digite ****/**** para ver os tipos de conteúdo que você pode adicionar: títulos, vídeos, sub-páginas, etc.</li>
            </ul>

            <p>Primeiro, o básico:</p>

            <ul>
                <li><input type="checkbox"> Clique em qualquer lugar e comece a digitar</li>
                <li><input type="checkbox"> Destaque qualquer texto e use o menu pop-up para <strong>estilizar</strong> <em>sua</em> <del>escrita</del> <code>como</code> você preferir</li>
                <li><input type="checkbox"> Passou o mouse e viu o ícone <strong>⋮⋮</strong> ao lado da caixa de seleção? Pode clicar nele e arrastar para mover uma linha</li>
                <li><input type="checkbox"> Clique no botão <strong>+ Nova Página</strong> na parte de baixo da barra lateral para criar uma página</li>
                <li><input type="checkbox"> Clique em <strong>Modelos</strong> na barra lateral para começar a usar páginas pré-prontas</li>
                <li>
                    <input type="checkbox"> Este é um bloco alternante. Clique no triângulo ao lado para ver mais dicas!
                    <ul>
                        <li><a href="https://www.notion.so/templates">notion.com/templates</a>: Mais modelos criados pela comunidade Notion</li>
                        <li><a href="https://www.notion.so/help">notion.com/help</a>: Guias e respostas sobre tudo no Notion</li>
                        <li><a href="http://notion.com/guides">notion.com/guides</a>: Veja tutoriais em vídeo e texto para se tornar um especialista em Notion</li>
                    </ul>
                </li>
            </ul>

            <p>👉 Ficou com alguma dúvida? Clique no <code>?</code> ao final da página para ver mais tutoriais ou para entrar em contato</p>
      `,
      createdBy: new Date(),
      lastUpdate: new Date(),
    },
    {
      id: uuid(),
      title: "Começando com o Notion 2",
      content: `
            <h1>Começando com o Notion 2</h1>
            <p>Primeiro, o básico:</p>
            <p>👉 Ficou com alguma dúvida? Clique no <code>?</code> ao final da página para ver mais tutoriais ou para entrar em contato</p>
      `,
      createdBy: new Date(),
      lastUpdate: new Date(),
    },
  ],
  role: "ADMIN",
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
  verifyRoleUser: () => void;
  updateUserAnnotation: (
    newAnnotation: AnnotationType,
    isNewAnnotation: boolean,
    annotationsAllUser?: AnnotationType[],
  ) => void;
};

export const StoreContext = createContext<ContextProps>({} as ContextProps);

export function UseNotionContext({ children }: IPropsContext) {
  const [usersAll, setUsersAll] = useState<UserProps[]>([]);
  const [user, setUser] = useState<UserDTOProps>(userDTOValuesDefault);

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

  function updateUserAnnotation(
    newAnnotation?: AnnotationType,
    isNewAnnotation: boolean,
    annotationsAllUser?: AnnotationType[],
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

  return (
    <StoreContext.Provider value={{ usersAll, setUsersAll, user, setUser, verifyRoleUser, updateUserAnnotation }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(StoreContext);

  return context;
}
