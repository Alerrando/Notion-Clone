import {
  AiOutlineDoubleLeft,
  AiOutlineDoubleRight,
  AiOutlineSearch,
} from "react-icons/ai";
import { BiTime } from "react-icons/bi";
import { FiMenu } from "react-icons/fi";
import { GoGear } from "react-icons/go";
import { twMerge } from "tailwind-merge";
import { menuValuesDefault } from "../App";

type AsideProps = {
  menu: string;
  setMenu: (menu: string) => void;
};

export function Aside({ menu, setMenu }: AsideProps) {
  return (
    <>
      <div className="flex h-full flex-col justify-between border-e border-zinc-500">
        <div className="h-2/3 flex flex-col gap-6 py-6">
          <div
            className={twMerge(
              "w-full px-4",
              menu === "w-12" ? "invisible" : "visible",
            )}
          >
            <div className="w-min flex gap-2 group">
              <button className="w-3 h-3 rounded-full bg-zinc-300  group-hover:bg-red-400"></button>
              <button className="w-3 h-3 rounded-full bg-zinc-300  group-hover:bg-yellow-400"></button>
              <button className="w-3 h-3 rounded-full bg-zinc-300  group-hover:bg-green-400"></button>
            </div>
          </div>

          <ul className="h-full w-full flex flex-col gap-4 text-black dark:text-white">
            <li className="w-full flex flex-row gap-2 items-center py-[6px] px-4 rounded-md cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-600">
              <AiOutlineSearch className="min-w-[24px] min-h-[24px]" />
              <span className="text-sm">Pesquisar</span>
            </li>

            <li className="w-full flex flex-row gap-2 items-center py-[6px] px-4 rounded-md cursor-pointer  dark:hover:bg-zinc-600">
              <BiTime className="min-w-[24px] min-h-[24px]" />
              <span className="text-sm">Mundaças Recentes</span>
            </li>

            <li className="w-full flex flex-row gap-2 items-center py-[6px] px-4 rounded-md cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-600">
              <GoGear className="min-w-[24px] min-h-[24px]" />
              <span className="text-sm">Configurações</span>
            </li>
          </ul>
        </div>

        <div className="md:hidden w-full h-7 flex items-start justify-start py-2 px-4 bg-zinc-100 dark:bg-zinc-800">
          <FiMenu className="w-7 h-7 cursor-pointer text-black dark:text-white" />
        </div>

        <div className="hidden w-full h-7 md:h-full md:flex items-end justify-end py-8 px-4 bg-zinc-100 dark:bg-zinc-800">
          {menu === "w-12" ? (
            <AiOutlineDoubleLeft
              className="min-w-[24px] min-h-[24px] cursor-pointer text-black dark:text-white"
              onClick={() => setMenu(menuValuesDefault.valueMenuOn)}
            />
          ) : (
            <AiOutlineDoubleRight
              className="min-w-[24px] min-h-[24px] cursor-pointer text-black dark:text-white"
              onClick={() => setMenu(menuValuesDefault.valueMenuOff)}
            />
          )}
        </div>
      </div>
    </>
  );
}
