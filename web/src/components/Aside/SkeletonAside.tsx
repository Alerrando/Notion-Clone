import { Key } from "react";
import { GoChevronRight } from "react-icons/go";
import { MenuListType } from ".";

type SkeletonAsideProps = {
  menuList: MenuListType[];
};

export function SkeletonAside({ menuList }: SkeletonAsideProps) {
  return (
    <>
      <div className="w-[95%] h-auto flex flex-row gap-4 items-center justify-between px-4">
        <div className="rounded-full min-w-[2rem] min-h-[2rem] max-w-[2rem] max-h-[2rem] bg-zinc-300 dark:bg-zinc-700"></div>

        <div className="w-min gap-2 group hidden md:flex items-end ">
          <button className="w-3 h-3 rounded-full cursor-default bg-zinc-300 dark:bg-zinc-700"></button>
          <button className="w-3 h-3 rounded-full cursor-default bg-zinc-300 dark:bg-zinc-700"></button>
          <button className="w-3 h-3 rounded-full cursor-default bg-zinc-300 dark:bg-zinc-700"></button>
        </div>
      </div>

      <ul className="h-full w-full flex flex-col gap-3 text-black dark:text-white px-2">
        {menuList.map((list: MenuListType, index: Key) => (
          <li
            className="w-min flex flex-row gap-2 items-center px-2 rounded-md bg-zinc-300 dark:bg-zinc-700"
            key={index}
          >
            <list.icon className="min-w-[26px] min-h-[26px] md:min-w-[20px] md:min-h-[20px] invisible" />
            <span className="w-max text-sm md:text-xs invisible">{list.name}</span>
          </li>
        ))}
      </ul>

      <ul className="h-auto w-full flex flex-col gap-1 text-black dark:text-white px-2">
        <li className="flex flex-row items-center justify-start gap-1 py-0.5 px-1 rounded-md">
          <GoChevronRight size={16} />
          <div className="w-5/12 flex flex-row items-center justify-start gap-1">
            <div className="min-w-[24px] h-6 rounded-md bg-zinc-300 dark:bg-zinc-700"></div>
            <span className="w-full h-3 text-sm font-semibold bg-zinc-300 dark:bg-zinc-700 rounded-md"></span>
          </div>
        </li>
        <li className="flex flex-row items-center justify-start gap-1 py-0.5 px-1 rounded-md">
          <GoChevronRight size={16} />
          <div className="w-3/6 flex flex-row items-center justify-start gap-1">
            <div className="min-w-[24px] h-6 rounded-md bg-zinc-300 dark:bg-zinc-700"></div>
            <span className="w-full h-3 text-sm font-semibold bg-zinc-300 dark:bg-zinc-700 rounded-md"></span>
          </div>
        </li>
        <li className="flex flex-row items-center justify-start gap-1 py-0.5 px-1 rounded-md">
          <GoChevronRight size={16} />
          <div className="w-3/4 flex flex-row items-center justify-start gap-1">
            <div className="min-w-[24px] h-6 rounded-md bg-zinc-300 dark:bg-zinc-700"></div>
            <span className="w-full h-3 text-sm font-semibold bg-zinc-300 dark:bg-zinc-700 rounded-md"></span>
          </div>
        </li>
        <li className="flex flex-row items-center justify-start gap-1 py-0.5 px-1 rounded-md">
          <GoChevronRight size={16} />
          <div className="w-8/12 flex flex-row items-center justify-start gap-1">
            <div className="min-w-[24px] h-6 rounded-md bg-zinc-300 dark:bg-zinc-700"></div>
            <span className="w-full h-3 text-sm font-semibold bg-zinc-300 dark:bg-zinc-700 rounded-md"></span>
          </div>
        </li>
      </ul>
    </>
  );
}
