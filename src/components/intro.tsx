import { ComponentLibraryIntroProps } from "@/interfaces";
import { cn } from "@/lib/utils";
import { FC } from "react";

const CardBody: FC<ComponentLibraryIntroProps> = ({ description, title }) => (
  <div className={cn("text-left")}>
    <h1 className="text-xl lg:text-2xl  font-bold lg:mb-4 mb-2 text-gray-900 dark:text-gray-100">
      {title}
    </h1>
    <p className="text-gray-700 dark:text-gray-300">{description}</p>
  </div>
);

export const IntroCard: FC<ComponentLibraryIntroProps> = (props) => {
  const Line = ({ className = "" }) => (
    <div
      className={cn(
        "h-px w-full via-zinc-400 from-[1%] from-zinc-200 to-zinc-600 absolute -z-0 dark:via-zinc-700 dark:from-zinc-900 dark:to-zinc-500",
        className
      )}
    />
  );
  const Container = ({ children }: { children: React.ReactNode }) => (
    <div
      className={`relative mx-auto w-full px-4 sm:px-6 md:px-8 ${props.wrapperClassName}`}
    >
      <Line className="bg-gradient-to-l left-0 top-2 sm:top-4 md:top-6" />
      <Line className="bg-gradient-to-r bottom-2 sm:bottom-4 md:bottom-6 left-0" />

      <Line className="w-px bg-gradient-to-t right-2 sm:right-4 md:right-6 h-full inset-y-0" />
      <Line className="w-px bg-gradient-to-t left-2 sm:left-4 md:left-6 h-full inset-y-0" />
      <div className="relative z-20 mx-auto py-8">{children}</div>
    </div>
  );

  return (
    <Container>
      <div className="p-4 w-full center">
        <CardBody {...props} />
      </div>
    </Container>
  );
};
