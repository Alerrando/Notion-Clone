import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AiFillFacebook, AiFillLinkedin, AiOutlineGoogle, AiOutlineMail } from "react-icons/ai";
import { MdOutlineErrorOutline, MdPassword } from "react-icons/md";
import { SiNotion } from "react-icons/si";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useAuth } from "../../../context";
import { UserDTOProps, UserProps } from "../../../context/types";
import { FaCheck } from "react-icons/fa";
import { styleToast } from "../../../util";
import { Toaster, toast } from "sonner";

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
  const { usersAll, setUser } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="h-max md:h-screen w-full flex items-center justify-center">
      <section className="h-full md:h-4/5 w-11/12 md:w-4/5 mx-auto">
        <header className="w-full flex flex-col text-center justify-center">
          <div className="w-full flex flex-row items-center justify-center gap-4 text-black dark:text-white">
            <SiNotion className="w-8 h-8 md:w-9 md:h-9" />
            <h1 className="text-2xl md:text-4xl font-bold">Login</h1>
          </div>

          <h2 className="text-black dark:text-white">Bem Vindo de volta!</h2>
        </header>

        <form className="h-full py-8 md:py-16 flex flex-col gap-4" onSubmit={handleSubmit(submit)}>
          <div className="w-full h-auto flex flex-col gap-4 md:gap-8">
            <div className="w-full flex flex-col gap-1">
              <span className="text-base md:text-lg font-bold text-black dark:text-white">Email</span>
              <div className="flex flex-row items-center gap-4 border border-zinc-400 rounded-lg px-2 py-2 text-black dark:text-white">
                <AiOutlineMail size={24} />
                <input
                  type="text"
                  className="w-full h-full bg-transparent border-none outline-none"
                  placeholder="Digite seu e-mail"
                  {...register("email")}
                />
              </div>
              {errors.email && <span className="text-red-600">{errors.email.message}</span>}
            </div>

            <div className="w-full flex flex-col gap-1">
              <span className="text-base md:text-lg font-bold text-black dark:text-white">Senha</span>
              <div className="flex flex-row items-center gap-4 border border-zinc-400 rounded-lg px-2 py-2 text-black dark:text-white">
                <MdPassword size={24} />
                <input
                  type="password"
                  className="w-full h-full bg-transparent border-none outline-none"
                  placeholder="Digite seu senha"
                  {...register("password")}
                />
              </div>
              {errors.password && <span className="text-red-600">{errors.password.message}</span>}
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
              className="w-full h-auto border border-green-600 text-green-600 dark:border-green-400 dark:text-green-400 px-12 py-2 rounded-xl hover:bg-green-600 dark:hover:bg-green-400 hover:text-white transition-all"
            >
              <span className="text-base md:text-lg font-bold">Logar</span>
            </button>
          </div>

          <div className="w-full flex flex-row gap-1 items-center justify-start">
            <span className="text-sm text-black dark:text-white">Ainda não tem conta?</span>
            <div
              onClick={() => setPages()}
              className="text-sm font-bold text-blue-800 dark:text-blue-400 cursor-pointer hover:underline hover:underline-offset-2"
            >
              Crie aqui
            </div>
          </div>

          <div className="w-full h-auto flex items-center justify-center py-2 relative">
            <div className="w-full flex items-center justify-between mx-auto">
              <div className="w-min h-full border-[1px] py-2 px-12 rounded-xl hover:text-[#4285F4] cursor-pointer text-black dark:text-white">
                <AiOutlineGoogle size={24} />
              </div>

              <div className="w-min h-full border-[1px] py-2 px-12 rounded-xl hover:text-[#4285F4] cursor-pointer text-black dark:text-white">
                <AiFillLinkedin size={24} />
              </div>

              <div className="w-min h-full border-[1px] py-2 px-12 rounded-xl hover:text-[#4285F4] cursor-pointer text-black dark:text-white">
                <AiFillFacebook size={24} />
              </div>
            </div>
          </div>
        </form>
      </section>

      <Toaster position="bottom-left" />
    </div>
  );

  async function submit(dataLogin: CreateFormLoginData) {
    const aux: UserDTOProps | undefined = usersAll.find(
      (user: UserProps) => user.email === dataLogin.email && user.password === dataLogin.password,
    );
    if (aux) {
      setUser(aux);

      localStorage.setItem("user-notion", aux.id);
      const userAnnotationId = aux.annotations[0].id;

      setTimeout(() => {
        navigate(`/editor/${userAnnotationId}`);
      }, 5000);
    }

    toastMessageLogin(aux);
  }

  function toastMessageLogin(message: UserDTOProps | undefined) {
    const toastMessage: { message: string; status: "success" | "error" } = {
      message: message
        ? "Login feito com sucesso, Você será redirecionado!"
        : "Erro ao fazer login, confira os dados novamente",
      status: message ? "success" : "error",
    };

    toast(toastMessage.message, {
      position: "bottom-left",
      duration: 80000,
      icon: toastMessage.status === "success" ? <FaCheck size={18} /> : <MdOutlineErrorOutline size={18} />,
      className: styleToast[toastMessage.status],
      action: { label: "X", onClick: () => {} },
    });
  }
}
