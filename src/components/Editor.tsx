import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { lowlight } from 'lowlight';
import { initialContet } from "./InitialContent";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import js from "highlight.js/lib/languages/javascript";
import html from "highlight.js/lib/languages/xml";

lowlight.registerLanguage("html", html);
lowlight.registerLanguage("js", js);

export interface EditorProps {

}

export function Editor(props: EditorProps){
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

    return(
        <EditorContent
            editor={editor}
            className="max-w-[700px] mx-auto pt-16 prose"
        />
    )
}