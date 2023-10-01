import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  AiFillFacebook,
  AiFillLinkedin,
  AiOutlineGoogle,
  AiOutlineMail,
} from "react-icons/ai";
import { MdPassword } from "react-icons/md";
import { SiNotion } from "react-icons/si";
import { Link } from "react-router-dom";
import { z } from "zod";

const createFormSchema = z.object({
  email: z.string().email().nonempty("Digite seu email"),
  password: z.string().min(3).nonempty("Digite seu senha"),
});

export type CreateFormLoginData = z.infer<typeof createFormSchema>;

type FormLoginProps = {
  setPages: () => void;
};

export function FormLogin({ setPages }: FormLoginProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateFormLoginData>({
    resolver: zodResolver(createFormSchema),
  });
  return (
    <div className="h-max md:h-screen w-full flex items-center justify-center">
      <section className="h-full md:h-4/5 w-11/12 md:w-4/5 mx-auto">
        <header className="w-full flex flex-col text-center justify-center">
          <div className="w-full flex flex-row items-center justify-center gap-4">
            <SiNotion className="w-8 h-8 md:w-9 md:h-9" />
            <h1 className="text-2xl md:text-4xl font-bold">Login</h1>
          </div>

          <h2>Bem Vindo de volta!</h2>
        </header>

        <form
          className="h-full py-8 md:py-16 flex flex-col gap-4"
          onSubmit={handleSubmit(submit)}
        >
          <div className="w-full h-auto flex flex-col gap-4 md:gap-8">
            <div className="w-full flex flex-col gap-1">
              <span className="text-base md:text-lg font-bold">Email</span>
              <div className="flex flex-row items-center gap-4 border rounded-lg px-2 py-2">
                <AiOutlineMail size={24} />
                <input
                  type="text"
                  className="w-full h-full bg-transparent border-none outline-none"
                  placeholder="Digite seu e-mail"
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <span className="text-red-600">{errors.email.message}</span>
              )}
            </div>

            <div className="w-full flex flex-col gap-1">
              <span className="text-base md:text-lg font-bold">Senha</span>
              <div className="flex flex-row items-center gap-4 border rounded-lg px-2 py-2">
                <MdPassword size={24} />
                <input
                  type="password"
                  className="w-full h-full bg-transparent border-none outline-none"
                  placeholder="Digite seu senha"
                  {...register("password")}
                />
              </div>
              {errors.password && (
                <span className="text-red-600">{errors.password.message}</span>
              )}
            </div>
          </div>

          <div className="w-full flex items-center justify-end">
            <Link
              to="/"
              className="text-sm font-semibold text-sky-500 cursor-pointer hover:underline hover:underline-offset-2"
            >
              Esqueceu a senha?
            </Link>
          </div>

          <div className="w-full flex items-center justify-start">
            <button
              type="submit"
              className="w-full h-auto border border-green-600 px-12 py-2 text-green-600 rounded-xl hover:bg-green-600 hover:text-white transition-all"
            >
              <span className="text-base md:text-lg font-bold">Logar</span>
            </button>
          </div>

          <div className="w-full flex flex-row gap-1 items-center justify-start">
            <span className="text-sm">Ainda não tem conta?</span>
            <div
              onClick={() => setPages()}
              className="text-sm font-bold text-blue-800 cursor-pointer hover:underline hover:underline-offset-2"
            >
              Crie aqui
            </div>
          </div>

          <div className="w-full h-auto flex items-center justify-center py-2 relative">
            <div className="w-full flex items-center justify-between mx-auto">
              <div className="w-min h-full border-[1px] py-2 px-12 rounded-xl hover:text-[#4285F4] cursor-pointer">
                <AiOutlineGoogle size={24} />
              </div>

              <div className="w-min h-full border-[1px] py-2 px-12 rounded-xl hover:text-[#4285F4] cursor-pointer">
                <AiFillLinkedin size={24} />
              </div>

              <div className="w-min h-full border-[1px] py-2 px-12 rounded-xl hover:text-[#4285F4] cursor-pointer">
                <AiFillFacebook size={24} />
              </div>
            </div>
          </div>
        </form>
      </section>
    </div>
  );

  function submit(data: CreateFormLoginData) {
    console.log(data);
  }
}
