import { FC, useEffect, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { usePost } from "@/hooks/use-post";
import { Skeleton } from "@/components/ui/skeleton";

interface ActionsProps {
  like: number | string;
  view: number | string;
  blog_id: number;
}

const Actions: FC<ActionsProps> = ({ like, view, blog_id }) => {
  const numericLike = Number(like);
  const numericView = Number(view);

  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(numericLike);

  const { error, handleLike, handleView, loading } = usePost();

  useEffect(() => {
    const viewKey = `blog_viewed_${blog_id}`;
    const likeKey = `blog_liked_${blog_id}`;
    if (!localStorage.getItem(viewKey)) {
      handleView(blog_id);
      localStorage.setItem(viewKey, "true");
    }
    setIsLiked(!!localStorage.getItem(likeKey));
    setLikeCount(numericLike);
  }, [blog_id]);

  const toggleLike = async () => {
    if (loading) return;

    const newLikedState = !isLiked;
    try {
      await handleLike(blog_id, newLikedState);

      setIsLiked(newLikedState);
      setLikeCount((prev) => (newLikedState ? prev + 1 : prev - 1));

      const likeKey = `blog_liked_${blog_id}`;
      newLikedState
        ? localStorage.setItem(likeKey, "true")
        : localStorage.removeItem(likeKey);
    } catch (err) {
      console.error("Error toggling like:", err);
    }
  };

  if (error) {
    return null;
  }

  return (
    <div className="flex flex-row gap-4">
      <div className="flex items-center gap-2 font-mono">
        <button
          className={cn(isLiked ? "text-red-500" : "")}
          onClick={toggleLike}
          disabled={loading}
        >
          {isLiked ? <FaHeart /> : <FaRegHeart />}
        </button>
        {loading ? <Skeleton className="h-5 w-5" /> : <span>{likeCount}</span>}
      </div>
      <div className="flex items-center gap-2 font-mono">
        <FaEye />
        <span>{numericView}</span>
      </div>
    </div>
  );
};

export default Actions;
