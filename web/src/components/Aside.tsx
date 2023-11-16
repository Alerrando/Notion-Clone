import { useState } from "react";
import { AiFillFolderOpen, AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import { BiTime } from "react-icons/bi";
import { GoGear } from "react-icons/go";
import { twMerge } from "tailwind-merge";

export const menuValuesDefault = {
  valueMenuOff: "w-16",
  valueMenuOn: "w-64",
};

export function Aside() {
  const [menu, setMenu] = useState<string>(menuValuesDefault.valueMenuOff);

  return (
    <>
      <div
        className={twMerge(
          "w-full h-full flex flex-col justify-between dark:bg-zinc-800 border-e border-zinc-500 transition-all duration-1000",
          menu === "w-16" ? "w-16" : "w-64",
        )}
      >
        <div className="w-auto h-full flex flex-col gap-12 py-6 overflow-x-hidden">
          <div
            className={twMerge(
              "w-full h-auto flex flex-row gap-4 items-center justify-between",
              menu === "w-16" ? "px-0" : "px-2",
            )}
          >
            <div
              className={twMerge(
                "rounded-full cursor-pointer",
                menu === "w-16" ? "w-full flex justify-center" : "min-w-[2rem] min-h-[2rem] max-w-[2rem] max-h-[2rem]",
              )}
            >
              <img src="user.svg" alt="avatar user" className={menu === "w-16" ? "w-8 h-w-8" : "w-full h-full"} />
            </div>

            <div className={twMerge("w-min gap-2 group", menu === "w-16" ? "hidden" : "flex items-end")}>
              <button className="w-3 h-3 rounded-full bg-zinc-300  group-hover:bg-red-400"></button>
              <button className="w-3 h-3 rounded-full bg-zinc-300  group-hover:bg-yellow-400"></button>
              <button className="w-3 h-3 rounded-full bg-zinc-300  group-hover:bg-green-400"></button>
            </div>
          </div>

          <ul className="h-full w-full flex flex-col gap-4 text-black dark:text-white">
            <li className="w-max flex flex-row gap-2 items-center py-[6px] px-4 rounded-md cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-600">
              <AiFillFolderOpen className="min-w-[24px] min-h-[24px]" />
              <span className={twMerge("text-sm", menu === "w-16" && "invisible")}>Arquivos</span>
            </li>

            <li className="w-max flex flex-row gap-2 items-center py-[6px] px-4 rounded-md cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-600">
              <BiTime className="min-w-[24px] min-h-[24px]" />
              <span className={twMerge("text-sm", menu === "w-16" && "invisible")}>Mundaças Recentes</span>
            </li>

            <li
              className={
                "w-max flex flex-row gap-2 items-center py-[6px] px-4 rounded-md cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-600"
              }
            >
              <GoGear className="min-w-[24px] min-h-[24px]" />
              <span className={twMerge("text-sm", menu === "w-16" && "invisible")}>Configurações</span>
            </li>
          </ul>
        </div>

        <div className="hidden w-full h-7 md:h-full md:flex items-end justify-end py-8 px-4 bg-zinc-100 dark:bg-zinc-800">
          {menu === "w-16" ? (
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
