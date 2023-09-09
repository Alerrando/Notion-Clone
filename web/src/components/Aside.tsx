import { AiOutlineCloseCircle, AiOutlineSearch } from "react-icons/ai";
import { BiTime } from "react-icons/bi";
import { GoGear } from "react-icons/go";

interface AsideProps {
  setMenu: (menu: boolean) => void;
}

export function Aside({ setMenu }: AsideProps) {
  return (
    <>
      <div className="flex h-full flex-col justify-between border-e border-zinc-500">
        <div className="py-6">
          <div className="w-full flex items-center justify-between px-4">
            <div className="w-min flex gap-2 group">
              <button className="w-3 h-3 rounded-full bg-zinc-300  group-hover:bg-red-400"></button>
              <button className="w-3 h-3 rounded-full bg-zinc-300  group-hover:bg-yellow-400"></button>
              <button className="w-3 h-3 rounded-full bg-zinc-300  group-hover:bg-green-400"></button>
            </div>

            <AiOutlineCloseCircle
              className="w-7 h-7 cursor-pointer text-black dark:text-white"
              onClick={() => setMenu(false)}
            />
          </div>

          <ul className="w-full mt-6 space-y-1 text-black dark:text-white">
            <li className="w-full flex flex-row gap-2 items-center py-[6px] px-4 rounded-md cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-600">
              <AiOutlineSearch size={20} />
              <span className="text-sm">Pesquisar</span>
            </li>

            <li className="w-full flex flex-row gap-2 items-center py-[6px] px-4 rounded-md cursor-pointer  dark:hover:bg-zinc-600">
              <BiTime size={20} />
              <span className="text-sm">Mundaças Recentes</span>
            </li>

            <li className="w-full flex flex-row gap-2 items-center py-[6px] px-4 rounded-md cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-600">
              <GoGear size={20} />
              <span className="text-sm">Configurações</span>
            </li>
          </ul>
        </div>

        <div className="sticky inset-x-0 bottom-0 border-t border-gray-500">
          <a href="#" className="flex items-center gap-2 p-4 hover:bg-gray-50">
            <img
              alt="Man"
              src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              className="h-10 w-10 rounded-full object-cover"
            />

            <div>
              <p className="text-xs">
                <strong className="block font-medium text-black dark:text-white">
                  Eric Frusciante
                </strong>

                <span className="text-black dark:text-white">
                  {" "}
                  eric@frusciante.com{" "}
                </span>
              </p>
            </div>
          </a>
        </div>
      </div>
    </>
  );
}
