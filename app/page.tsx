"use client";

import Image from "next/image";
import CreateFileModal from "@/app/components/modal/CreateFileModal";
import EditUserModal from "@/app/components/modal/EditUserModal";
import { useEffect, useState } from "react";
import {
  getAllFiles,
  getRecentFiles,
  updateFileInfo,
} from "@/services/MyFileService";
import NoData from "@/app/components/NoData";
import Loader from "@/app/components/Loader";
import UpdateFileModal from "@/app/components/modal/UpdateFileModal";
import {
  getFileExtensionLogoPath,
  getFormatedDate,
  getLastVisitedTimeInterval,
} from "@/utils/myFunctions";
import DownloadButton from "./components/DownloadButton";

export default function Home() {
  const [myFiles, setMyFiles] = useState<any>([]);
  const [recentFiles, setRecentFiles] = useState<any>([]);

  // Pagination and Search
  const [page, setPage] = useState<any>(1);
  const [search, setSearch] = useState<any>("");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingRecent, setIsLoadingRecent] = useState(true);
  const [totalElements, setTotalElements] = useState<any>(0);
  const [pageLimit, setPageLimit] = useState<any>();
  const [totalPages, setTotalPages] = useState<any>(0);
  const [refreshTime, setRefreshTime] = useState<any>(null);
  const [pages, setPages] = useState([1]);

  const handlePageChange = (e: any, currentPage: number) => {
    e.preventDefault();
    setPage(currentPage);
  };

  const updateLastVisitedTime = async (id: string) => {
    await updateFileInfo({ id, visited: new Date() });
    setRefreshTime(new Date());
  };

  useEffect(() => {
    let totPages = 0;
    const loadProductList = async () => {
      const res = await getAllFiles("", page, search); // currentUser._id, page, search //
      setMyFiles(res.content);
      setPageLimit(res.pageLimit);
      setTotalElements(res.totalElements);
      setPage(res.currentPage);
      setTotalPages(res.totalPages);
      totPages = res.totalPages;

      return true;
    };

    const loadData = async () => {
      const res = await loadProductList();
      if (res) {
        let myPagesNo = [];
        for (let index = 1; index <= totPages; index++) {
          myPagesNo.push(index);
        }
        setPages([...myPagesNo]);
        setIsLoading(false);
      }
    };

    loadData();
  }, [page, search, refreshTime]);

  useEffect(() => {
    const loadRecentFiles = async () => {
      const res = await getRecentFiles(""); // currentUser._id
      setRecentFiles(res);
      setIsLoadingRecent(false);
    };

    loadRecentFiles();
  }, [refreshTime]);

  const handleSearch = (e: any) => {
    setIsLoading(true);
    setTimeout(() => {
      setSearch(e.target.value);
      setIsLoading(false);
    }, 3000);
  };

  return (
    <>
      <div className="container" style={{ height: "100vh" }}>
        <div className="row" style={{ height: "100vh" }}>
          <header>
            <div className="px-3 py-2 bg-dark text-white">
              <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
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
                    <span>FMS</span>
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

          <div style={{ marginTop: "-10px" }} className="col-xl-12">
            <div className="card">
              <div className="card-body">
                <div className="row mb-3">
                  <div className="col-lg-4 col-sm-6">
                    <div className="search-box mb-2 me-2">
                      <div className="position-relative">
                        <input
                          type="text"
                          className="form-control bg-light border-light rounded"
                          placeholder="Search..."
                          onChange={handleSearch}
                        />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="26"
                          height="26"
                          viewBox="0 0 24 24"
                          className="eva eva-search-outline search-icon"
                        >
                          <g data-name="Layer 2">
                            <g data-name="search">
                              <rect width="24" height="24" opacity={0}></rect>
                              <path d="M20.71 19.29l-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8 7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42zM5 11a6 6 0 1 1 6 6 6 6 0 0 1-6-6z"></path>
                            </g>
                          </g>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-8 col-sm-6">
                    <div className="mt-4 mt-sm-0 d-flex align-items-center justify-content-sm-end">
                      <div className="mb-2 me-2">
                        <CreateFileModal />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="d-flex flex-wrap">
                  <h5 className="font-size-16 me-3 mb-0" id="all">
                    My Folders and Files
                  </h5>
                  <div className="ms-auto">
                    <a href="#recents" className="fw-medium text-reset">
                      <span
                        style={{ textDecoration: "underline", color: "blue" }}
                      >
                        Recents
                      </span>
                    </a>
                  </div>
                </div>
                {/* My Files and Folders */}

                {isLoading ? (
                  <div className="p-8">
                    <Loader />
                  </div>
                ) : myFiles.length > 0 ? (
                  <>
                    <div className="row mt-4">
                      {myFiles.map((file: any, index: number) => (
                        <div key={index} className="col-lg-3 col-sm-6">
                          <div className="card shadow-none border">
                            <div className="card-body p-3">
                              <div className="d-flex flex-column gap-1">
                                <div className="d-flex justify-content-between align-items-center">
                                  <a
                                    href={`/api/downloadFile/${file._id}`}
                                    target="_blank"
                                    style={{
                                      width: "50px",
                                      height: "50px",
                                      cursor: "pointer",
                                    }}
                                    onClick={() =>
                                      updateLastVisitedTime(file._id)
                                    }
                                  >
                                    {file.isContainer ? (
                                      <i className="bx bxs-folder h1 mb-0 text-warning"></i>
                                    ) : (
                                      <Image
                                        width={100}
                                        height={100}
                                        src={getFileExtensionLogoPath(
                                          file.extension
                                        )}
                                        alt="Logo"
                                      />
                                    )}
                                  </a>

                                  <div className="avatar-group">
                                    <DownloadButton
                                      fileName={file.name}
                                      fileKey={file._id}
                                      downloadLink={`/api/downloadFile/${file._id}`}
                                    />
                                    {/* sharing files users */}
                                    {/* <div className="avatar-group-item">
                                      <a href="#" className="d-inline-block">
                                        <Image
                                          width={100}
                                          height={100}
                                          src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                          alt="img"
                                          className="rounded-circle avatar-sm"
                                        />
                                      </a>
                                    </div>
                                    <div className="avatar-group-item">
                                      <a href="#" className="d-inline-block">
                                        <Image
                                          width={100}
                                          height={100}
                                          src="https://bootdey.com/img/Content/avatar/avatar2.png"
                                          alt="img"
                                          className="rounded-circle avatar-sm"
                                        />
                                      </a>
                                    </div>
                                    <div className="avatar-group-item">
                                      <a href="#" className="d-inline-block">
                                        <div className="avatar-sm">
                                          <span className="avatar-title rounded-circle bg-success text-white font-size-16">
                                            A
                                          </span>
                                        </div>
                                      </a>
                                    </div> */}
                                  </div>
                                </div>
                                <div className="d-flex flex-column gap-1">
                                  <h5 className="font-size-15 text-truncate">
                                    <a
                                      href={`/api/downloadFile/${file._id}`}
                                      target="_blank"
                                      className="text-body"
                                      onClick={() =>
                                        updateLastVisitedTime(file._id)
                                      }
                                    >
                                      {file.name}
                                    </a>
                                  </h5>
                                  <div className="d-flex flex-column gap-1">
                                    <div className="d-flex justify-content-between">
                                      <label className="text-muted text-truncate">
                                        File
                                      </label>
                                      <label className="text-muted text-truncate">
                                        {Math.round(file.size / 1000)}
                                        {" KB"}
                                      </label>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                      <label className="text-muted text-truncate">
                                        {getLastVisitedTimeInterval(
                                          file.visited
                                        )}
                                      </label>
                                      <label className="text-muted text-truncate">
                                        <UpdateFileModal
                                          id={file._id}
                                          refreshData={() =>
                                            setRefreshTime(new Date())
                                          }
                                        />
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="d-flex justify-content-center mt-2">
                      <nav aria-label="Page navigation example">
                        <ul className="pagination">
                          <li className="page-item">
                            <a
                              className="page-link"
                              href="#"
                              onClick={(e) => {
                                handlePageChange(e, Number.parseInt(page) - 1);
                              }}
                            >
                              Previous
                            </a>
                          </li>
                          {pages.map((p) => (
                            <li key={p} className="page-item">
                              <a
                                className={`page-link ${
                                  p === page ? "active" : ""
                                }`}
                                href="#"
                                onClick={(e) => {
                                  handlePageChange(e, p);
                                }}
                              >
                                {p}
                              </a>
                            </li>
                          ))}

                          <li className="page-item">
                            <a
                              className="page-link"
                              href="#"
                              onClick={(e) => {
                                handlePageChange(e, Number.parseInt(page) + 1);
                              }}
                            >
                              Next
                            </a>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </>
                ) : (
                  <NoData />
                )}

                {/* Recently Opened */}

                <div className="d-flex flex-wrap">
                  <h5 className="font-size-16 me-3" id="recents">
                    Recently Opened
                  </h5>
                </div>
                <hr className="mt-2" />
                <div className="table-responsive">
                  {isLoadingRecent ? (
                    <div className="p-8">
                      <Loader />
                    </div>
                  ) : recentFiles.length < 1 ? (
                    <NoData />
                  ) : (
                    <table className="table align-middle table-nowrap table-hover mb-0">
                      <thead className="table-light">
                        <tr>
                          <th scope="col">Name</th>
                          <th scope="col">Visited date</th>
                          <th scope="col">Size</th>
                          <th scope="col" colSpan={2}>
                            Download
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentFiles.map((file: any) => (
                          <tr key={file._id}>
                            <td>
                              <a href="#" className="text-dark fw-medium">
                                <i className="mdi mdi-file-document font-size-16 align-middle text-primary me-2"></i>{" "}
                                {file.name}
                              </a>
                            </td>
                            <td>{getFormatedDate(file.visited, true, true)}</td>
                            <td>
                              {Math.round(file.size / 1000)}
                              {" KB"}
                            </td>
                            <td>
                              <div className="avatar-group">
                                <DownloadButton
                                  fileName={file.name}
                                  fileKey={file._id}
                                  downloadLink={`/api/downloadFile/${file._id}`}
                                />
                              </div>
                            </td>
                            <td>
                              <UpdateFileModal
                                id={file._id}
                                refreshData={() => setRefreshTime(new Date())}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
