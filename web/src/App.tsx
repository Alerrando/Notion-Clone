import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Aside } from "./components/Aside";
import { Editor } from "./components/Editor";
import { ModalAddContent } from "./components/ModalAddContent";
import { useAuth } from "./context";
import { UserProps } from "./context/types";

export function App() {
  const { setUsersAll, setUser, user, verifyRoleUser } = useAuth();
  const [addPageModal, setAddPageModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.id?.length === 0) {
      const getUsersAll: UserProps[] = JSON.parse(localStorage.getItem("users-all-notion"));
      const idUser: string | undefined = localStorage.getItem("user-notion");
      const getUser = getUsersAll.find((user: UserProps) => user.id === idUser);
      if (getUsersAll || getUser) {
        setUsersAll(getUsersAll);
        setUser(getUser);

        setTimeout(() => {
          navigate(`/editor/${getUser.annotations.id}`);
        }, 5000);
      }
    }

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
            <Editor />
          </main>
        </div>

        <ToastContainer />

        {addPageModal && <ModalAddContent setAddPageModal={setAddPageModal} />}
      </div>
    </>
  );

  function handleChangeValuePageModal() {
    setAddPageModal(!addPageModal);
  }
}
