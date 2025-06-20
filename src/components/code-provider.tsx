import { CodeProviderProps } from "@/interfaces";
import { FC, memo, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  a11yDark,
  a11yLight,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import copyCode from "@/utils/copyCode";
import { Badge } from "@/components/ui/badge";
import MotionContainer from "./MotionProvider/motion-container";

const CodeProvider: FC<CodeProviderProps> = ({
  code,
  lang,
  desc,
  appTheme = "dark",
  wrapperStyle,
  fontSize = "md",
  bordered = false,
  reverseTheme = false,
  rounded,
  showLineNumbers,
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    copyCode(code).then(() => setIsCopied(true));
    setTimeout(() => setIsCopied(false), 1000);
  };

  const borderColor = bordered
    ? appTheme !== "dark"
      ? "1px solid rgba(0, 0, 0, 0.1)"
      : "1px solid rgba(255, 255, 255, 0.1)"
    : "none";
  if (!code) return null;

  return (
    <div className={cn("flex h-full relative", wrapperStyle)}>
      {desc && (
        <Badge className="font-semibold absolute bottom-4 right-4 z-50">
          {desc}
        </Badge>
      )}
      <div
        className={cn("bg-transparent overflow-y-scroll w-full h-full flex")}
      >
        <SyntaxHighlighter
          language={lang ?? "typescript"}
          style={appTheme === "dark" ? a11yDark : a11yLight}
          customStyle={{
            backgroundColor: `${appTheme === "dark" && "rgba(0, 0, 0, 0)"}`,
            padding: "2rem",
            fontSize: fontSize === "md" ? "1rem" : "0.75rem",
            width: "100%",
            height: "100%",
            border: borderColor,
            borderRadius: rounded ? "0.5rem" : "none",
            position: "relative",
          }}
          children={code?.toString()}
          showLineNumbers={showLineNumbers}
        />
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          className="absolute top-2 right-4"
        >
          <MotionContainer
            configView={{ once: false, amount: 0.5 }}
            mode={["fadeIn", "filterBlurIn"]}
            isControlled={{ trigger: !isCopied }}
            delay={0.5}
            elementType={"div"}
            transition="smooth"
          >
            {!isCopied ? (
              <Copy
                className={
                  appTheme !== "dark" && reverseTheme
                    ? "text-white"
                    : reverseTheme
                    ? "text-black"
                    : ""
                }
              />
            ) : (
              <Check
                className={
                  appTheme !== "dark" && reverseTheme
                    ? "text-white"
                    : reverseTheme
                    ? "text-black"
                    : ""
                }
              />
            )}
          </MotionContainer>
        </Button>
      </div>
    </div>
  );
};

export default memo(CodeProvider);
