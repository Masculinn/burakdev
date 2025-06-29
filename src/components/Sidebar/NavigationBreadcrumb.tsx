import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "../ui/breadcrumb";
import { Skeleton } from "../ui/skeleton";
import { useRouter } from "next/router";

export const NavigationBreadcrumb = () => {
  const { pathname } = useRouter();

  if (!pathname) {
    return (
      <div className="space-y-2 pt-2">
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-4 w-[175px]" />
      </div>
    );
  }

  const currPath = pathname === "/" ? "home" : pathname.slice(1);

  if (currPath.includes("/")) {
    return <Breadcrumb className="w-full h-auto py-8"></Breadcrumb>;
  }

  return (
    <Breadcrumb className="w-full h-auto py-8">
      <BreadcrumbList>
        <BreadcrumbItem className="capitalize">
          <BreadcrumbLink href={`/${currPath}`}>{currPath}</BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
