# 📝 Clone do Notion

O **Clone do Notion** é uma réplica da popular ferramenta de produtividade Notion, desenvolvida com **ReactJS**, **TypeScript** e **Spring Boot**. Este projeto recria a interface e funcionalidades essenciais do Notion, permitindo que os usuários criem, editem e organizem notas e tarefas de forma eficiente.

O design é **minimalista e responsivo**, garantindo uma experiência de usuário semelhante à do aplicativo original. Este clone é uma excelente prática para entender a construção de aplicações complexas de produtividade.

---

## 🚀 Tecnologias Utilizadas

O projeto utiliza as seguintes tecnologias e bibliotecas:

### **Front-end (ReactJS + TypeScript)**

- **ReactJS** — Biblioteca principal para a interface de usuário
- **TypeScript** — Tipagem estática para segurança e escalabilidade do código
- **React Router** — Gerenciamento de rotas da aplicação
- **React Query (@tanstack/react-query)** — Gerenciamento de estado assíncrono e cache de dados
- **Zustand** — Gerenciamento de estado global
- **Jest e Testing Library** — Testes unitários e de componentes
- **TailwindCSS** — Estilização rápida e responsiva
- **Vite** — Build tool para desenvolvimento rápido
- **ESLint e Prettier** — Padronização e formatação do código
- **React Hook Form** — Gerenciamento de formulários eficiente
- **Radix UI** — Componentes acessíveis e estilizados
- **Tiptap** — Editor de texto avançado semelhante ao do Notion

### **Back-end (Spring Boot + Java)**

- **Spring Boot** — Framework para construção de APIs robustas e escaláveis
- **Spring Security** — Segurança e autenticação
- **Spring Data JPA** — Persistência de dados com banco de dados relacional
- **Spring Data MongoDB** — Integração com banco NoSQL
- **JWT (JSON Web Token)** — Autenticação baseada em tokens
- **WebSockets** — Comunicação em tempo real
- **JUnit & Mockito** — Testes automatizados

---

## 📂 Estrutura de Pastas

### **Front-end**
A estrutura do projeto segue a seguinte organização:

```
├── public --------- Arquivos estáticos
├── README.md
├── src
│   ├── api --------- Chamadas HTTP
│   ├── components --------- Componentes reutilizáveis
│   ├── context --------- Context API (Auth, temas, etc.)
│   ├── pages -------------- Páginas principais da aplicação
│   ├── tests -------------- Testes unitários e de componentes
│   └── util
│   ├   └── index.tsx ------- Funções utilitárias
│   ├── App.tsx
│   ├── main.tsx
│   ├── Routes.tsx ---------- Routing
│   ├── .gitignore       # Arquivos ignorados pelo Git
│   ├── index.html
│   ├── jest.config.js   # Configuração do Jest
│   ├── package.json     # Dependências do projeto
│   ├── vite.config.ts   # Configuração do Vite
│   └── tailwind.config.js ----- Configuração completa do tema, cores, fontes etc.
```


---

## 🔧 Instalação e Execução

Siga os passos abaixo para rodar o projeto localmente:

1. **Clone o repositório:**
    ```bash
     git clone https://github.com/seu-usuario/clone-do-notion.git
    cd clone-do-notion
    ```

2. **Instale as dependências:**
   ```bash
    npm install
   ```

3. **Execute o ambiente de desenvolvimento:**
   ```bash
    npm run dev
   ```

4. **Acesse no navegador:**
   ```bash
    http://localhost:5173
   ```

## ✅ Testes

Para rodar os testes do projeto, utilize o seguinte comando:
```bash
npm run test
```

## 📜 Principais Funcionalidades

Para rodar os testes do projeto, utilize o seguinte comando:
<ul>
<li>Criar e organizar notas e tarefas</li>
<li>Interface minimalista e intuitiva</li>
<li>Autenticação de usuário (em progresso)</li>
<li>Editor de texto avançado com suporte a formatação (Tiptap)</li>
<li>Design responsivo com TailwindCSS</li>
<li>Armazenamento de dados temporário usando Zustand</li>
<li>Comunicação em tempo real com WebSockets (futuro)</li>
</ul>

## 📄 Licença

Este projeto é licenciado sob a MIT License - veja o arquivo LICENSE para mais detalhes.