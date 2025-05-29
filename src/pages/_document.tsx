import { Html, Main, NextScript, Head } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head title="Next-TRPC">
        <meta name="title" content="Next-TRPC" />
        <meta name="keywords" content="Next-TRPC" />
        <meta name="description" content="Next-TRPC Description" />

        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        {/* <link rel="apple-touch-icon" href="/logo192.png" /> */}
        {/* <link rel="manifest" href="/manifest.json" /> */}
      </Head>
      <body className="transition-[font-size] duration-[font-size]-1000 ease-in-out">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
