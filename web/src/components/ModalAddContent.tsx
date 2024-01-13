import js from "highlight.js/lib/languages/javascript";
import html from "highlight.js/lib/languages/xml";
import { lowlight } from "lowlight";
import { BiCommentDetail } from "react-icons/bi";
import { CgScreen } from "react-icons/cg";
import { CiMenuKebab } from "react-icons/ci";
import { IoIosStarOutline } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { SlSizeFullscreen } from "react-icons/sl";
import { TbClockHour9 } from "react-icons/tb";
import uuid from "react-uuid";
import { useAuth } from "../context";
import { AnnotationType } from "../context/types";
import { Editor } from "./Editor";
import { useNavigate } from "react-router";
import { FaCheck } from "react-icons/fa";
import { MdOutlineErrorOutline } from "react-icons/md";
import { styleToast } from "../util";
import { Toaster, toast } from "sonner";

type ModalAddContentProps = {
  setAddPageModal: (addPageModal: boolean) => void;
};

lowlight.registerLanguage("html", html);
lowlight.registerLanguage("js", js);

export function ModalAddContent({ setAddPageModal }: ModalAddContentProps) {
  const { updateUserAnnotation } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <div className="w-screen h-screen flex items-center justify-center inset-0 fixed bg-modal z-[60]">
        <div className="w-[55%] h-[calc(100%_-_144px)] bg-white rounded-lg">
          <header className="w-full h-auto py-3 px-4 flex items-center justify-between border-b-2 border-b-[#eee]">
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

          <section className="w-full h-[85%] overflow-y-auto">
            <Editor isNewContent={true} saveAnnotation={addNewAnnotationFromEditor} />
          </section>
        </div>
      </div>

      <Toaster />
    </>
  );

  function addNewAnnotation() {
    const newAnnotation = {
      id: uuid(),
      title: "Sem título",
      content: "<h1></h1>",
      createdBy: new Date(),
      lastUpdate: new Date(),
    };
    updateUserAnnotation(newAnnotation, true, undefined);

    setAddPageModal(false);
    navigate(`/editor/${newAnnotation.id}`);
  }

  function addNewAnnotationFromEditor(getHTML: string | undefined, id: string | undefined) {
    if (!getHTML && !id) return;
    const currentContent = getHTML;

    const arrayCurrent: string[] | undefined = getHTML.split(/<(\/?\w+)>/).filter(Boolean);

    if (currentContent && arrayCurrent) {
      const newAnnotation: AnnotationType = {
        id: uuid(),
        title: arrayCurrent[1],
        content: currentContent,
        lastUpdate: new Date(),
        createdBy: new Date(),
      };
      updateUserAnnotation(newAnnotation, true, undefined);

      setTimeout(() => {
        setAddPageModal(false);
      }, 5000);
    }

    toastMessage(arrayCurrent !== undefined);
  }

  function toastMessage(message: boolean) {
    const toastMessage: { message: string; status: "success" | "error" } = {
      message: message ? "Anotação criada com sucesso!" : "Não foi possivel criar anotação",
      status: message ? "success" : "error",
    };

    toast(toastMessage.message, {
      type: toastMessage.status,
      position: "bottom-left",
      duration: 80000,
      icon: toastMessage.status === "success" ? <FaCheck size={18} /> : <MdOutlineErrorOutline size={18} />,
      className: styleToast[toastMessage.status],
      action: { label: "X", onClick: () => {} },
    });
  }
}
