import { CookieContext } from "../contexts";
import { useCookieStates } from "../hooks";

export default function CookieProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const states = useCookieStates();

  return (
    <CookieContext.Provider value={states}>{children}</CookieContext.Provider>
  );
}
