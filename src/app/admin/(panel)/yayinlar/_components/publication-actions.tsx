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

import styles from "./publication-actions.module.css";

type PublicationActionsProps = {
  id: string;
  title: string;
  year: number;
  sortOrder: number;
  canMoveUp: boolean;
  canMoveDown: boolean;
};

export default function PublicationActions({
  id,
  title,
  year,
  sortOrder,
  canMoveUp,
  canMoveDown,
}: PublicationActionsProps) {
  const router = useRouter();
  const supabase = createClient();

  const [isDeleting, setIsDeleting] = useState(false);
  const [isMoving, setIsMoving] = useState(false);

  async function move(direction: "up" | "down") {
    if (isMoving) {
      return;
    }

    setIsMoving(true);

    try {
      const comparison =
        direction === "up" ? "lt" : "gt";

      const orderAscending =
        direction === "down";

      let query = supabase
        .from("publications")
        .select("id, sort_order")
        .eq("publication_year", year);

      if (comparison === "lt") {
        query = query.lt("sort_order", sortOrder);
      } else {
        query = query.gt("sort_order", sortOrder);
      }

      const { data: neighbour, error: neighbourError } =
        await query
          .order("sort_order", {
            ascending: orderAscending,
          })
          .limit(1)
          .maybeSingle();

      if (neighbourError) {
        throw neighbourError;
      }

      if (!neighbour) {
        return;
      }

      const neighbourOrder = neighbour.sort_order;

      const { error: currentError } = await supabase
        .from("publications")
        .update({
          sort_order: neighbourOrder,
        })
        .eq("id", id);

      if (currentError) {
        throw currentError;
      }

      const { error: neighbourUpdateError } =
        await supabase
          .from("publications")
          .update({
            sort_order: sortOrder,
          })
          .eq("id", neighbour.id);

      if (neighbourUpdateError) {
        throw neighbourUpdateError;
      }

      router.refresh();
    } catch (error) {
      console.error("Yayın sıralama hatası:", error);
      window.alert(
        "Yayın sıralaması değiştirilirken bir hata oluştu."
      );
    } finally {
      setIsMoving(false);
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      `"${title}" başlıklı yayını silmek istediğinizden emin misiniz?`
    );

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);

    try {
      const { error } = await supabase
        .from("publications")
        .delete()
        .eq("id", id);

      if (error) {
        throw error;
      }

      router.refresh();
    } catch (error) {
      console.error("Yayın silme hatası:", error);

      window.alert(
        "Yayın silinirken bir hata oluştu."
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
        disabled={!canMoveUp || isMoving || isDeleting}
        title="Yukarı taşı"
        aria-label={`${title} yayınını yukarı taşı`}
      >
        <ArrowUp size={15} />
      </button>

      <button
        type="button"
        className={styles.orderButton}
        onClick={() => move("down")}
        disabled={!canMoveDown || isMoving || isDeleting}
        title="Aşağı taşı"
        aria-label={`${title} yayınını aşağı taşı`}
      >
        <ArrowDown size={15} />
      </button>

      <button
        type="button"
        className={styles.deleteButton}
        onClick={handleDelete}
        disabled={isDeleting || isMoving}
      >
        {isDeleting ? (
          <LoaderCircle
            size={15}
            className={styles.spinner}
          />
        ) : (
          <Trash2 size={15} />
        )}

        <span>Sil</span>
      </button>
    </div>
  );
}