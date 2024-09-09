"use client";

import Image from "next/image";
import CreateFileModal from "@/app/components/modal/CreateFileModal";
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
import DownloadButton from "@/app/components/DownloadButton";

export default function DashboardPage() {
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

  useEffect(() => {
    const navbar: any = document.getElementById("stickyNavbar");

    // Add event listener for scroll
    window.addEventListener("scroll", checkScrollPosition);

    function checkScrollPosition() {
      // Get the current scroll position
      const currentPosition = window.scrollY;

      // Check if we've reached the top of the viewport
      if (currentPosition >= navbar.offsetHeight) {
        navbar.classList.add("stickyNavbar");
        navbar.classList.add("container");
      } else {
        navbar.classList.remove("container");
        navbar.classList.remove("stickyNavbar");
      }
    }

    // Initial check
    checkScrollPosition();
  }, []);

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
      const res = await getAllFiles("", page, search); // currentUser?._id, page, search //
      console.log("My FILES>> ", res);
      setMyFiles(res?.content);
      setPageLimit(res?.pageLimit);
      setTotalElements(res?.totalElements);
      setPage(res?.currentPage);
      setTotalPages(res?.totalPages);
      totPages = res?.totalPages;

      return true;
    };

    const loadData = async () => {
      setIsLoading(true);

      const res = await loadProductList();
      if (res) {
        let myPagesNo = [];
        for (let index = 1; index <= totPages; index++) {
          myPagesNo.push(index);
        }
        setPages([...myPagesNo]);
      }
      setIsLoading(false);
    };

    loadData();
  }, [page, search, refreshTime]);

  useEffect(() => {
    const loadRecentFiles = async () => {
      const res = await getRecentFiles(""); // currentUser?._id
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
    <div>
      <div
        className="d-flex justify-content-between align-items-center flex-wrap relativePosition"
        id="stickyNavbar"
      >
        <input
          type="text"
          className="form-control bg-light border-light rounded"
          placeholder="Search..."
          onChange={handleSearch}
          style={{ minWidth: "300px", maxWidth: "600px" }}
        />

        <CreateFileModal />
      </div>

      <div className="d-flex flex-wrap">
        <h5 className="font-size-16 me-3 mb-0" id="all">
          My Folders and Files
        </h5>
        <div className="ms-auto">
          <a href="#recents" className="fw-medium text-reset">
            <span style={{ textDecoration: "underline", color: "blue" }}>
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
      ) : myFiles?.length > 0 ? (
        <>
          <div className="row mt-4">
            {myFiles?.map((file: any, index: number) => (
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
                          onClick={() => updateLastVisitedTime(file._id)}
                        >
                          {file.isContainer ? (
                            <i className="bx bxs-folder h1 mb-0 text-warning"></i>
                          ) : (
                            <Image
                              width={100}
                              height={100}
                              src={getFileExtensionLogoPath(file.extension)}
                              alt="Logo"
                            />
                          )}
                        </a>

                        <div className="avatar-group">
                          <DownloadButton
                            fileName={file.name}
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
                            onClick={() => updateLastVisitedTime(file._id)}
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
                              {getLastVisitedTimeInterval(file.visited)}
                            </label>
                            <label className="text-muted text-truncate">
                              <UpdateFileModal
                                id={file._id}
                                refreshData={() => setRefreshTime(new Date())}
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
                {pages?.map((p) => (
                  <li key={p} className="page-item">
                    <a
                      className={`page-link ${p === page ? "active" : ""}`}
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
        ) : recentFiles?.length < 1 ? (
          <NoData />
        ) : (
          <table className="table align-middle table-nowrap table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Visited date</th>
                <th scope="col">Size</th>
                <th scope="col">Download</th>
                <th scope="col">More</th>
              </tr>
            </thead>
            <tbody>
              {recentFiles?.map((file: any) => (
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
  );
}
