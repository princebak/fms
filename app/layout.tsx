import "./globals.css";
import "@/app/styles/custom.css";
import "bootstrap/dist/css/bootstrap.min.css";

export const metadata = {
  title: "FMS - Home",
  description: `Manage all your business or private files online`,
  authors: [
    {
      name: "Prince Bakenga",
      url: "https://fms-taupe.vercel.app/",
    },
  ],
  keywords: ["file", "management", "file management", "folder"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.css"
          integrity="sha256-NAxhqDvtY0l4xn+YVa6WjAcmd94NNfttjNsDmNatFVc="
          crossOrigin="anonymous"
        />
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
        <link rel="shortcut icon" href="/images/fsm_logo1.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
