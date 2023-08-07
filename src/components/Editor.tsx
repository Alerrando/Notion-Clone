import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { lowlight } from 'lowlight';
import { initialContet } from "./InitialContent";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import js from "highlight.js/lib/languages/javascript";
import html from "highlight.js/lib/languages/xml";
import { RxFontBold, RxFontItalic, RxStrikethrough, RxCode } from "react-icons/rx"
import "highlight.js/styles/panda-syntax-dark.css"
import { BubbleButton } from "./BubbleButton";

lowlight.registerLanguage("html", html);
lowlight.registerLanguage("js", js);

export interface EditorProps {

}

export function Editor() {
    const editor = useEditor({
        extensions: [
            StarterKit,
            CodeBlockLowlight.configure({
                lowlight,
            }),
        ],
        content: initialContet,
        editorProps: {
            attributes: {
                class: "outline-none"
            }
        }
    })

    return (
        <>
            <EditorContent
                editor={editor}
                className="max-w-[700px] mx-auto pt-16 prose prose-invert"
            />

            { editor && (
                <BubbleMenu className="bg-zinc-700 shadow-xl border border-zinc-600 shadow-black/20 rounded-lg overflow-hidden flex divide-x divide-zinc-600" editor={editor}>
                    <BubbleButton>
                        <RxFontBold className="w-4 h-4" />
                    </BubbleButton>
                    <BubbleButton>
                        <RxFontItalic className="w-4 h-4" />
                    </BubbleButton>
                    <BubbleButton>
                        <RxStrikethrough className="w-4 h-4" />
                    </BubbleButton>

                    <BubbleButton>
                        <RxCode className="w-4 h-4" />
                    </BubbleButton>
                </BubbleMenu>
            ) }
        </>
    )
}