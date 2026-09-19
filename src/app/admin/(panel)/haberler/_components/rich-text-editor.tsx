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

import {
  useEffect,
  useRef,
} from "react";

import styles from "./rich-text-editor.module.css";

type RichTextEditorProps = {
  value: string;
  onChange: (html: string) => void;
};

export default function RichTextEditor({
  value,
  onChange,
}: RichTextEditorProps) {
  const isSyncingRef = useRef(false);

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
      if (isSyncingRef.current) {
        return;
      }

      onChange(editor.getHTML());
    },

    editorProps: {
      attributes: {
        class: styles.editorContent,
      },
    },
  });

  /*
    Dışarıdan gelen value değiştiğinde
    mevcut editörü yeniden oluşturmadan
    içeriğini güncelliyoruz.

    Böylece TR / EN geçişinde editör
    aynı yerde ve aynı instance olarak kalır.
  */
  useEffect(() => {
    if (!editor) {
      return;
    }

    const currentContent =
      editor.getHTML();

    if (currentContent === value) {
      return;
    }

    isSyncingRef.current = true;

    editor.commands.setContent(
      value || "",
      {
        emitUpdate: false,
      }
    );

    isSyncingRef.current = false;
  }, [editor, value]);

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