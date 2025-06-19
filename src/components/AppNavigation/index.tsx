import _ from "lodash";
import { FC, memo, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { sidebarConfig } from "@/lib/sidebar.config";
import { SidebarNavMainItemProps } from "@/interfaces";
import { Skeleton } from "../ui/skeleton";
import { useRouter } from "next/router";

function collectAllItems(items: any[]): any[] {
  return _.flatMap(items, (item) => {
    const subItems = item.items ? collectAllItems(item.items) : [];
    return [_.pick(item, ["title", "url"]), ...subItems];
  });
}

const AppNavigation: FC = () => {
  const { pathname } = useRouter();
  const [routes, setRoutes] = useState<SidebarNavMainItemProps[]>([]);

  const items = collectAllItems(_.flatMap(sidebarConfig));
  const filteredItems = _.filter(items, (item) => !_.isEmpty(item));

  useEffect(() => {
    if (filteredItems.length === 0) {
      setRoutes([]);
      return;
    }

    const idx = filteredItems.findIndex((item) => item.url === pathname);

    if (idx === -1) {
      setRoutes([]);
      return;
    }

    const prevIdx = idx === 0 ? filteredItems.length - 1 : idx - 1;
    const nextIdx = idx === filteredItems.length - 1 ? 0 : idx + 1;

    setRoutes([filteredItems[prevIdx], filteredItems[nextIdx]]);
  }, [pathname]);

  if (pathname.includes("/blogs/")) {
    return null;
  }

  if (routes.length < 2) {
    return (
      <section className="w-full mt-8 items-center justify-between flex flex-row gap-4">
        <Skeleton className="w-36 h-10" />
        <Skeleton className="w-36 h-10" />
      </section>
    );
  }

  return (
    <>
      <section className="w-full mt-8 items-center justify-between flex flex-row gap-4">
        <Link href={routes[0]?.url}>
          <Button
            className="capitalize truncate lg:max-w-max max-w-36 text-xs lg:text-sm"
            variant="outline"
          >
            <ArrowLeft />
            {routes[0]?.title}
          </Button>
        </Link>
        <Link href={routes[1]?.url}>
          <Button className="capitalize truncate lg:max-w-max max-w-36 text-xs lg:text-sm">
            {routes[1]?.title}
            <ArrowRight />
          </Button>
        </Link>
      </section>
    </>
  );
};

export default memo(AppNavigation);
