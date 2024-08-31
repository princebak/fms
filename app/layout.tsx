"use client";

import "./globals.css";
import "@/app/styles/custom.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import EditUserModal from "./components/modal/EditUserModal";

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

        <title>FMS</title>
      </head>
      <body>
        <div className="container" style={{ height: "100vh" }}>
          <header className="row">
            <div className="container">
              <div className="px-3 py-2 bg-dark text-white row">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start p-2">
                  <a
                    href="#bootstrap"
                    className="d-flex gap-1 justify-items-center align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none"
                  >
                    <Image
                      className="bi d-block mx-auto mb-1"
                      width="24"
                      height="24"
                      src={"/images/fsm_logo1.png"}
                      alt="Image"
                    />
                    <span>Files Management System</span>
                  </a>

                  <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
                    <li>
                      <EditUserModal />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </header>

          <div style={{ marginTop: "-10px" }} className="row">
            <div className="card">
              <div className="card-body">{children}</div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
