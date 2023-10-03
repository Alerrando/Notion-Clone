import { useState } from "react";
import { FormLogin } from "./FormLogin";
import { FormRegister } from "./FormRegister";
import "./style.css";

export function Login() {
  const [pages, setPages] = useState<boolean>(false);
  const [animationClass, setAnimationClass] = useState<string>("");

  return (
    <main
      className={`md:h-screen bg-[#f5f5f5] grid grid-rows-[35%_75%] ${
        !pages ? "md:grid-cols-[60%_40%]" : "md:grid-cols-[40%_60%]"
      } md:grid-rows-none overflow-y-auto overflow-x-hidden ${animationClass}`}
    >
      <div className={`h-full md:h-5/6 w-full flex items-center justify-center my-auto ${pages && "order-1"}`}>
        <img
          src={!pages ? "aside-login-princ.png" : "aside-register-princ.png"}
          alt=""
          className="h-full w-full bg-cover"
        />
      </div>
      {!pages ? <FormLogin setPages={handleTogglePages} /> : <FormRegister setPages={handleTogglePages} />}
    </main>
  );

  function handleTogglePages() {
    setAnimationClass(!pages ? "slide-left" : "slide-right");
    setPages(!pages);
  }
}
