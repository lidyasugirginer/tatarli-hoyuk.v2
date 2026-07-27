"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  LoaderCircle,
  Trash2,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";

import styles from "./delete-news-button.module.css";

type DeleteNewsButtonProps = {
  newsId: string;
  newsTitle: string;
};

export default function DeleteNewsButton({
  newsId,
  newsTitle,
}: DeleteNewsButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      `"${newsTitle}" başlıklı haberi silmek istediğinizden emin misiniz?`
    );

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);

    try {
      const supabase = createClient();

      const { error } = await supabase
        .from("news")
        .delete()
        .eq("id", newsId);

      if (error) {
        throw error;
      }

      router.refresh();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Haber silinirken bir hata oluştu.";

      window.alert(message);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <button
      type="button"
      className={styles.deleteButton}
      onClick={handleDelete}
      disabled={isDeleting}
      aria-label={`${newsTitle} haberini sil`}
    >
      {isDeleting ? (
        <LoaderCircle
          size={16}
          className={styles.spinner}
        />
      ) : (
        <Trash2 size={16} />
      )}

      <span>Sil</span>
    </button>
  );
}