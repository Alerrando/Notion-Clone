import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { Aside } from "./components/Aside";
import { Editor } from "./components/Editor";

export function App() {
  const [menu, setMenu] = useState<boolean>(false);

  return (
    <div className="min-h-screen flex items-center justify-center text-zinc-50">
      <div className="bg-zinc-600 dark:bg-zinc-800 md:bg-white md:dark:bg-zinc-700 w-full md:w-11/12 h-screen md:h-[calc(100vh_-_16px)] mx-auto md:rounded-xl shadow-sm border-black/20 overflow-hidden grid grid-rows-[32px,97vh] md:grid-rows-none md:grid-cols-[16rem_1fr]">
        {menu ? (
          <div className="w-screen md:w-full h-screen fixed md:relative flex items-start justify-start bg-modal md:bg-transparent z-50">
            <div className="w-64 h-full bg-zinc-600 dark:bg-zinc-800">
              <Aside setMenu={setMenu} />
            </div>
          </div>
        ) : (
          <div className="w-full h-7 md:h-full flex items-start justify-start py-2 px-4 md:p-4 bg-zinc-600 dark:bg-zinc-800">
            <FiMenu
              className="w-7 h-7 cursor-pointer"
              onClick={() => setMenu(true)}
            />
          </div>
        )}

        <main className="py-4 md:p-4 bg-zinc-600 dark:bg-zinc-800 overflow-y-auto">
          <Editor />
        </main>
      </div>
    </div>
  );
}
