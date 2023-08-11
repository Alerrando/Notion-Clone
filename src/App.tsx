import { Aside } from "./components/Aside";
import { Editor } from "./components/Editor";

export function App() {
  return (
    <div className="min-h-screen flex items-center justify-center text-zinc-50">
      <div className="bg-white dark:bg-zinc-800 w-4/5 mx-auto rounded-xl h-[calc(100vh_-_16px)] shadow-sm border-black/20 overflow-hidden grid grid-cols-[16rem_1fr]">
        <aside className="bg-zinc-700 dark:bg-zinc-900 px-4">
          <Aside />
        </aside>

        <main className="p-4 bg-zinc-700 dark:bg-zinc-900">
          <Editor />
        </main>
      </div>
    </div>
  );
}
