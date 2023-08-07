import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { lowlight } from 'lowlight';
import { initialContet } from "./InitialContent";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import js from "highlight.js/lib/languages/javascript";
import html from "highlight.js/lib/languages/xml";
import { RxFontBold, RxFontItalic, RxStrikethrough, RxCode, RxChevronDown, RxChatBubble } from "react-icons/rx"
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
                            Text
                            <RxChevronDown className="w-4 h-4" />
                    </BubbleButton>

                    <BubbleButton>
                            Comment
                            <RxChatBubble className="w-4 h-4" />
                    </BubbleButton>
                    
                    <div className="flex items-center">
                        <BubbleButton 
                            onClick={() => editor.chain().focus().toggleBold().run()}
                            data-active={editor.isActive("bold")}
                        >
                            <RxFontBold className="w-4 h-4" />
                        </BubbleButton>

                        <BubbleButton
                            onClick={() => editor.chain().focus().toggleItalic().run()}
                            data-active={editor.isActive("italic")}
                        >
                            <RxFontItalic className="w-4 h-4" />
                        </BubbleButton>

                        <BubbleButton
                            onClick={() => editor.chain().focus().toggleStrike().run()}
                            data-active={editor.isActive("strike")}
                        >
                            <RxStrikethrough className="w-4 h-4" />
                        </BubbleButton>

                        <BubbleButton
                            onClick={() => editor.chain().focus().toggleCode().run()}
                            data-active={editor.isActive("code")}
                        >
                            <RxCode className="w-4 h-4" />
                        </BubbleButton>
                    </div>
                </BubbleMenu>
            ) }
        </>
    )
}