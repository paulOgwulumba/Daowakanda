import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
       <Head>
          <title> Wakanda DAO</title>
          <meta charSet="utf-8" />
          <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
          />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

          <meta
              name="image"
              content="https://res.cloudinary.com/dkuwhyun7/image/upload/v1709861971/Group_5_wz7m5r.pngg"
          />
          <link
              rel="shortcut icon"
              href="https://res.cloudinary.com/dkuwhyun7/image/upload/v1709861971/Group_5_wz7m5r.png"
          />
          <link
              rel="apple-touch-icon"
              href="https://res.cloudinary.com/dkuwhyun7/image/upload/v1709861971/Group_5_wz7m5r.png"
          />

          <link
              href="https://fonts.googleapis.com/css2?family=Titillium+Web&display=swap"
              rel="stylesheet"
          />

          <link
              href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
              rel="stylesheet"
          />

          <link
              href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
              rel="stylesheet"
          />

          <link
              href="https://fonts.googleapis.com/css2?family=Familjen+Grotesk:wght@400;500;600;700&display=swap"
              rel="stylesheet"
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet" />
        </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
