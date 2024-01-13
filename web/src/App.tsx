import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Aside } from "./components/Aside";
import { Editor } from "./components/Editor";
import { ModalAddContent } from "./components/ModalAddContent";
import { useAuth } from "./context";
import { AnnotationType } from "./context/types";

export function App() {
  const { user, verifyRoleUser, updateUserAnnotation } = useAuth();
  const [addPageModal, setAddPageModal] = useState(false);

  useEffect(() => {
    verifyRoleUser && verifyRoleUser();
  }, []);

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
        {addPageModal && <ModalAddContent setAddPageModal={setAddPageModal} />}
      </div>

      <ToastContainer />
    </>
  );

  async function handleSaveEditTask(getHTML: string | undefined, id: string) {
    if (!getHTML) return;

    const currentContent = getHTML;
    const arrayCurrent = getHTML.split(/<(\/?\w+)>/).filter(Boolean);

    const auxAnnotationCurrent: AnnotationType[] = user.annotations.map((annotation) =>
      annotation.id === id && arrayCurrent
        ? {
            ...annotation,
            title: arrayCurrent[1],
            content: currentContent,
            lastUpdate: new Date(),
          }
        : annotation,
    );

    const contentChanged =
      auxAnnotationCurrent.find((annotation) => annotation.id === id)?.content !==
      user.annotations.find((annotation) => annotation.id === id)?.content;

    toastMessage(contentChanged);

    if (contentChanged) {
      await updateUserAnnotation(undefined, false, auxAnnotationCurrent);
    }
  }

  function handleChangeValuePageModal() {
    setAddPageModal(!addPageModal);
  }

  function toastMessage(message: boolean) {
    const toastMessage: { message: string; status: "success" | "error" } = {
      message: message ? "Anotação Editada com sucesso!" : "Não houve mudança na anotação",
      status: message ? "success" : "error",
    };

    toast[toastMessage.status](toastMessage.message, {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
}
