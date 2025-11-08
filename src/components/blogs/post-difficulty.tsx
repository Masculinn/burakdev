import Ping from "../ping";
import { Badge } from "../ui/badge";

export const PostDifficulty = ({
  level,
  clasName,
}: {
  level: number;
  clasName?: string;
}) => {
  const postLvl = level === 1 ? "success" : level === 2 ? "warning" : "error";
  const postLvlText =
    level === 1 ? "Beginner" : level === 2 ? "Intermediate" : "Advanced";
  return (
    <Badge className={clasName} variant="secondary">
      <Ping mode={postLvl} size="sm" />
      <span>{postLvlText}</span>
    </Badge>
  );
};
