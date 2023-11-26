import { Key } from "react";
import { MenuListType } from ".";

type AsideMenuProps = {
  menuList: MenuListType[];
};

export function AsideMenu({ menuList }: AsideMenuProps) {
  return (
    <ul className="h-full w-full flex flex-col gap-1 text-black dark:text-white px-2">
      {menuList.map((list: MenuListType, index: Key) => (
        <li
          className="w-full flex flex-row gap-2 items-center py-[6px] px-2 rounded-md cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-600"
          key={index}
        >
          <list.icon className="min-w-[26px] min-h-[26px] md:min-w-[20px] md:min-h-[20px]" />
          <span className="text-sm md:text-xs">{list.name}</span>
        </li>
      ))}
    </ul>
  );
}
