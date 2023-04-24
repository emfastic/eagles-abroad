import Head from "next/head";
import React from "react";

export default function CustomHead() {
  return (
    <Head>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="##FFD700" />
      <meta name="msapplication-TileColor" content="#800000" />
      <meta name="theme-color" content="#ffffff"></meta>
      <meta name="og:image" content="/og-image"></meta>
      <meta
        name="description"
        content="Eagles Abroad - Explore Boston College study abroad programs and opportunities, learn from students' experiences, and prepare for your own adventure."
      ></meta>
      <meta
        name="keywords"
        content="study abroad, Boston College, Eagles Abroad, international education, exchange programs, semester abroad, summer programs"
      ></meta>
      <title>Eagles Abroad</title>
    </Head>
  );
}
