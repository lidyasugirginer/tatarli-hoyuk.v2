"use client";

import {
  EditorContent,
  useEditor,
} from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";

import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
} from "lucide-react";

import styles from "./rich-text-editor.module.css";

type RichTextEditorProps = {
  value: string;
  onChange: (html: string) => void;
};

export default function RichTextEditor({
  value,
  onChange,
}: RichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,

    extensions: [
      StarterKit.configure({
        hardBreak: {
          keepMarks: true,
        },
      }),
      Underline,
    ],

    content: value,

    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },

    editorProps: {
      attributes: {
        class: styles.editorContent,
      },
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className={styles.editor}>
      <div className={styles.toolbar}>
        <button
          type="button"
          className={`${styles.toolbarButton} ${
            editor.isActive("bold")
              ? styles.active
              : ""
          }`}
          onMouseDown={(event) =>
            event.preventDefault()
          }
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleBold()
              .run()
          }
          aria-label="Kalın"
          title="Kalın"
        >
          <Bold size={16} />
        </button>

        <button
          type="button"
          className={`${styles.toolbarButton} ${
            editor.isActive("italic")
              ? styles.active
              : ""
          }`}
          onMouseDown={(event) =>
            event.preventDefault()
          }
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleItalic()
              .run()
          }
          aria-label="İtalik"
          title="İtalik"
        >
          <Italic size={16} />
        </button>

        <button
          type="button"
          className={`${styles.toolbarButton} ${
            editor.isActive("underline")
              ? styles.active
              : ""
          }`}
          onMouseDown={(event) =>
            event.preventDefault()
          }
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleUnderline()
              .run()
          }
          aria-label="Altı çizili"
          title="Altı çizili"
        >
          <UnderlineIcon size={16} />
        </button>
      </div>

      <EditorContent
        editor={editor}
        className={styles.editorBody}
      />

      <div className={styles.editorHint}>
        Metni seçerek biçimlendirebilirsiniz.
        Enter yeni paragraf, Shift + Enter yeni satır oluşturur.
      </div>
    </div>
  );
}