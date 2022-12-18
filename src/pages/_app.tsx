import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import MainLayout from "../components/layouts/MainLayout";
import DataContextProvider from "../context/DataContext";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <DataContextProvider>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </DataContextProvider>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
