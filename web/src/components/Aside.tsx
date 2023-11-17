import { AiFillFolderOpen } from "react-icons/ai";
import { BiTime } from "react-icons/bi";
import { FiMenu } from "react-icons/fi";
import { GoGear } from "react-icons/go";

export function Aside() {
  return (
    <>
      <div className="w-full h-full group" activeClassName="">
        <FiMenu className="w-12 h-12 text-black p-2 cursor-pointer group-hover:invisible" />
        <div className="w-full h-full md:w-64 flex flex-col justify-between dark:bg-zinc-800 border-e border-zinc-500 transition-all duration-500 md:absolute md:top-0 md:-left-full group-hover:left-0">
          <div className="w-auto h-full flex flex-col gap-12 py-6 overflow-x-hidden">
            <div className="w-[95%] h-auto flex flex-row gap-4 items-center justify-between px-4">
              <div className="rounded-full cursor-pointer min-w-[2rem] min-h-[2rem] max-w-[2rem] max-h-[2rem]">
                <img src="user.svg" alt="avatar user" className="w-full h-full" />
              </div>

              <div className="w-min gap-2 group flex items-end">
                <button className="w-3 h-3 rounded-full bg-zinc-300  group-hover:bg-red-400"></button>
                <button className="w-3 h-3 rounded-full bg-zinc-300  group-hover:bg-yellow-400"></button>
                <button className="w-3 h-3 rounded-full bg-zinc-300  group-hover:bg-green-400"></button>
              </div>
            </div>

            <ul className="h-full w-full flex flex-col gap-4 text-black dark:text-white px-2">
              <li className="w-max md:w-full flex flex-row gap-2 items-center py-[6px] px-2 rounded-md cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-600">
                <AiFillFolderOpen className="min-w-[24px] min-h-[24px]" />
                <span className="text-sm">Arquivos</span>
              </li>

              <li className="w-max md:w-full flex flex-row gap-2 items-center py-[6px] px-2 rounded-md cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-600">
                <BiTime className="min-w-[24px] min-h-[24px]" />
                <span className="text-sm">Mundaças Recentes</span>
              </li>

              <li
                className={
                  "w-max md:w-full flex flex-row gap-2 items-center py-[6px] px-2 rounded-md cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-600"
                }
              >
                <GoGear className="min-w-[24px] min-h-[24px]" />
                <span className="text-sm">Configurações</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
