import { BiCommentDetail } from "react-icons/bi";
import { CgScreen } from "react-icons/cg";
import { CiMenuKebab } from "react-icons/ci";
import { IoIosStarOutline } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { SlSizeFullscreen } from "react-icons/sl";
import { TbClockHour9 } from "react-icons/tb";
import uuid from "react-uuid";
import { useAuth } from "../context";

type ModalAddContentProps = {
  setAddPageModal: (addPageModal: boolean) => void;
};

export function ModalAddContent({ setAddPageModal }: ModalAddContentProps) {
  const { user, setUser } = useAuth();

  return (
    <div className="w-screen h-screen flex items-center justify-center inset-0 fixed bg-modal z-[60]">
      <div className="w-[55%] h-[calc(100%_-_144px)] bg-white rounded-lg">
        <header className="w-full h-auto py-3 px-4 flex items-center justify-between">
          <div className="">
            <div className="flex flex-row gap-1 items-center text-black">
              <IoClose
                className="w-10 h-10 p-2 cursor-pointer hover:bg-zinc-200 rounded-md"
                onClick={() => setAddPageModal(false)}
              />
              <SlSizeFullscreen
                className="w-8 h-8 p-2 cursor-pointer hover:bg-zinc-200 rounded-md"
                onClick={() => addNewAnnotation()}
              />
              <CgScreen className="w-9 h-9 p-2 cursor-pointer hover:bg-zinc-200 rounded-md" />
            </div>
          </div>

          <div className="w-auto flex flex-row items-center gap-1 text-black">
            <span className="text-[#000!important] text-base px-2 py-1 cursor-pointer hover:bg-zinc-200 rounded-md">
              Compartilhar
            </span>

            <BiCommentDetail className="w-9 h-9 p-2 cursor-pointer hover:bg-zinc-200 rounded-md" />

            <TbClockHour9 className="w-9 h-9 p-2 cursor-pointer hover:bg-zinc-200 rounded-md" />

            <IoIosStarOutline className="w-9 h-9 p-2 cursor-pointer hover:bg-zinc-200 rounded-md" />

            <CiMenuKebab className="w-9 h-9 p-2 cursor-pointer hover:bg-zinc-200 rounded-md" />
          </div>
        </header>
      </div>
    </div>
  );

  function addNewAnnotation() {
    const newAnnotation = {
      id: uuid(),
      title: "Sem título",
      content: ``,
      createdBy: new Date(),
      lastUpdate: new Date(),
    };

    const userAux = user;
    userAux.annotations.push(newAnnotation);

    setUser(userAux);
  }
}
