"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  ArrowDown,
  ArrowUp,
  LoaderCircle,
  Trash2,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";

import styles from "./gallery-album-actions.module.css";

type GalleryAlbumActionsProps = {
  id: string;
  title: string;
  coverImageUrl: string | null;
  sortOrder: number;
  canMoveUp: boolean;
  canMoveDown: boolean;
};

export default function GalleryAlbumActions({
  id,
  title,
  coverImageUrl,
  sortOrder,
  canMoveUp,
  canMoveDown,
}: GalleryAlbumActionsProps) {
  const router = useRouter();
  const supabase = createClient();

  const [isMoving, setIsMoving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function move(direction: "up" | "down") {
    if (isMoving) {
      return;
    }

    setIsMoving(true);

    try {
      let query = supabase
        .from("gallery_albums")
        .select("id, sort_order");

      if (direction === "up") {
        query = query.lt("sort_order", sortOrder);
      } else {
        query = query.gt("sort_order", sortOrder);
      }

      const { data: neighbour, error } =
        await query
          .order("sort_order", {
            ascending: direction === "down",
          })
          .limit(1)
          .maybeSingle();

      if (error) {
        throw error;
      }

      if (!neighbour) {
        return;
      }

      const neighbourOrder = neighbour.sort_order;

      const { error: currentError } =
        await supabase
          .from("gallery_albums")
          .update({
            sort_order: neighbourOrder,
          })
          .eq("id", id);

      if (currentError) {
        throw currentError;
      }

      const { error: neighbourError } =
        await supabase
          .from("gallery_albums")
          .update({
            sort_order: sortOrder,
          })
          .eq("id", neighbour.id);

      if (neighbourError) {
        throw neighbourError;
      }

      router.refresh();
    } catch (error) {
      console.error(
        "Albüm sıralama hatası:",
        error
      );

      window.alert(
        "Albüm sırası değiştirilirken bir hata oluştu."
      );
    } finally {
      setIsMoving(false);
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      `"${title}" albümünü silmek istediğinizden emin misiniz?\n\nAlbüm kapağı ve albümdeki tüm fotoğraflar kalıcı olarak silinecek.`
    );

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);

    try {
      const STORAGE_BUCKET =
        "tatarli-hoyuk-storage";

      // Albüm içindeki fotoğrafları bul
      const {
        data: albumFiles,
        error: listError,
      } = await supabase.storage
        .from(STORAGE_BUCKET)
        .list(`gallery/${id}`, {
          limit: 1000,
        });

      if (listError) {
        throw listError;
      }

      // Albüm içindeki fotoğrafları Storage'dan sil
      if (
        albumFiles &&
        albumFiles.length > 0
      ) {
        const filePaths = albumFiles.map(
          (file) =>
            `gallery/${id}/${file.name}`
        );

        const {
          error: removeImagesError,
        } = await supabase.storage
          .from(STORAGE_BUCKET)
          .remove(filePaths);

        if (removeImagesError) {
          throw removeImagesError;
        }
      }

      // Kapak görselini Storage'dan sil
      if (coverImageUrl) {
        const marker =
          `/storage/v1/object/public/${STORAGE_BUCKET}/`;

        if (coverImageUrl.includes(marker)) {
          const coverPath = decodeURIComponent(
            coverImageUrl.split(marker)[1]
          );

          const {
            error: removeCoverError,
          } = await supabase.storage
            .from(STORAGE_BUCKET)
            .remove([coverPath]);

          if (removeCoverError) {
            throw removeCoverError;
          }
        }
      }

      // Albümü veritabanından sil
      // gallery_images kayıtları cascade ile silinir
      const { error: deleteError } =
        await supabase
          .from("gallery_albums")
          .delete()
          .eq("id", id);

      if (deleteError) {
        throw deleteError;
      }

      router.refresh();
    } catch (error) {
      console.error(
        "Albüm tamamen silinirken hata:",
        error
      );

      window.alert(
        "Albüm silinirken bir hata oluştu. Lütfen tekrar deneyin."
      );
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className={styles.actions}>
      <button
        type="button"
        className={styles.orderButton}
        onClick={() => move("up")}
        disabled={
          !canMoveUp ||
          isMoving ||
          isDeleting
        }
        title="Yukarı taşı"
        aria-label={`${title} albümünü yukarı taşı`}
      >
        <ArrowUp size={15} />
      </button>

      <button
        type="button"
        className={styles.orderButton}
        onClick={() => move("down")}
        disabled={
          !canMoveDown ||
          isMoving ||
          isDeleting
        }
        title="Aşağı taşı"
        aria-label={`${title} albümünü aşağı taşı`}
      >
        <ArrowDown size={15} />
      </button>

      <button
        type="button"
        className={styles.deleteButton}
        onClick={handleDelete}
        disabled={
          isDeleting ||
          isMoving
        }
      >
        {isDeleting ? (
          <LoaderCircle
            size={15}
            className={styles.spinner}
          />
        ) : (
          <Trash2 size={15} />
        )}

        Sil
      </button>
    </div>
  );
}