import { PageProps } from "$fresh/server.ts";
import { ApplicationURL } from "../data/constants.ts";
import { Data } from "./index.tsx";

export default function Layout({ Component, data }: PageProps<Data>) {
  const ogpImage = `${ApplicationURL}ogp.png`;
  const currentLang = data.language;
  return (
    <html lang={currentLang}>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Emoji Frog</title>
        <link rel="stylesheet" href="/styles.css" />
        <link rel="icon" href="/favicon.png" sizes="any" type="image/png" />

        {/* OGP Tags */}
        <meta property="og:title" content="Emoji Frog - 絵文字加工ツール" />
        <meta
          property="og:description"
          content="選択した絵文字のSVG画像を生成AIで加工するツール"
        />
        <meta property="og:image" content={ogpImage} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Emoji Frog" />
        <meta property="og:url" content={ApplicationURL} />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Emoji Frog - 絵文字加工ツール" />
        <meta
          name="twitter:description"
          content="選択した絵文字のSVG画像を生成AIで加工するツール"
        />
        <meta name="twitter:image" content={ogpImage} />
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
}
