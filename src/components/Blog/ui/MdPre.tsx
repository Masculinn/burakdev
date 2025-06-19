import CodeProvider from "@/components/Documentation/code-provider";
import { useIsMobile } from "@/hooks/use-mobile";
import { ReduxThemeProps } from "@/interfaces";
import extractTextFromReactNode from "@/utils/extractTextFromReactNode";
import _ from "lodash";
import { FC } from "react";
import { useSelector } from "react-redux";

export const MdPre: FC<React.HTMLAttributes<HTMLPreElement>> = ({
  className,
  ...props
}) => {
  const isMobile = useIsMobile();
  const font = isMobile ? "sm" : "md";
  const theme = useSelector((state: { theme: ReduxThemeProps }) => state.theme);
  const code = extractTextFromReactNode(props.children).trim();

  if (_.isEmpty(code)) return null;

  return (
    <CodeProvider
      code={code}
      appTheme={theme}
      bordered
      wrapperStyle="h-auto max-h-max"
      fontSize={font}
      lang={props.lang}
      rounded
    />
  );
};
