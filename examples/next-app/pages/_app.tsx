import type { AppProps } from "next/app";

if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  const { initPerfKit } = require("@perfkit/devtools");
  initPerfKit(); // initialize overlay
}

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
