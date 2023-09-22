import { AiOutlineMail } from "react-icons/ai";
import { MdPassword } from "react-icons/md";
import { SiNotion } from "react-icons/si";

export function FormLogin() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <section className="h-4/5 w-full px-6">
        <header className="w-full flex flex-col text-center justify-center relative before:block before:absolute before:-bottom-6 before:w-full before:border before:border-b">
          <div className="w-full flex flex-row items-center justify-center gap-4">
            <SiNotion size={36} />
            <h1 className="text-4xl font-bold">Login</h1>
          </div>

          <h2>Bem Vindo de volta!</h2>
        </header>

        <form action="" className="h-full py-24 flex flex-col gap-8">
          <div className="w-full h-auto flex flex-col gap-1">
            <span className="text-lg font-bold">Email</span>
            <div className="flex flex-row items-center gap-4 border rounded-lg px-2 py-2">
              <AiOutlineMail size={24} />
              <input
                type="text"
                className="w-full h-full bg-transparent border-none outline-none"
                placeholder="Digite seu e-mail"
              />
            </div>
          </div>

          <div className="w-full h-auto flex flex-col gap-1">
            <span className="text-lg font-bold">Senha</span>
            <div className="flex flex-row items-center gap-4 border rounded-lg px-2 py-2">
              <MdPassword size={24} />
              <input
                type="password"
                className="w-full h-full bg-transparent border-none outline-none"
                placeholder="Digite seu e-mail"
              />
            </div>
          </div>

          <div className="w-full flex items-center justify-center">
            <button
              type="submit"
              className="w-auto h-auto border border-green-600 px-12 py-2 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition-all"
            >
              <span className="text-lg font-bold">Logar</span>
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
