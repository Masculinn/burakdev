import Ping from "../ping";
import { Badge } from "../ui/badge";

export function PostDifficulty({
  level,
  clasName,
  style,
}: {
  level: number;
  clasName?: string;
  style?: React.CSSProperties;
}) {
  const postLvl =
    level === 1 ? "success" : level === 2 ? "primary" : "destructive";
  const postLvlText =
    level === 1 ? "Beginner" : level === 2 ? "Intermediate" : "Advanced";
  return (
    <Badge className={clasName} variant={postLvl} style={style}>
      <Ping mode={postLvl} size="sm" />
      <span>{postLvlText}</span>
    </Badge>
  );
}
