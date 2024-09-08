"use client";

import { persistor, store } from "@/redux/store";
import Image from "next/image";
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import EditUserModal from "../components/modal/EditUserModal";
import { SessionProvider } from "next-auth/react";

const ProvidersLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SessionProvider>
          <div className="container" style={{ height: "100vh" }}>
            <header className="row">
              <div className="container">
                <div className="px-3 py-2 bg-dark text-white row">
                  <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start p-2">
                    <a
                      href="/"
                      className="d-flex gap-1 justify-items-center align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none"
                    >
                      <div
                        style={{
                          width: "24px",
                          height: "24px",
                        }}
                      >
                        <Image
                          className="bi d-block mx-auto mb-1"
                          width="24"
                          height="24"
                          src={"/images/fsm_logo1.png"}
                          alt="Image"
                          style={{
                            objectFit: "cover",
                          }}
                        />
                      </div>

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
        </SessionProvider>
      </PersistGate>
    </Provider>
  );
};

export default ProvidersLayout;
