import { Key, useContext, useEffect, useState } from "react";
import { AiFillFolderOpen } from "react-icons/ai";
import { BiTime } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { GoChevronRight, GoGear } from "react-icons/go";
import { IoDocumentTextOutline } from "react-icons/io5";
import { IconType } from "react-icons/lib";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context";
import { AnnotationType } from "../../context/typesContext";
import { AsideMenu } from "./AsideMenu";
import { SkeletonAside } from "./SkeletonAside";

export type MenuListType = {
  name: string;
  icon: IconType;
  openMenuList?: () => void;
};

export function Aside() {
  const useStore = useContext(StoreContext);
  const { user, setAnnotationCurrent } = useStore();
  const [menu, setMenu] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

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

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

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
          <div className="w-auto h-auto flex flex-col gap-12 py-6 overflow-x-hidden">
            {loading ? (
              <SkeletonAside menuList={menuList} />
            ) : (
              <>
                <div className="w-[95%] h-auto flex flex-row gap-4 items-center justify-between px-4">
                  <div className="rounded-full cursor-pointer min-w-[2rem] min-h-[2rem] max-w-[2rem] max-h-[2rem]">
                    <FaUserCircle className="w-full h-full" />
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

                <ul className="h-auto w-full flex flex-col gap-1 text-black dark:text-white px-2">
                  {user.annotations !== undefined &&
                    user.annotations.map((contextUser: AnnotationType, index: Key) => (
                      <li
                        className="flex flex-row items-center hover:bg-zinc-200 justify-start gap-1 py-0.5 px-1 rounded-md cursor-pointer"
                        key={index}
                        onClick={() => changingAnnotationCurrent(contextUser)}
                      >
                        <GoChevronRight size={16} />
                        <div className="flex flex-row items-center justify-start gap-1">
                          <IoDocumentTextOutline size={18} className="text-zinc-600" />
                          <span className="text-sm font-semibold">{contextUser?.title}</span>
                        </div>
                      </li>
                    ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );

  function changingAnnotationCurrent(contextUser: AnnotationType) {
    setAnnotationCurrent(contextUser);

    navigate(`/editor/${contextUser?.id}`);
  }
}
