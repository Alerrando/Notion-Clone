import * as Popover from "@radix-ui/react-popover";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { BubbleMenu, EditorContent, FloatingMenu, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import js from "highlight.js/lib/languages/javascript";
import html from "highlight.js/lib/languages/xml";
import "highlight.js/styles/panda-syntax-dark.css";
import { lowlight } from "lowlight";
import { useEffect, useState } from "react";
import { LuSettings2 } from "react-icons/lu";
import { RxChatBubble, RxChevronDown, RxCode, RxFontBold, RxFontItalic, RxStrikethrough } from "react-icons/rx";
import { useParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { useAuth } from "../context";
import { AnnotationType } from "../context/types";
import { FloatingMenuShow } from "./FloatingMenuShow";

lowlight.registerLanguage("html", html);
lowlight.registerLanguage("js", js);

type EditorProps = {
  isNewContent: boolean;
  saveAnnotation: (getHtml: string | undefined, id?: string) => void;
};

export function Editor({ isNewContent, saveAnnotation }: EditorProps) {
  const { user } = useAuth();
  const { id } = useParams();
  const [currentEditor, setCurrentEditor] = useState<string | undefined>(
    user.annotations.find((annotation: AnnotationType) => annotation.id === id)?.content,
  );
  const toggleGroupItemClasses =
    "p-2 text-zinc-200 text-sm flex items-center gap-1.5 font-medium leading-none hover:text-zinc-50 hover:bg-zinc-600";
  const editor = useEditor({
    extensions: [
      StarterKit,
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content: !isNewContent ? currentEditor : "",
    editorProps: {
      attributes: {
        class: "h-full outline-none z-10",
      },
    },
  });

  useEffect(() => {
    if (!isNewContent) {
      const newContent = user?.annotations?.find((annotation: AnnotationType) => annotation.id === id)?.content;
      setCurrentEditor(newContent);
      if (editor && newContent) {
        editor.chain().setContent(newContent).run();
      }
    }

    if (id) localStorage.setItem("annotation-current", id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      <EditorContent
        editor={editor}
        className={twMerge(
          `w-2/3 md:w-auto md:max-w-[65%] h-auto flex flex-col-reverse mx-auto md:mr-[25%] pt-8 md:pt-12 prose prose-invert text-[#000!important] relative editor ${isNewContent}`,
          `${
            editor?.getText().length === 0
              ? "after:w-auto after:h-min after:content-['Sem_Titulo'] after:block after:text-zinc-600 after:text-4xl after:absolute after:bottom-[40%] after:z-0"
              : ""
          }`,
        )}
      >
        <div className="w-full h-auto flex items-center justify-end">
          <button
            className="px-8 py-2 border border-green-600 rounded-lg hover:bg-green-600 text-green-600 hover:text-white"
            onClick={() => saveAnnotation(editor?.getHTML(), id)}
          >
            Salvar
          </button>
        </div>
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
              <Popover.Content className="bg-zinc-700 md:bg-zinc-200 py-1 px-1 gap-1 shadow-xl border border-zinc-600 md:border-zinc-200 shadow-black/20 rounded-lg overflow-hidden flex flex-col z-[65]">
                <div className="group" onClick={() => editor.chain().focus().setHeading({ level: 1 }).run()}>
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

                <div
                  className=""
                  onClick={() => {
                    editor.chain().focus().toggleHeading({ level: 1 }).run();
                  }}
                >
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
}
