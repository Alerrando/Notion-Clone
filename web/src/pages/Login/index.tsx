import { FormLogin } from "./FormLogin";

export function Login() {
  return (
    <main className="md:h-screen bg-[#f5f5f5] grid grid-rows-[35%_75%] md:grid-cols-[60%_40%] md:grid-rows-none overflow-y-auto">
      <div className="h-full md:h-5/6 w-full flex items-center justify-center mb-auto">
        <img src="aside-login.jpg" alt="" className="h-full w-full bg-cover" />
      </div>
      <FormLogin />
    </main>
  );
}
