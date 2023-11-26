import { createContext } from "react";
import uuid from "react-uuid";
import { GetState, SetState, StoreApiWithPersist, create } from "zustand";
import { persist } from "zustand/middleware";
import { createEventLog } from "../api";
import { routesRole } from "../routes";
import { AnnotationType, EventLog, RouterRole, UserDTOProps, UserProps } from "./typesContext";

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

const annotationCurrentValuesDefault: AnnotationType = {
  id: "",
  content: "",
  createdBy: new Date(),
  lastUpdate: new Date(),
  title: "",
};

const UserDTOValuesDefault: UserDTOProps = {
  id: "",
  role: "",
  annotations: [],
  token: "",
};

export type ContextProps = {
  user: UserDTOProps;
  setUser: (user: UserDTOProps) => void;
  annotationCurrent: AnnotationType;
  setAnnotationCurrent: (annotationCurrent: AnnotationType) => void;
  EventLogRegister: (data: UserProps, eventTypeData: string, eventDetailsData: string) => void;
  verifyRoleUser: () => void;
};

const StoreContext = createContext<StoreApiWithPersist<ContextProps>>({} as StoreApiWithPersist<ContextProps>);

export const useNotionContext = create<
  ContextProps,
  SetState<ContextProps>,
  GetState<ContextProps>,
  StoreApiWithPersist<ContextProps>
>(
  persist<ContextProps>(
    (set: ContextProps) => ({
      user: UserDTOValuesDefault,
      setUser: (user: UserDTOProps) => set((state: ContextProps) => (state.user = user)),

      annotationCurrent: annotationCurrentValuesDefault,
      setAnnotationCurrent: (annotationCurrent: AnnotationType) =>
        set((state: ContextProps) => (state.annotationCurrent = annotationCurrent)),

      EventLogRegister: async (data: UserProps, eventTypeData: string, eventDetailsData: string) => {
        await createEventLogRegister(data, eventTypeData, eventDetailsData);
      },
      verifyRoleUser: () =>
        set((state: ContextProps) => {
          const pathName = window.location.pathname;
          if (pathName !== "/") {
            routesRole.forEach((route: RouterRole) => {
              if (pathName === route.path && route.role !== state.user.role) {
                window.location.href = "/";
              }
            });
          }
        }),
    }),
    {
      name: "user-notion",
      getStorage: () => localStorage,
    },
  ),
);

async function createEventLogRegister(data: UserProps, eventTypeData: string, eventDetailsData: string) {
  const dataLog: EventLog = {
    id: "0",
    user: data,
    timestamp: Date.now(),
    eventType: eventTypeData,
    eventDetails: eventDetailsData,
  };

  await createEventLog(dataLog);
}

function StoreProvider({ children }) {
  return <StoreContext.Provider value={useNotionContext}>{children}</StoreContext.Provider>;
}

export { StoreContext, StoreProvider };
