import React, { useState } from "react";
import { AiFillFolderOpen, AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import { BiTime } from "react-icons/bi";
import { GoGear } from "react-icons/go";
import { twMerge } from "tailwind-merge";

export const menuValuesDefault = {
  valueMenuOff: "w-12",
  valueMenuOn: "w-64",
};

export function Aside() {
  const [menu, setMenu] = useState<string>(menuValuesDefault.valueMenuOff);

  return (
    <>
      <div
        className={twMerge(
          "w-full h-full flex flex-col justify-between dark:bg-zinc-800 border-e border-zinc-500 transition-all duration-1000",
          menu === "w-12" ? "w-12" : "w-64",
        )}
      >
        <div className="w-auto h-full flex flex-col gap-12 py-6 overflow-x-hidden">
          <div
            className={twMerge(
              "w-full h-20 flex flex-row gap-4 items-center justify-between px-4",
              menu === "w-12" && "px-2",
            )}
          >
            <div
              className={twMerge(
                "rounded-full cursor-pointer",
                menu === "w-12" ? "w-[2rem] h-[2rem]" : "min-w-[3rem] min-h-[3rem]",
              )}
            >
              <img
                src="undraw_male_avatar_g98d.svg"
                alt="avatar user"
                className={menu === "w-12" ? "w-full h-full" : "max-w-[3rem] max-h-[3rem]"}
              />
            </div>

            <div className={twMerge("w-min gap-2 group", menu === "w-12" ? "hidden" : "flex items-end")}>
              <button className="w-3 h-3 rounded-full bg-zinc-300  group-hover:bg-red-400"></button>
              <button className="w-3 h-3 rounded-full bg-zinc-300  group-hover:bg-yellow-400"></button>
              <button className="w-3 h-3 rounded-full bg-zinc-300  group-hover:bg-green-400"></button>
            </div>
          </div>

          <ul className="h-full w-full flex flex-col gap-4 text-black dark:text-white">
            <li
              className={twMerge(
                "w-max flex flex-row gap-2 items-center py-[6px] px-4 rounded-md cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-600",
                menu === "w-12" && "px-2",
              )}
            >
              <AiFillFolderOpen className="min-w-[24px] min-h-[24px]" />
              <span className={twMerge("text-sm", menu === "w-12" && "invisible")}>Arquivos</span>
            </li>

            <li
              className={twMerge(
                "w-max flex flex-row gap-2 items-center py-[6px] px-4 rounded-md cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-600",
                menu === "w-12" && "px-2",
              )}
            >
              <BiTime className="min-w-[24px] min-h-[24px]" />
              <span className={twMerge("text-sm", menu === "w-12" && "invisible")}>Mundaças Recentes</span>
            </li>

            <li
              className={twMerge(
                "w-max flex flex-row gap-2 items-center py-[6px] px-4 rounded-md cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-600",
                menu === "w-12" && "px-2",
              )}
            >
              <GoGear className="min-w-[24px] min-h-[24px]" />
              <span className={twMerge("text-sm", menu === "w-12" && "invisible")}>Configurações</span>
            </li>
          </ul>
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
