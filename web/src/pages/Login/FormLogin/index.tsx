import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { AiFillFacebook, AiFillLinkedin, AiOutlineGoogle, AiOutlineMail } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";
import { MdOutlineErrorOutline, MdPassword } from "react-icons/md";
import { SiNotion } from "react-icons/si";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Toaster, toast } from "sonner";
import { z } from "zod";
import { getLogin } from "../../../api";
import { useAuth } from "../../../context";
import { ResponseUser, ToastMessageData, UserDTOProps } from "../../../context/types";
import { styleToast } from "../../../util";

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
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async (data) => await getLogin(data),
    onSuccess: (data) => {
      if (!(data instanceof AxiosError)) {
        const response = data as ResponseUser;

        const aux: UserDTOProps = {
          annotations: response.data.annotations,
          role: response.data.role,
        };
        setUser(aux);

        const userAnnotationId = response.data.annotations[0].id;

        setTimeout(() => {
          navigate(`/editor/${userAnnotationId}`);
        }, 5000);
      }

      console.log(data);
      toastMessageLogin(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

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

      <Toaster />
    </div>
  );

  async function submit(dataLogin: CreateFormLoginData) {
    mutation.mutate(dataLogin);
  }

  function toastMessageLogin(message: ResponseUser | AxiosError) {
    const toastMessage: ToastMessageData = {
      message: !(message instanceof AxiosError)
        ? "Login feito com sucesso, Você será redirecionado!"
        : message.response?.data,
      status: !(message instanceof AxiosError) ? "success" : "error",
    };
    toast(toastMessage.message, {
      type: toastMessage.status,
      position: "bottom-left",
      duration: 80000,
      icon: toastMessage.status === "success" ? <FaCheck size={18} /> : <MdOutlineErrorOutline size={18} />,
      className: styleToast[toastMessage.status],
      action: { label: "X", onClick: () => {} },
    });
  }
}
