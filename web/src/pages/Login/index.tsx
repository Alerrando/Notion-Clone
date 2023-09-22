import { Aside } from "./Aside";
import { FormLogin } from "./FormLogin";

export function Login() {
  return (
    <main className="h-screen bg-[#f5f5f5] grid grid-cols-2">
      <Aside />
      <FormLogin />
    </main>
  );
}
