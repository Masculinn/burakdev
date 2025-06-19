import "@/styles/globals.css";

import { ReduxSidebarProps } from "@/interfaces";
import SidebarProvider from "@/providers/SidebarProvider";
import StoreProvider from "@/providers/StoreProvider";
import { setSidebar } from "@/redux/slices/sidebarSlice";
import { AnimatePresence } from "framer-motion";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Script from "next/script";

const GA_TRACKING_ID =
  process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || "G-7QPY625E4T";

function AppContent({ Component, pageProps, router }: AppProps) {
  const currPage = router.pathname;
  const dispatch = useDispatch();

  const appSidebar = useSelector(
    (state: { sidebar: ReduxSidebarProps }) => state.sidebar
  );

  useEffect(() => {
    if (currPage && currPage.includes("/projects")) {
      dispatch(setSidebar(false));
    } else {
      dispatch(setSidebar(true));
    }
  }, [currPage]);

  return (
    <>
      <AnimatePresence mode="wait" presenceAffectsLayout custom={currPage}>
        {appSidebar ? (
          <SidebarProvider>
            <Component {...pageProps} key={currPage} />
          </SidebarProvider>
        ) : (
          <Component {...pageProps} key={currPage} />
        )}
      </AnimatePresence>
    </>
  );
}

export default function App(props: AppProps) {
  return (
    <StoreProvider>
      <AppContent {...props} />
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `}
      </Script>
    </StoreProvider>
  );
}
