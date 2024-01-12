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
  const [isFixed, setIsFixed] = useState<boolean>(false);
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
      openMenuList: () => {},
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
      <div className="w-full h-full group container-aside relative">
        <div className="h-min w-full items-center justify-start bg-zinc-100 dark:bg-[#2e2e2f] hidden md:flex">
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
          className={`hidden md:w-64 md:h-fit md:flex flex-col justify-between bg-zinc-100 dark:bg-[#2e2e2f] transition-all duration-500 md:absolute md:top-[8%] md:-left-full aside-menu ${menu} isfixed-${isFixed}`}
        >
          <div className="w-auto h-auto flex flex-col gap-12 py-6 overflow-x-hidden">
            {loading ? (
              <SkeletonAside menuList={menuList} />
            ) : (
              <>
                <div className="w-[95%] h-auto flex flex-row gap-4 items-center justify-between px-4">
                  <div className="rounded-full cursor-pointer min-w-[2rem] min-h-[2rem] max-w-[2rem] max-h-[2rem]">
                    <FaUserCircle className="w-full h-full" />
                  </div>

                  <div className="w-min gap-2 linux-box hidden md:flex items-end">
                    <button className="w-3 h-3 rounded-full bg-zinc-300"></button>
                    <button className="w-3 h-3 rounded-full bg-zinc-300"></button>
                    <button className="w-3 h-3 rounded-full bg-zinc-300"></button>
                  </div>

                  <MdClose
                    className="w-12 h-12 text-black p-2 cursor-pointer block md:hidden close-menu-svg-desktop"
                    onClick={() => setMenu(!menu)}
                  />
                </div>

                <AsideMenu menuList={menuList} />

                <ul className="h-auto w-full flex flex-col gap-1 text-black dark:text-white px-2">
                  {user?.annotations !== undefined &&
                    user?.annotations?.map((contextUser: AnnotationType, index: Key) => (
                      <li
                        className="flex flex-row items-center hover:bg-zinc-200 dark:hover:bg-zinc-600 justify-start gap-1 py-0.5 px-1 rounded-md cursor-pointer"
                        key={index}
                        onClick={() => changingAnnotationCurrent(contextUser)}
                      >
                        <GoChevronRight size={16} />
                        <div className="flex flex-row items-center justify-start gap-1">
                          <IoDocumentTextOutline size={18} className="dark:text-zinc-300 text-zinc-600" />
                          <span className="text-sm font-semibold">{contextUser?.title}</span>
                        </div>
                      </li>
                    ))}
                </ul>

                <FaAnglesLeft
                  className="w-6 h-6 fixed left-4 bottom-[5%] cursor-pointer close-aside-menu"
                  onClick={() => setIsFixed(!isFixed)}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );

  function changingAnnotationCurrent(contextUser: AnnotationType) {
    localStorage.setItem("annotation-current", contextUser.id);
    navigate(`/editor/${contextUser.id}`);
  }
}
