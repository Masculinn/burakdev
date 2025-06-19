import { BlogPost, UseNavigationProps } from "@/interfaces";
import _ from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const DEFAULT_PROPS: UseNavigationProps = {
  parent: {
    name: "",
    url: "",
  },
};

export const useNavigation = () => {
  const { pathname } = useRouter();
  const { id } = useSelector(
    (state: { blog: Omit<BlogPost, "content"> }) => state.blog
  );
  const paths = pathname.split("/");
  const filteredPaths = paths.filter((val) => !_.isEmpty(val));
  const pureName = filteredPaths.map((val) => val.split("-").join(" "));
  const removeChildSlash = pureName[1];
  const removeParentSlash = pureName[0];
  const [props, setProps] = useState<UseNavigationProps | null>(DEFAULT_PROPS);

  useEffect(() => {
    if (filteredPaths.length !== 1) {
      if (removeChildSlash === "[slug]") {
        setProps({
          parent: {
            name: removeParentSlash,
            url: `/${filteredPaths[0]}`,
          },
        });
      } else {
        setProps({
          parent: {
            name: removeParentSlash,
            url: `/${filteredPaths[0]}`,
          },
          child: {
            name: removeChildSlash,
            url: `/${filteredPaths[0]}/${filteredPaths[1]}`,
          },
        });
      }
    } else {
      setProps({
        parent: {
          name: removeParentSlash,
          url: `/${filteredPaths[0]}`,
        },
      });
    }
  }, [id, pathname]);

  return props as UseNavigationProps;
};
