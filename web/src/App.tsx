import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { MdOutlineErrorOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { Aside } from "./components/Aside";
import { Editor } from "./components/Editor";
import { ModalAddContent } from "./components/ModalAddContent";
import { useAuth } from "./context";
import { styleToast } from "./util";

export function App() {
  const { user, verifyRoleUser, updateUserAnnotation, getDatasLocalStorage } = useAuth();
  const [addPageModal, setAddPageModal] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.id.length === 0) {
      const annotationId: string | undefined = getDatasLocalStorage();
      if (annotationId && annotationId?.length > 0) {
        navigate(`/editor/${annotationId}`);
      } else {
        navigate("/");
      }
    }

    setTimeout(() => {
      setLoading(true);
    }, 5000);

    verifyRoleUser && verifyRoleUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!loading && user.id.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="h-12 w-12 bg-white border-4 border-black rounded-full animate-spin relative after:w-6 after:h-6 after:absolute after:block after:-right-2 after:-bottom-2 after:bg-white after:rounded-full"></div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center text-zinc-50 bg-white dark:bg-[#2e2e2f] overflow-y-auto">
        <div className="w-full h-screen flex flex-row md:grid md:grid-cols-[16rem_1fr] bg-zinc-100 dark:bg-zinc-800 md:bg-zinc-100 md:dark:bg-zinc-700 mx-auto md:rounded-xl shadow-sm border-black/20 overflow-hidden">
          <aside className="w-12 md:w-64 h-full relative md:static flex items-start justify-start bg-modal md:bg-zinc-100 md:dark:bg-zinc-800 z-50">
            <div className="w-full h-full bg-zinc-100 dark:bg-[#2e2e2f] md:overflow-y-auto md:overflow-x-hidden duration-1000">
              <Aside handleChangeValuePageModal={handleChangeValuePageModal} />
            </div>
          </aside>

          <main className="w-full h-full py-4 md:p-4 bg-zinc-100 dark:bg-[#2e2e2f] overflow-y-auto">
            <Editor isNewContent={false} saveAnnotation={handleSaveEditTask} />
          </main>
        </div>

        <Toaster position="bottom-left" />

        {addPageModal && <ModalAddContent setAddPageModal={setAddPageModal} />}
      </div>
    </>
  );

  function handleChangeValuePageModal() {
    setAddPageModal(!addPageModal);
  }

  function handleSaveEditTask(getHTML: string | undefined, id: string | undefined) {
    if (!getHTML && !id) return;

    const currentContent = getHTML as string;
    const arrayCurrent: string[] = currentContent.split(/<(\/?\w+)>/).filter(Boolean);

    const auxAnnotationCurrent = user.annotations.map((annotation) =>
      annotation.id === id && arrayCurrent
        ? {
            ...annotation,
            title: arrayCurrent[1],
            content: currentContent as string,
            lastUpdate: new Date(),
          }
        : annotation,
    );

    const contentChanged =
      auxAnnotationCurrent.find((annotation) => annotation.id === id)?.content !==
      user.annotations.find((annotation) => annotation.id === id)?.content;

    toastMessage(contentChanged);

    if (contentChanged) {
      updateUserAnnotation(undefined, false, auxAnnotationCurrent);
    }
  }

  function toastMessage(message: boolean) {
    const toastMessage: { message: string; status: "success" | "error" } = {
      message: message ? "Anotação Editada com sucesso!" : "Não houve mudança na anotação",
      status: message ? "success" : "error",
    };

    toast(toastMessage.message, {
      position: "bottom-left",
      duration: 80000,
      icon: toastMessage.status === "success" ? <FaCheck size={18} /> : <MdOutlineErrorOutline size={18} />,
      className: styleToast[toastMessage.status],
      action: { label: "X", onClick: () => {} },
    });
  }
}
