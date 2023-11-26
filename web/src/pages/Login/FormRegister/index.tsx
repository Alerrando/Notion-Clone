import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { AiFillFacebook, AiFillLinkedin, AiOutlineGoogle, AiOutlineMail } from "react-icons/ai";
import { IoPersonOutline } from "react-icons/io5";
import { MdPassword } from "react-icons/md";
import { SiNotion } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { z } from "zod";
import { createRegister } from "../../../api";
import { UserValueDefault } from "../../../context";
import { ToastMessageData, TokenUser, UserProps } from "../../../context/typesContext";
import { useGlobalStore } from "../../../context/useGlobalStore";

const createFormSchema = z.object({
  name: z.string().nonempty("Digite seu nome"),
  email: z.string().email().nonempty("Digite seu email"),
  password: z.string().min(3).nonempty("Digite seu senha"),
});

export type CreateFormRegisterData = z.infer<typeof createFormSchema>;

type FormRegisterProps = {
  setPages: () => void;
};

export function FormRegister({ setPages }: FormRegisterProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateFormRegisterData>({
    resolver: zodResolver(createFormSchema),
  });
  const { setUser, setAnnotationCurrent } = useGlobalStore();
  const navigate = useNavigate();

  return (
    <div className="h-max md:h-screen w-full flex items-center justify-center">
      <section className="h-full md:h-4/5 w-11/12 md:w-4/5 mx-auto">
        <header className="w-full flex flex-col text-center justify-center">
          <div className="w-full flex flex-row items-center justify-center gap-4 text-black dark:text-white">
            <SiNotion className="w-8 h-8 md:w-9 md:h-9" />
            <h1 className="text-2xl md:text-4xl font-bold">Registrar-se</h1>
          </div>

          <h2 className="text-black dark:text-white">Crie sua conta!</h2>
        </header>

        <form className="h-full py-6 flex flex-col gap-4" onSubmit={handleSubmit(submit)}>
          <div className="w-full h-auto flex flex-col gap-4 md:gap-6">
            <div className="w-full flex flex-col gap-1">
              <span className="text-base md:text-lg font-bold text-black dark:text-white">Nome</span>
              <div className="flex flex-row items-center gap-4 border border-zinc-400 rounded-lg px-2 py-2 text-black dark:text-white">
                <IoPersonOutline size={24} />
                <input
                  type="text"
                  className="w-full h-full bg-transparent border-none outline-none"
                  placeholder="Digite seu nome"
                  {...register("name")}
                />
              </div>
              {errors.email && <span className="text-red-600">{errors.email.message}</span>}
            </div>

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

          <div className="w-full flex items-center justify-start pt-4">
            <button
              type="submit"
              className="w-full h-auto border border-green-600 text-green-600 dark:border-green-400 dark:text-green-400 px-12 py-2 rounded-xl hover:bg-green-600 dark:hover:bg-green-400 hover:text-white transition-all"
            >
              <span className="text-base md:text-lg font-bold">Registrar</span>
            </button>
          </div>

          <div className="w-full flex flex-row gap-1 items-center justify-start">
            <span className="text-sm text-black dark:text-white">Já tem uma conta?</span>
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

      <ToastContainer />
    </div>
  );

  async function submit(data: CreateFormRegisterData) {
    const { ...rest } = data;
    const infoUserValues: UserProps = {
      ...UserValueDefault,
      ...rest,
    };

    const responseRegister: TokenUser | AxiosError = await createRegister(infoUserValues);
    if (!(responseRegister instanceof AxiosError)) {
      setUser({
        id: responseRegister.data.user.id,
        annotations: responseRegister.data.user.annotations,
        role: responseRegister.data.user.role,
        token: responseRegister.data.token,
      });

      setAnnotationCurrent(responseRegister.data.user.annotations[0]);
      setTimeout(() => {
        navigate(`/editor/${responseRegister.data.user.annotations[0].id}`);
      }, 5000);
    }

    toastMessage(responseRegister);
  }
}

function toastMessage(aux: TokenUser | AxiosError) {
  const toastMessage: ToastMessageData = {
    message: !(aux instanceof AxiosError)
      ? "Você foi cadastrado com sucesso, Você será redirecionado!"
      : aux.response?.data,
    status: !(aux instanceof AxiosError) ? "success" : "error",
  };
  toast[toastMessage.status](toastMessage.message, {
    position: "bottom-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
}
