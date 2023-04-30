import "../styles/Tiptap.scss";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        italic
      </button>
      <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
        clear marks
      </button>
      <button onClick={() => editor.chain().focus().clearNodes().run()}>
        clear nodes
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive("paragraph") ? "is-active" : ""}
      >
        paragraph
      </button>
      <button onClick={() => editor.chain().focus().setHardBreak().run()}>
        hard break
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        undo
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        redo
      </button>
      <button
        onClick={() => editor.chain().focus().setColor("purple").run()}
        className={
          editor.isActive("textStyle", { color: "purple" }) ? "is-active" : ""
        }
      >
        purple
      </button>
      <button
        onClick={() => editor.chain().focus().setColor("red").run()}
        className={
          editor.isActive("textStyle", { color: "red" }) ? "is-active" : ""
        }
      >
        red
      </button>
      <button
        onClick={() => editor.chain().focus().setColor("orange").run()}
        className={
          editor.isActive("textStyle", { color: "orange" }) ? "is-active" : ""
        }
      >
        orange
      </button>
      <button
        onClick={() => editor.chain().focus().setColor("yellow").run()}
        className={
          editor.isActive("textStyle", { color: "yellow" }) ? "is-active" : ""
        }
      >
        yellow
      </button>
      <button
        onClick={() => editor.chain().focus().setColor("green").run()}
        className={
          editor.isActive("textStyle", { color: "green" }) ? "is-active" : ""
        }
      >
        green
      </button>
    </>
  );
};

//UniqueID is used for the dependency array in useEffect

const Tiptap = ({
  originalEditorContent,
  setEditorContent,
  editing,
  uniqueID,
}) => {
  const editor = useEditor(
    {
      extensions: [
        Color.configure({ types: [TextStyle.name, ListItem.name] }),
        TextStyle.configure({ types: [ListItem.name] }),
        StarterKit.configure({
          bulletList: {
            keepMarks: true,
            keepAttributes: false,
          },
          orderedList: {
            keepMarks: true,
            keepAttributes: false,
          },
        }),
      ],
      content: originalEditorContent,
      onUpdate: ({ editor }) => {
        setEditorContent(editor.getHTML());
      },
      onBlur: ({ editor }) => {
        setEditorContent(editor.getHTML());
      },
      editable: editing,
    },
    [uniqueID, editing, originalEditorContent]
  );

  return (
    <>
      {editing && <MenuBar editor={editor} />}
      <EditorContent editor={editor} />
    </>
  );
};

export default Tiptap;
