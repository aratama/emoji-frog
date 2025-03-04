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
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
}
