import { FormLogin } from "./FormLogin";

export function Login() {
  return (
    <main className="h-screen bg-[#f5f5f5] grid grid-cols-[60%_40%]">
      <div className="h-5/6 w-full flex items-center justify-center mb-auto">
        <img src="aside-login.jpg" alt="" className="h-full w-full bg-cover" />
      </div>
      <FormLogin />
    </main>
  );
}
