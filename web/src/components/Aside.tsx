import { useState } from "react";
import { AiFillFolderOpen } from "react-icons/ai";
import { BiTime } from "react-icons/bi";
import { FiMenu } from "react-icons/fi";
import { GoGear } from "react-icons/go";
import { IconType } from "react-icons/lib";
import { MdClose } from "react-icons/md";
import { AsideMenu } from "./AsideMenu";

export type MenuListType = {
  name: string;
  icon: IconType;
  openMenuList?: () => void;
};

export function Aside() {
  const [menu, setMenu] = useState<boolean>(false);

  const menuList: MenuListType = [
    {
      name: "Arquivos",
      icon: AiFillFolderOpen,
    },

    {
      name: "Mundaças Recentes",
      icon: BiTime,
    },

    {
      name: "Configurações",
      icon: GoGear,
    },
  ];

  return (
    <>
      <div className="w-full h-full group">
        <FiMenu className="w-12 h-12 text-black p-2 cursor-pointer md:group-hover:invisible hidden md:block" />

        <FiMenu
          className="w-12 h-12 text-black p-2 cursor-pointer md:group-hover:invisible block md:hidden"
          onClick={() => setMenu(!menu)}
        />

        <div
          className={`hidden md:w-64 md:h-full md:flex flex-col justify-between dark:bg-zinc-800 border-e border-zinc-500 transition-all duration-500 md:absolute md:top-0 md:-left-full group-hover:left-0 aside-menu-${menu}`}
        >
          <div className="w-auto h-full flex flex-col gap-8 py-6 overflow-x-hidden">
            <div className="w-[95%] h-auto flex flex-row gap-4 items-center justify-between px-4">
              <div className="rounded-full cursor-pointer min-w-[2rem] min-h-[2rem] max-w-[2rem] max-h-[2rem]">
                <img src="user.svg" alt="avatar user" className="w-full h-full" />
              </div>

              <div className="w-min gap-2 group hidden md:flex items-end ">
                <button className="w-3 h-3 rounded-full bg-zinc-300  group-hover:bg-red-400"></button>
                <button className="w-3 h-3 rounded-full bg-zinc-300  group-hover:bg-yellow-400"></button>
                <button className="w-3 h-3 rounded-full bg-zinc-300  group-hover:bg-green-400"></button>
              </div>

              <MdClose
                className="w-12 h-12 text-black p-2 cursor-pointer md:group-hover:invisible block md:hidden"
                onClick={() => setMenu(!menu)}
              />
            </div>

            <AsideMenu menuList={menuList} />

            <ul className="h-full w-full flex flex-col gap-1 text-black dark:text-white px-2">
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
