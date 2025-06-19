import { useNavigation } from "@/hooks/use-navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Skeleton } from "../ui/skeleton";

export const NavigationBreadcrumb = () => {
  const navigation = useNavigation();

  if (!navigation) {
    return (
      <div className="space-y-2 pt-2">
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-4 w-[175px]" />
      </div>
    );
  }

  const { parent, child } = navigation;

  return (
    <Breadcrumb className="w-full h-auto py-8">
      <BreadcrumbList>
        <BreadcrumbItem className="capitalize">
          <BreadcrumbLink href={parent?.url || "/"}>
            {parent?.name ?? "Home"}
          </BreadcrumbLink>
        </BreadcrumbItem>
        {child?.name && <BreadcrumbSeparator className="hidden md:block" />}
        {child && (
          <BreadcrumbItem className="capitalize">
            <BreadcrumbLink href={child.url}>{child.name}</BreadcrumbLink>
          </BreadcrumbItem>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
