import { Key, useEffect, useState } from "react";
import { AiFillFolderOpen } from "react-icons/ai";
import { BiTime } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { FiMenu } from "react-icons/fi";
import { GoChevronRight, GoGear } from "react-icons/go";
import { IoIosAddCircle } from "react-icons/io";
import { IoDocumentTextOutline } from "react-icons/io5";
import { IconType } from "react-icons/lib";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context";
import { AnnotationType } from "../../context/types";
import { ArchiveHistoryModal } from "../Aside/ArchiveHistoryModal";
import { AsideMenu } from "./AsideMenu";
import { SkeletonAside } from "./SkeletonAside";

export type MenuListType = {
  name: string;
  icon: IconType;
  openMenuList?: () => void;
};

type AsideProps = {
  handleChangeValuePageModal: () => void;
};

export function Aside({ handleChangeValuePageModal }: AsideProps) {
  const { user } = useAuth();
  const [menu, setMenu] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFixed, setIsFixed] = useState<boolean>(true);
  const [archiveHistory, setArchiveHistory] = useState<boolean>(false);
  const navigate = useNavigate();

  const menuList: MenuListType[] = [
    {
      name: "Arquivos",
      icon: AiFillFolderOpen,
      openMenuList: () => {},
    },

    {
      name: "Mundaças Recentes",
      icon: BiTime,
      openMenuList: () => setArchiveHistory(!archiveHistory),
    },

    {
      name: "Configurações",
      icon: GoGear,
      openMenuList: () => {},
    },

    {
      name: "Nova Página",
      icon: IoIosAddCircle,
      openMenuList: handleChangeValuePageModal,
    },
  ];

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <div
        className={`w-full h-full group container-aside relative ${
          isFixed && "md:bg-zinc-200 dark:bg-[#2e2e2f] shadow-lg"
        }`}
      >
        <div className="h-min w-full items-center justify-start hidden md:flex">
          <FiMenu className="w-10 h-10 text-black dark:text-white p-2 cursor-pointer group-hover:hidden" />

          <FaAnglesRight
            className="w-10 h-10 text-black  dark:text-white p-2 cursor-pointer hidden group-hover:block"
            onClick={() => setIsFixed(!isFixed)}
          />
        </div>

        <FiMenu
          className="w-12 h-12 text-black  dark:text-white p-2 cursor-pointer block md:hidden menu-svg-desktop"
          onClick={() => setMenu(!menu)}
        />

        <div
          className={`hidden md:w-64 md:h-fit md:flex flex-col justify-between transition-all duration-500 md:absolute md:top-[8%] md:-left-full aside-menu ${
            menu && "true"
          } ${isFixed && "h-full md:w-64 md:top-0 md:left-0"}`}
        >
          <div className="w-[65%] h-full md:w-auto flex flex-col gap-12 py-6 overflow-x-hidden bg-zinc-800 md:bg-transparent">
            {loading ? (
              <SkeletonAside menuList={menuList} />
            ) : (
              <>
                <div className="w-[95%] h-auto flex flex-row gap-4 items-center justify-between px-4">
                  <div className="rounded-full cursor-pointer min-w-[2rem] min-h-[2rem] max-w-[2rem] max-h-[2rem]">
                    <FaUserCircle className="w-full h-full text-white md:text-[#2e2e2f] dark:text-zinc-200" />
                  </div>

                  <div className="w-min gap-2 linux-box hidden md:flex items-end">
                    <button className="w-3 h-3 rounded-full bg-zinc-300"></button>
                    <button className="w-3 h-3 rounded-full bg-zinc-300"></button>
                    <button className="w-3 h-3 rounded-full bg-zinc-300"></button>
                  </div>

                  <MdClose
                    className="w-12 h-12 text-white md:text-[#2e2e2f] dark:text-zinc-200 p-2 cursor-pointer block md:hidden close-menu-svg-desktop"
                    onClick={() => setMenu(!menu)}
                  />
                </div>

                <AsideMenu menuList={menuList} />

                <ul className="h-auto w-full flex flex-col gap-1 text-black dark:text-white px-2">
                  {user?.annotations !== undefined &&
                    user?.annotations?.map((contextUser: AnnotationType, index: Key) => (
                      <li
                        className="flex flex-row items-center hover:bg-zinc-400 dark:hover:bg-zinc-600 justify-start gap-1 py-0.5 px-1 rounded-md cursor-pointer text-white hover:text-black md:text-[#2e2e2f] dark:text-zinc-200"
                        key={index}
                        onClick={() => changingAnnotationCurrent(contextUser)}
                      >
                        <GoChevronRight size={16} />
                        <div className="flex flex-row items-center justify-start gap-1">
                          <IoDocumentTextOutline size={18} />
                          <span className="text-sm font-semibold">{contextUser?.title}</span>
                        </div>
                      </li>
                    ))}
                </ul>
                <div className=""></div>

                <FaAnglesLeft
                  className="w-6 h-6 fixed left-4 bottom-[5%] cursor-pointer close-aside-menu"
                  onClick={() => setIsFixed(!isFixed)}
                />
              </>
            )}
          </div>
        </div>
        {archiveHistory && <ArchiveHistoryModal />}
      </div>
    </>
  );

  function changingAnnotationCurrent(contextUser: AnnotationType) {
    localStorage.setItem("annotation-current", contextUser.id);
    navigate(`/editor/${contextUser.id}`);
    if (window.innerWidth <= 763) {
      setIsFixed(true);
    }
  }
}
