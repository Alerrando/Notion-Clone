import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Aside } from "./components/Aside";
import { Editor } from "./components/Editor";

export function App() {
  return (
    <div className="min-h-screen flex items-center justify-center text-zinc-50 bg-white dark:bg-[#2e2e2f] overflow-y-auto">
      <div className="w-full h-screen flex flex-row md:grid md:grid-cols-[16rem_1fr] bg-zinc-100 dark:bg-zinc-800 md:bg-zinc-100 md:dark:bg-zinc-700 mx-auto md:rounded-xl shadow-sm border-black/20 overflow-hidden">
        <aside className="w-12 md:w-64 h-full relative md:static flex items-start justify-start bg-modal md:bg-zinc-100 md:dark:bg-zinc-800 z-50">
          <div className="w-full h-full bg-zinc-100 dark:bg-[#2e2e2f] md:overflow-y-auto md:overflow-x-hidden duration-1000">
            <Aside />
          </div>
        </aside>

        <main className="w-full h-full py-4 md:p-4 bg-zinc-100 dark:bg-[#2e2e2f] overflow-y-auto">
          <Editor />
        </main>
      </div>

      <ToastContainer />
    </div>
  );
}
