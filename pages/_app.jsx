import { SessionProvider } from "next-auth/react";
import Nav from "@/components/nav";
import "../styles/globals.scss";
import "../styles/movie.scss";
import "../styles/results.scss";
import "../styles/home.scss";
import { useRouter } from "next/router";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const router = useRouter();
  return (
    <SessionProvider session={session}>
      {router.pathname === "/" ? "" : <Nav />}

      <Component {...pageProps} />
    </SessionProvider>
  );
}
