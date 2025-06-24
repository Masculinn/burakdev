import { useIsMobile } from "@/hooks/use-mobile";
import { ReduxThemeProps } from "@/interfaces";
import extractTextFromReactNode from "@/utils/extractTextFromReactNode";
import { FC } from "react";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";

const CodeProvider = dynamic(() => import("@/components/code-provider"), {
  ssr: false,
});

export const MdPre: FC<React.HTMLAttributes<HTMLPreElement>> = ({
  className,
  ...props
}) => {
  const isMobile = useIsMobile();
  const font = isMobile ? "sm" : "md";
  const theme = useSelector((state: { theme: ReduxThemeProps }) => state.theme);
  const code = extractTextFromReactNode(props.children).trim();

  if (code === "" || !code) return null;

  return (
    <CodeProvider
      code={code}
      appTheme={theme}
      bordered
      wrapperStyle="h-auto max-h-max my-6"
      fontSize={font}
      lang={props.lang}
      rounded
    />
  );
};
