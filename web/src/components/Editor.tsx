import * as Popover from "@radix-ui/react-popover";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { BubbleMenu, EditorContent, FloatingMenu, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import js from "highlight.js/lib/languages/javascript";
import html from "highlight.js/lib/languages/xml";
import "highlight.js/styles/panda-syntax-dark.css";
import { lowlight } from "lowlight";
import { useContext, useState } from "react";
import uuid from "react-uuid";
import { LuSettings2 } from "react-icons/lu";
import { RxChatBubble, RxChevronDown, RxCode, RxFontBold, RxFontItalic, RxStrikethrough } from "react-icons/rx";
import { StoreContext } from "../context";
import { AnnotationType, UserDTOProps } from "../context/typesContext";
import { FloatingMenuShow } from "./FloatingMenuShow";
import { initialContent } from "./InitialContent";

lowlight.registerLanguage("html", html);
lowlight.registerLanguage("js", js);

export interface EditorProps {}

export function Editor() {
  const useStore = useContext(StoreContext);
  const { user, setUser } = useStore();
  const [currentEditor, setCurrentEditor] = useState<string | undefined>(initialContent);
  const [editableTask, setEditableTask] = useState<boolean>(false);
  const toggleGroupItemClasses =
    "p-2 text-zinc-200 text-sm flex items-center gap-1.5 font-medium leading-none hover:text-zinc-50 hover:bg-zinc-600 data-[active=true]:text-violet-400";
  const editor = useEditor({
    extensions: [
      StarterKit,
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    onUpdate(editor) {
      const currentEditorUpdate = editor.editor.getHTML();
      if (currentEditorUpdate !== currentEditor) {
        setEditableTask(true);
      } else {
        setEditableTask(false);
      }
    },
    content: initialContent,
    editorProps: {
      attributes: {
        class: "h-full outline-none",
      },
    },
  });

  return (
    <>
      <EditorContent
        editor={editor}
        className="w-2/3 md:w-auto md:max-w-[65%] h-full flex flex-col mx-auto md:mr-[25%] pt-8 md:pt-16 prose prose-invert text-black dark:text-white"
      >
        {editableTask && (
          <div className="w-full h-auto flex items-center justify-end">
            <button
              className="px-8 py-2 border border-green-600 rounded-lg hover:bg-green-600 text-green-600 dark:text-white hover:text-white"
              onClick={() => handleSaveEditTask()}
            >
              Salvar
            </button>
          </div>
        )}
      </EditorContent>
      {editor && (
        <FloatingMenu
          editor={editor}
          shouldShow={({ state }) => {
            const { $from } = state.selection;

            const currentLineText = $from.nodeBefore?.textContent;

            return currentLineText === "/";
          }}
        >
          <Popover.Root>
            <Popover.Trigger asChild>
              <button
                className="rounded-full w-[35px] h-[35px] inline-flex items-center justify-center text-violet11 bg-white shadow-[0_2px_10px] shadow-blackA7 hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black cursor-default outline-none"
                aria-label="Update dimensions"
              >
                <LuSettings2 className="text-black" />
              </button>
            </Popover.Trigger>

            <Popover.Portal>
              <Popover.Content className="bg-zinc-700 md:bg-zinc-200 py-1 px-1 gap-1 shadow-xl border border-zinc-600 md:border-zinc-200 shadow-black/20 rounded-lg overflow-hidden flex flex-col z-50">
                <div className="">
                  <FloatingMenuShow.Root>
                    <FloatingMenuShow.Img
                      src="https://www.notion.so/images/blocks/text/en-US.png"
                      alt="Text"
                      className="w-12 border border-zinc-600 rounded"
                    />

                    <FloatingMenuShow.TextInput
                      texts={[
                        {
                          className: "text-sm text-zinc-50",
                          text: "Text",
                        },

                        {
                          className: "text-xs text-zinc-400",
                          text: "Just start writing with plain text.",
                        },
                      ]}
                    />
                  </FloatingMenuShow.Root>
                </div>

                <div className="" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
                  <FloatingMenuShow.Root>
                    <FloatingMenuShow.Img
                      src="https://www.notion.so/images/blocks/header.57a7576a.png"
                      alt="Heading"
                      className="w-12 border border-zinc-600 rounded"
                    />

                    <FloatingMenuShow.TextInput
                      texts={[
                        {
                          className: "text-sm text-zinc-50",
                          text: "Heading 1",
                        },

                        {
                          className: "text-xs text-zinc-400",
                          text: "Big section heading.",
                        },
                      ]}
                    />
                  </FloatingMenuShow.Root>
                </div>
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        </FloatingMenu>
      )}

      {editor && (
        <BubbleMenu editor={editor}>
          <ToggleGroup.Root
            className="bg-zinc-700 shadow-xl border border-zinc-600 shadow-black/20 rounded-lg overflow-hidden flex divide-x divide-zinc-600"
            type="single"
            defaultValue="text"
            aria-label="Menu Bubble Item"
          >
            <ToggleGroup.Item value="text" aria-label="Text Item" className={toggleGroupItemClasses}>
              Text
              <RxChevronDown className="w-4 h-4" />
            </ToggleGroup.Item>

            <ToggleGroup.Item value="comment" aria-label="Comment Item" className={toggleGroupItemClasses}>
              Comment
              <RxChatBubble className="w-4 h-4" />
            </ToggleGroup.Item>

            <div className="flex items-center">
              <ToggleGroup.Item
                value="font-bold"
                aria-label="Font Bold Item"
                onClick={() => editor.chain().focus().toggleBold().run()}
                data-active={editor.isActive("bold")}
                className={toggleGroupItemClasses}
              >
                <RxFontBold className="w-4 h-4" />
              </ToggleGroup.Item>

              <ToggleGroup.Item
                value="font-italic"
                aria-label="Font Italic Item"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                data-active={editor.isActive("italic")}
                className={toggleGroupItemClasses}
              >
                <RxFontItalic className="w-4 h-4" />
              </ToggleGroup.Item>

              <ToggleGroup.Item
                value="font-strike"
                aria-label="Font Strike Item"
                onClick={() => editor.chain().focus().toggleStrike().run()}
                data-active={editor.isActive("strike")}
                className={toggleGroupItemClasses}
              >
                <RxStrikethrough className="w-4 h-4" />
              </ToggleGroup.Item>

              <ToggleGroup.Item
                value="font-code"
                aria-label="Font Code Item"
                onClick={() => editor.chain().focus().toggleCode().run()}
                data-active={editor.isActive("code")}
                className={toggleGroupItemClasses}
              >
                <RxCode className="w-4 h-4" />
              </ToggleGroup.Item>
            </div>
          </ToggleGroup.Root>
        </BubbleMenu>
      )}
    </>
  );

  function handleSaveEditTask() {
    debugger;
    setCurrentEditor(editor?.getHTML());
    const date = new Date();

    const arrayCurrent: string[] = editor
      ?.getHTML()
      .split(/<(\/?\w+)>/)
      .filter(Boolean);
    const userAux: UserDTOProps = user;
    const infosContext: AnnotationType = {
      id: uuid(),
      title: arrayCurrent[1],
      content: editor?.getHTML(),
      createdBy: date.toUTCString(),
      lastUpdate: date.toUTCString(),
    };
    const annontationsAux = user.annotations;
    console.log(annontationsAux);

    userAux.annotations.push(infosContext);

    setUser(user);
  }
}
