import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { Aside } from "./components/Aside";
import { Editor } from "./components/Editor";

export const menuValuesDefault = {
  valueMenuOff: "w-12",
  valueMenuOn: "w-64",
};

export function App() {
  const [menu, setMenu] = useState<string>(menuValuesDefault.valueMenuOff);

  return (
    <div className="min-h-screen flex items-center justify-center text-zinc-50 bg-white dark:bg-[#2e2e2f]">
      <div className="bg-zinc-100 dark:bg-zinc-800 md:bg-zinc-100 md:dark:bg-zinc-700 w-full md:w-11/12 h-screen md:h-[calc(100vh_-_16px)] mx-auto md:rounded-xl shadow-sm border-black/20 overflow-hidden grid grid-rows-[32px,97vh] md:grid-rows-none md:grid-cols-[16rem_1fr]">
        <div className="w-screen md:w-64 h-screen md:h-full fixed md:relative flex items-start justify-start bg-modal md:bg-zinc-100 md:dark:bg-zinc-800 z-50">
          <div
            className={twMerge(
              "w-12 h-full bg-zinc-100 dark:bg-zinc-800 overflow-y-auto overflow-x-hidden",
              menu,
            )}
          >
            <Aside menu={menu} setMenu={setMenu} />
          </div>
        </div>

        <main className="py-4 md:p-4 bg-zinc-100 dark:bg-zinc-800 overflow-y-auto">
          <Editor />
        </main>
      </div>
    </div>
  );
}
