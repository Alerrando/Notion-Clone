import * as ToggleGroup from "@radix-ui/react-toggle-group";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import {
  BubbleMenu,
  EditorContent,
  FloatingMenu,
  useEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import js from "highlight.js/lib/languages/javascript";
import html from "highlight.js/lib/languages/xml";
import "highlight.js/styles/panda-syntax-dark.css";
import { lowlight } from "lowlight";
import {
  RxChatBubble,
  RxChevronDown,
  RxCode,
  RxFontBold,
  RxFontItalic,
  RxStrikethrough,
} from "react-icons/rx";
import { initialContet } from "./InitialContent";

lowlight.registerLanguage("html", html);
lowlight.registerLanguage("js", js);

export interface EditorProps {}

export function Editor() {
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
      editor.editor.getJSON();
    },
    content: initialContet,
    editorProps: {
      attributes: {
        class: "outline-none",
      },
    },
  });

  return (
    <>
      <EditorContent
        editor={editor}
        className="max-w-[700px] mx-auto pt-16 prose prose-invert"
      />

      {editor && (
        <FloatingMenu
          editor={editor}
          shouldShow={({ state }) => {
            const { $from } = state.selection;

            const currentLineText = $from.nodeBefore?.textContent;

            return currentLineText === "/";
          }}
          className="bg-zinc-700 py-2 px-1 gap-1 shadow-xl border border-zinc-600 shadow-black/20 rounded-lg overflow-hidden flex flex-col"
        >
          <button className="flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-zinc-600">
            <img
              src="https://www.notion.so/images/blocks/text/en-US.png"
              alt="Text"
              className="w-12 border border-zinc-600 rounded"
            />
            <div className="flex flex-col text-left">
              <span className="text-sm">Text</span>
              <span className="text-xs text-zinc-400">
                Just start writing with plain text.
              </span>
            </div>
          </button>

          <button
            className="flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-zinc-600"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
          >
            <img
              src="https://www.notion.so/images/blocks/header.57a7576a.png"
              alt="Heading"
              className="w-12 border border-zinc-600 rounded"
            />
            <div className="flex flex-col text-left">
              <span className="text-sm">Heading 1</span>
              <span className="text-xs text-zinc-400">
                Big section heading.
              </span>
            </div>
          </button>
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
            <ToggleGroup.Item
              value="text"
              aria-label="Text Item"
              className={toggleGroupItemClasses}
            >
              Text
              <RxChevronDown className="w-4 h-4" />
            </ToggleGroup.Item>

            <ToggleGroup.Item
              value="comment"
              aria-label="Comment Item"
              className={toggleGroupItemClasses}
            >
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
