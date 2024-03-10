import components from "@/source/components/comps";
import "@/styles/globals.css";
import { apiPlugin, storyblokInit } from "@storyblok/react";
import type { AppProps } from "next/app";



storyblokInit({
  accessToken: process.env.TOKEN,
  use: [apiPlugin],
  components:components
})

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}