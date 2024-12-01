import { SessionProvider } from "next-auth/react";
import "../styles/globals.scss";
import "../styles/movie.scss";
import "../styles/results.scss";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
