import { Editor } from "@tiptap/react";
import { ComponentProps } from "react";

type FloatingMenuShowProps = ComponentProps<"button"> & {
  editor: Editor | null;
};

export function FloatingMenuShow({ editor }: FloatingMenuShowProps) {
  return (
    <>
      <button className="flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-zinc-600">
        <img
          src="https://www.notion.so/images/blocks/text/en-US.png"
          alt="Text"
          className="w-12 border border-zinc-600 rounded"
        />
        <div className="flex flex-col text-left">
          <span className="text-sm text-zinc-50">Text</span>
          <span className="text-xs text-zinc-400">
            Just start writing with plain text.
          </span>
        </div>
      </button>

      <button
        className="flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-zinc-600"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        <img
          src="https://www.notion.so/images/blocks/header.57a7576a.png"
          alt="Heading"
          className="w-12 border border-zinc-600 rounded"
        />
        <div className="flex flex-col text-left">
          <span className="text-sm text-zinc-50">Heading 1</span>
          <span className="text-xs text-zinc-400">Big section heading.</span>
        </div>
      </button>
    </>
  );
}
