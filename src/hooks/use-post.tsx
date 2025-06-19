import { useState } from "react";
import { db } from "@/db";

export const usePost = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleView = async (blogID: number) => {
    try {
      const localStorageKey = `blog_viewed_${blogID}`;

      const visited = localStorage.getItem(localStorageKey);
      if (visited) return;

      setLoading(true);

      const { error } = await db.rpc("increment_view", {
        blog_id: blogID,
      });

      if (error) throw new Error(error.message);

      localStorage.setItem(localStorageKey, "true");
    } catch (err: any) {
      setError(
        err.message || "An error occurred while incrementing view count."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (blogID: number, mode: boolean) => {
    try {
      setLoading(true);

      const { error } = await db.rpc("update_like", {
        blog_id: blogID,
        increment: mode,
      });

      if (error) throw new Error(error.message);
    } catch (err: any) {
      setError(err.message || "An error occurred while liking the blog.");
    } finally {
      setLoading(false);
    }
  };

  return {
    handleView,
    /**
     *
     * @param blogID id of the blog
     * @param mode if true incrementing if false decrementing like value
     */
    handleLike,
    loading,
    error,
  };
};
