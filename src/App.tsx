import { Aside } from "./components/Aside";
import { Editor } from "./components/Editor";

export function App() {
  return (
    <div className="min-h-screen flex items-center justify-center text-zinc-50">
      <div className="bg-zinc-800 w-full mx-auto rounded-xl min-h-[720px] shadow-sm border-black/20 overflow-hidden md:grid md:grid-cols-[16rem_1fr]">
        <aside className="bg-zinc-900 border-r border-r-zinc-700 p-4">
          <Aside />
        </aside>

        <main className="p-4">
          <Editor />
        </main>
      </div>
    </div>
  );
}
