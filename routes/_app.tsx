import { PageProps } from "$fresh/server.ts";

export default function Layout({ Component }: PageProps) {
  return (
    <html lang="ja">
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
        <meta property="og:image" content="/ogp.png" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Emoji Frog" />
        <meta property="og:url" content="https://emoji-frog.deno.dev/" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Emoji Frog - 絵文字加工ツール" />
        <meta
          name="twitter:description"
          content="選択した絵文字のSVG画像を生成AIで加工するツール"
        />
        <meta name="twitter:image" content="/ogp.png" />
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
}
