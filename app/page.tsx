"use client";

import Image from "next/image";
import CreateFileModal from "@/app/components/modal/CreateFileModal";
import EditUserModal from "@/app/components/modal/EditUserModal";

export default function Home() {
  return (
    <>
      <div className="container">
        <div className="row">
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

                        {/*   <div
                          className="modal fade"
                          id="editFSMModal"
                          tabIndex={-1}
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5
                                  className="modal-title"
                                  id="exampleModalLabel"
                                >
                                  Create
                                </h5>
                                <button
                                  type="button"
                                  className="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                ></button>
                              </div>
                              <div className="modal-body">
                                <Accordion items={accordionItems} />
                              </div>
                            </div>
                          </div>
                        </div> */}
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
                <div className="row mt-4">
                  <div className="col-lg-3 col-sm-6">
                    <div className="card shadow-none border">
                      <div className="card-body p-3">
                        <div>
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <i className="bx bxs-folder h1 mb-0 text-warning"></i>
                            </div>
                            <div className="avatar-group">
                              <div className="avatar-group-item">
                                <a href="#" className="d-inline-block">
                                  <img
                                    src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                    alt="img"
                                    className="rounded-circle avatar-sm"
                                  />
                                </a>
                              </div>
                              <div className="avatar-group-item">
                                <a href="#" className="d-inline-block">
                                  <img
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
                              </div>
                            </div>
                          </div>
                          <div className="d-flex mt-3">
                            <div className="overflow-hidden me-auto">
                              <h5 className="font-size-15 text-truncate mb-1">
                                <a href="#" className="text-body">
                                  Analytics
                                </a>
                              </h5>
                              <p className="text-muted text-truncate mb-0">
                                12 Files
                              </p>
                            </div>
                            <div className="align-self-end ms-2">
                              <p className="text-muted mb-0 font-size-13">
                                <i className="mdi mdi-clock"></i> 15 min ago
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-3 col-sm-6">
                    <div className="card shadow-none border">
                      <div className="card-body p-3">
                        <div>
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <i className="mdi mdi-file-document align-middle text-primary h1 mb-0"></i>{" "}
                            </div>
                            <div className="avatar-group">
                              <div className="avatar-group-item">
                                <a href="#" className="d-inline-block">
                                  <img
                                    src="https://bootdey.com/img/Content/avatar/avatar3.png"
                                    alt="img"
                                    className="rounded-circle avatar-sm"
                                  />
                                </a>
                              </div>
                              <div className="avatar-group-item">
                                <a href="#" className="d-inline-block">
                                  <img
                                    src="https://bootdey.com/img/Content/avatar/avatar4.png"
                                    alt="img"
                                    className="rounded-circle avatar-sm"
                                  />
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className="d-flex mt-3">
                            <div className="overflow-hidden me-auto">
                              <h5 className="font-size-15 text-truncate mb-1">
                                <a href="#" className="text-body">
                                  Sketch Design
                                </a>
                              </h5>
                              <p className="text-muted text-truncate mb-0">
                                235 Files
                              </p>
                            </div>
                            <div className="align-self-end ms-2">
                              <p className="text-muted mb-0 font-size-13">
                                <i className="mdi mdi-clock"></i> 23 min ago
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-3 col-sm-6">
                    <div className="card shadow-none border">
                      <div className="card-body p-3">
                        <div>
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <i className="bx bxs-folder h1 mb-0 text-warning"></i>
                            </div>
                            <div className="avatar-group">
                              <div className="avatar-group-item">
                                <a href="#" className="d-inline-block">
                                  <div className="avatar-sm">
                                    <span className="avatar-title rounded-circle bg-info text-white font-size-16">
                                      K
                                    </span>
                                  </div>
                                </a>
                              </div>
                              <div className="avatar-group-item">
                                <a href="#" className="d-inline-block">
                                  <img
                                    src="https://bootdey.com/img/Content/avatar/avatar5.png"
                                    alt="img"
                                    className="rounded-circle avatar-sm"
                                  />
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className="d-flex mt-3">
                            <div className="overflow-hidden me-auto">
                              <h5 className="font-size-15 text-truncate mb-1">
                                <a href="#" className="text-body">
                                  Applications
                                </a>
                              </h5>
                              <p className="text-muted text-truncate mb-0">
                                20 Files
                              </p>
                            </div>
                            <div className="align-self-end ms-2">
                              <p className="text-muted mb-0 font-size-13">
                                <i className="mdi mdi-clock"></i> 45 min ago
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-3 col-sm-6">
                    <div className="card shadow-none border">
                      <div className="card-body p-3">
                        <div>
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <i className="bx bxs-folder h1 mb-0 text-warning"></i>
                            </div>
                            <div className="avatar-group">
                              <div className="avatar-group-item">
                                <a href="#" className="d-inline-block">
                                  <div className="avatar-sm">
                                    <span className="avatar-title rounded-circle bg-info text-white font-size-16">
                                      K
                                    </span>
                                  </div>
                                </a>
                              </div>
                              <div className="avatar-group-item">
                                <a href="#" className="d-inline-block">
                                  <img
                                    src="https://bootdey.com/img/Content/avatar/avatar5.png"
                                    alt="img"
                                    className="rounded-circle avatar-sm"
                                  />
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className="d-flex mt-3">
                            <div className="overflow-hidden me-auto">
                              <h5 className="font-size-15 text-truncate mb-1">
                                <a href="#" className="text-body">
                                  Applications
                                </a>
                              </h5>
                              <p className="text-muted text-truncate mb-0">
                                20 Files
                              </p>
                            </div>
                            <div className="align-self-end ms-2">
                              <p className="text-muted mb-0 font-size-13">
                                <i className="mdi mdi-clock"></i> 45 min ago
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6">
                    <div className="card shadow-none border">
                      <div className="card-body p-3">
                        <div>
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <i className="bx bxs-folder h1 mb-0 text-warning"></i>
                            </div>
                            <div className="avatar-group">
                              <div className="avatar-group-item">
                                <a href="#" className="d-inline-block">
                                  <img
                                    src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                    alt="img"
                                    className="rounded-circle avatar-sm"
                                  />
                                </a>
                              </div>
                              <div className="avatar-group-item">
                                <a href="#" className="d-inline-block">
                                  <img
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
                              </div>
                            </div>
                          </div>
                          <div className="d-flex mt-3">
                            <div className="overflow-hidden me-auto">
                              <h5 className="font-size-15 text-truncate mb-1">
                                <a href="#" className="text-body">
                                  Analytics
                                </a>
                              </h5>
                              <p className="text-muted text-truncate mb-0">
                                12 Files
                              </p>
                            </div>
                            <div className="align-self-end ms-2">
                              <p className="text-muted mb-0 font-size-13">
                                <i className="mdi mdi-clock"></i> 15 min ago
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-3 col-sm-6">
                    <div className="card shadow-none border">
                      <div className="card-body p-3">
                        <div>
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <i className="bx bxs-folder h1 mb-0 text-warning"></i>
                            </div>
                            <div className="avatar-group">
                              <div className="avatar-group-item">
                                <a href="#" className="d-inline-block">
                                  <img
                                    src="https://bootdey.com/img/Content/avatar/avatar3.png"
                                    alt="img"
                                    className="rounded-circle avatar-sm"
                                  />
                                </a>
                              </div>
                              <div className="avatar-group-item">
                                <a href="#" className="d-inline-block">
                                  <img
                                    src="https://bootdey.com/img/Content/avatar/avatar4.png"
                                    alt="img"
                                    className="rounded-circle avatar-sm"
                                  />
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className="d-flex mt-3">
                            <div className="overflow-hidden me-auto">
                              <h5 className="font-size-15 text-truncate mb-1">
                                <a href="#" className="text-body">
                                  Sketch Design
                                </a>
                              </h5>
                              <p className="text-muted text-truncate mb-0">
                                235 Files
                              </p>
                            </div>
                            <div className="align-self-end ms-2">
                              <p className="text-muted mb-0 font-size-13">
                                <i className="mdi mdi-clock"></i> 23 min ago
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-3 col-sm-6">
                    <div className="card shadow-none border">
                      <div className="card-body p-3">
                        <div>
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <i className="bx bxs-folder h1 mb-0 text-warning"></i>
                            </div>
                            <div className="avatar-group">
                              <div className="avatar-group-item">
                                <a href="#" className="d-inline-block">
                                  <div className="avatar-sm">
                                    <span className="avatar-title rounded-circle bg-info text-white font-size-16">
                                      K
                                    </span>
                                  </div>
                                </a>
                              </div>
                              <div className="avatar-group-item">
                                <a href="#" className="d-inline-block">
                                  <img
                                    src="https://bootdey.com/img/Content/avatar/avatar5.png"
                                    alt="img"
                                    className="rounded-circle avatar-sm"
                                  />
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className="d-flex mt-3">
                            <div className="overflow-hidden me-auto">
                              <h5 className="font-size-15 text-truncate mb-1">
                                <a href="#" className="text-body">
                                  Applications
                                </a>
                              </h5>
                              <p className="text-muted text-truncate mb-0">
                                20 Files
                              </p>
                            </div>
                            <div className="align-self-end ms-2">
                              <p className="text-muted mb-0 font-size-13">
                                <i className="mdi mdi-clock"></i> 45 min ago
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-3 col-sm-6">
                    <div className="card shadow-none border">
                      <div className="card-body p-3">
                        <div>
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <i className="bx bxs-folder h1 mb-0 text-warning"></i>
                            </div>
                            <div className="avatar-group">
                              <div className="avatar-group-item">
                                <a href="#" className="d-inline-block">
                                  <div className="avatar-sm">
                                    <span className="avatar-title rounded-circle bg-info text-white font-size-16">
                                      K
                                    </span>
                                  </div>
                                </a>
                              </div>
                              <div className="avatar-group-item">
                                <a href="#" className="d-inline-block">
                                  <img
                                    src="https://bootdey.com/img/Content/avatar/avatar5.png"
                                    alt="img"
                                    className="rounded-circle avatar-sm"
                                  />
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className="d-flex mt-3">
                            <div className="overflow-hidden me-auto">
                              <h5 className="font-size-15 text-truncate mb-1">
                                <a href="#" className="text-body">
                                  Applications
                                </a>
                              </h5>
                              <p className="text-muted text-truncate mb-0">
                                20 Files
                              </p>
                            </div>
                            <div className="align-self-end ms-2">
                              <p className="text-muted mb-0 font-size-13">
                                <i className="mdi mdi-clock"></i> 45 min ago
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-center">
                  <nav aria-label="Page navigation example">
                    <ul className="pagination">
                      <li className="page-item">
                        <a className="page-link" href="#">
                          Previous
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          1
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          2
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          3
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          Next
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>

                <div className="d-flex flex-wrap">
                  <h5 className="font-size-16 me-3" id="recents">
                    Recently Opened
                  </h5>
                  <div className="ms-auto">
                    <a href="#all" className="fw-medium text-reset">
                      <span
                        style={{ textDecoration: "underline", color: "blue" }}
                      >
                        Sees All
                      </span>
                    </a>
                  </div>
                </div>
                <hr className="mt-2" />
                <div className="table-responsive">
                  <table className="table align-middle table-nowrap table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Date modified</th>
                        <th scope="col">Size</th>
                        <th scope="col" colSpan={2}>
                          Members
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <a href="#" className="text-dark fw-medium">
                            <i className="mdi mdi-file-document font-size-16 align-middle text-primary me-2"></i>{" "}
                            index.html
                          </a>
                        </td>
                        <td>12-10-2020, 09:45</td>
                        <td>09 KB</td>
                        <td>
                          <div className="avatar-group">
                            <div className="avatar-group-item">
                              <a href="#" className="d-inline-block">
                                <img
                                  src="https://bootdey.com/img/Content/avatar/avatar6.png"
                                  alt="img"
                                  className="rounded-circle avatar-sm"
                                />
                              </a>
                            </div>
                            <div className="avatar-group-item">
                              <a href="#" className="d-inline-block">
                                <img
                                  src="https://bootdey.com/img/Content/avatar/avatar7.png"
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
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="dropdown">
                            <a
                              className="font-size-16 text-muted"
                              role="button"
                              data-bs-toggle="dropdown"
                              aria-haspopup="true"
                            >
                              <i className="mdi mdi-dots-horizontal"></i>
                            </a>
                            <div className="dropdown-menu dropdown-menu-end">
                              <a className="dropdown-item" href="#">
                                Open
                              </a>
                              <a className="dropdown-item" href="#">
                                Edit
                              </a>
                              <a className="dropdown-item" href="#">
                                Rename
                              </a>
                              <div className="dropdown-divider"></div>
                              <a className="dropdown-item" href="#">
                                Remove
                              </a>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <a href="#" className="text-dark fw-medium">
                            <i className="mdi mdi-folder-zip font-size-16 align-middle text-warning me-2"></i>{" "}
                            Project-A.zip
                          </a>
                        </td>
                        <td>11-10-2020, 17:05</td>
                        <td>115 KB</td>
                        <td>
                          <div className="avatar-group">
                            <div className="avatar-group-item">
                              <a href="#" className="d-inline-block">
                                <img
                                  src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                  alt="img"
                                  className="rounded-circle avatar-sm"
                                />
                              </a>
                            </div>
                            <div className="avatar-group-item">
                              <a href="#" className="d-inline-block">
                                <img
                                  src="https://bootdey.com/img/Content/avatar/avatar2.png"
                                  alt="img"
                                  className="rounded-circle avatar-sm"
                                />
                              </a>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="dropdown">
                            <a
                              className="font-size-16 text-muted"
                              role="button"
                              data-bs-toggle="dropdown"
                              aria-haspopup="true"
                            >
                              <i className="mdi mdi-dots-horizontal"></i>
                            </a>
                            <div className="dropdown-menu dropdown-menu-end">
                              <a className="dropdown-item" href="#">
                                Open
                              </a>
                              <a className="dropdown-item" href="#">
                                Edit
                              </a>
                              <a className="dropdown-item" href="#">
                                Rename
                              </a>
                              <div className="dropdown-divider"></div>
                              <a className="dropdown-item" href="#">
                                Remove
                              </a>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <a href="#" className="text-dark fw-medium">
                            <i className="mdi mdi-image font-size-16 align-middle text-muted me-2"></i>{" "}
                            Img-1.jpeg
                          </a>
                        </td>
                        <td>11-10-2020, 13:26</td>
                        <td>86 KB</td>
                        <td>
                          <div className="avatar-group">
                            <div className="avatar-group-item">
                              <a href="#" className="d-inline-block">
                                <div className="avatar-sm">
                                  <span className="avatar-title rounded-circle bg-info text-white font-size-16">
                                    K
                                  </span>
                                </div>
                              </a>
                            </div>
                            <div className="avatar-group-item">
                              <a href="#" className="d-inline-block">
                                <img
                                  src="https://bootdey.com/img/Content/avatar/avatar3.png"
                                  alt="img"
                                  className="rounded-circle avatar-sm"
                                />
                              </a>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="dropdown">
                            <a
                              className="font-size-16 text-muted"
                              role="button"
                              data-bs-toggle="dropdown"
                              aria-haspopup="true"
                            >
                              <i className="mdi mdi-dots-horizontal"></i>
                            </a>
                            <div className="dropdown-menu dropdown-menu-end">
                              <a className="dropdown-item" href="#">
                                Open
                              </a>
                              <a className="dropdown-item" href="#">
                                Edit
                              </a>
                              <a className="dropdown-item" href="#">
                                Rename
                              </a>
                              <div className="dropdown-divider"></div>
                              <a className="dropdown-item" href="#">
                                Remove
                              </a>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <a href="#" className="text-dark fw-medium">
                            <i className="mdi mdi-text-box font-size-16 align-middle text-muted me-2"></i>{" "}
                            update list.txt
                          </a>
                        </td>
                        <td>10-10-2020, 11:32</td>
                        <td>08 KB</td>
                        <td>
                          <div className="avatar-group">
                            <div className="avatar-group-item">
                              <a href="#" className="d-inline-block">
                                <img
                                  src="https://bootdey.com/img/Content/avatar/avatar4.png"
                                  alt="img"
                                  className="rounded-circle avatar-sm"
                                />
                              </a>
                            </div>
                            <div className="avatar-group-item">
                              <a href="#" className="d-inline-block">
                                <img
                                  src="https://bootdey.com/img/Content/avatar/avatar5.png"
                                  alt="img"
                                  className="rounded-circle avatar-sm"
                                />
                              </a>
                            </div>
                            <div className="avatar-group-item">
                              <a href="#" className="d-inline-block">
                                <img
                                  src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                  alt="img"
                                  className="rounded-circle avatar-sm"
                                />
                              </a>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="dropdown">
                            <a
                              className="font-size-16 text-muted"
                              role="button"
                              data-bs-toggle="dropdown"
                              aria-haspopup="true"
                            >
                              <i className="mdi mdi-dots-horizontal"></i>
                            </a>
                            <div className="dropdown-menu dropdown-menu-end">
                              <a className="dropdown-item" href="#">
                                Open
                              </a>
                              <a className="dropdown-item" href="#">
                                Edit
                              </a>
                              <a className="dropdown-item" href="#">
                                Rename
                              </a>
                              <div className="dropdown-divider"></div>
                              <a className="dropdown-item" href="#">
                                Remove
                              </a>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <a href="#" className="text-dark fw-medium">
                            <i className="mdi mdi-folder font-size-16 align-middle text-warning me-2"></i>{" "}
                            Project B
                          </a>
                        </td>
                        <td>10-10-2020, 10:51</td>
                        <td>72 KB</td>
                        <td>
                          <div className="avatar-group">
                            <div className="avatar-group-item">
                              <a href="#" className="d-inline-block">
                                <img
                                  src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                  alt="img"
                                  className="rounded-circle avatar-sm"
                                />
                              </a>
                            </div>
                            <div className="avatar-group-item">
                              <a href="#" className="d-inline-block">
                                <img
                                  src="https://bootdey.com/img/Content/avatar/avatar3.png"
                                  alt="img"
                                  className="rounded-circle avatar-sm"
                                />
                              </a>
                            </div>
                            <div className="avatar-group-item">
                              <a href="#" className="d-inline-block">
                                <div className="avatar-sm">
                                  <span className="avatar-title rounded-circle bg-danger text-white font-size-16">
                                    3+
                                  </span>
                                </div>
                              </a>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="dropdown">
                            <a
                              className="font-size-16 text-muted"
                              role="button"
                              data-bs-toggle="dropdown"
                              aria-haspopup="true"
                            >
                              <i className="mdi mdi-dots-horizontal"></i>
                            </a>
                            <div className="dropdown-menu dropdown-menu-end">
                              <a className="dropdown-item" href="#">
                                Open
                              </a>
                              <a className="dropdown-item" href="#">
                                Edit
                              </a>
                              <a className="dropdown-item" href="#">
                                Rename
                              </a>
                              <div className="dropdown-divider"></div>
                              <a className="dropdown-item" href="#">
                                Remove
                              </a>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <a href="#" className="text-dark fw-medium">
                            <i className="mdi mdi-text-box font-size-16 align-middle text-muted me-2"></i>{" "}
                            Changes list.txt
                          </a>
                        </td>
                        <td>09-10-2020, 17:05</td>
                        <td>07 KB</td>
                        <td>
                          <div className="avatar-group">
                            <div className="avatar-group-item">
                              <a href="#" className="d-inline-block">
                                <img
                                  src="https://bootdey.com/img/Content/avatar/avatar4.png"
                                  alt="img"
                                  className="rounded-circle avatar-sm"
                                />
                              </a>
                            </div>
                            <div className="avatar-group-item">
                              <a href="#" className="d-inline-block">
                                <img
                                  src="https://bootdey.com/img/Content/avatar/avatar6.png"
                                  alt="img"
                                  className="rounded-circle avatar-sm"
                                />
                              </a>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="dropdown">
                            <a
                              className="font-size-16 text-muted"
                              role="button"
                              data-bs-toggle="dropdown"
                              aria-haspopup="true"
                            >
                              <i className="mdi mdi-dots-horizontal"></i>
                            </a>
                            <div className="dropdown-menu dropdown-menu-end">
                              <a className="dropdown-item" href="#">
                                Open
                              </a>
                              <a className="dropdown-item" href="#">
                                Edit
                              </a>
                              <a className="dropdown-item" href="#">
                                Rename
                              </a>
                              <div className="dropdown-divider"></div>
                              <a className="dropdown-item" href="#">
                                Remove
                              </a>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <a href="#" className="text-dark fw-medium">
                            <i className="mdi mdi-image font-size-16 align-middle text-success me-2"></i>{" "}
                            Img-2.png
                          </a>
                        </td>
                        <td>09-10-2020, 15:12</td>
                        <td>31 KB</td>
                        <td>
                          <div className="avatar-group">
                            <div className="avatar-group-item">
                              <a href="#" className="d-inline-block">
                                <div className="avatar-sm">
                                  <span className="avatar-title rounded-circle bg-pink text-white font-size-16">
                                    L
                                  </span>
                                </div>
                              </a>
                            </div>
                            <div className="avatar-group-item">
                              <a href="#" className="d-inline-block">
                                <img
                                  src="https://bootdey.com/img/Content/avatar/avatar2.png"
                                  alt="img"
                                  className="rounded-circle avatar-sm"
                                />
                              </a>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="dropdown">
                            <a
                              className="font-size-16 text-muted"
                              role="button"
                              data-bs-toggle="dropdown"
                              aria-haspopup="true"
                            >
                              <i className="mdi mdi-dots-horizontal"></i>
                            </a>
                            <div className="dropdown-menu dropdown-menu-end">
                              <a className="dropdown-item" href="#">
                                Open
                              </a>
                              <a className="dropdown-item" href="#">
                                Edit
                              </a>
                              <a className="dropdown-item" href="#">
                                Rename
                              </a>
                              <div className="dropdown-divider"></div>
                              <a className="dropdown-item" href="#">
                                Remove
                              </a>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <a href="#" className="text-dark fw-medium">
                            <i className="mdi mdi-folder font-size-16 align-middle text-warning me-2"></i>{" "}
                            Project C
                          </a>
                        </td>
                        <td>09-10-2020, 10:11</td>
                        <td>20 KB</td>
                        <td>
                          <div className="avatar-group">
                            <div className="avatar-group-item">
                              <a href="#" className="d-inline-block">
                                <img
                                  src="https://bootdey.com/img/Content/avatar/avatar4.png"
                                  alt="img"
                                  className="rounded-circle avatar-sm"
                                />
                              </a>
                            </div>
                            <div className="avatar-group-item">
                              <a href="#" className="d-inline-block">
                                <img
                                  src="https://bootdey.com/img/Content/avatar/avatar5.png"
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
                            </div>
                            <div className="avatar-group-item">
                              <a href="#" className="d-inline-block">
                                <img
                                  src="https://bootdey.com/img/Content/avatar/avatar2.png"
                                  alt="img"
                                  className="rounded-circle avatar-sm"
                                />
                              </a>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="dropdown">
                            <a
                              className="font-size-16 text-muted"
                              role="button"
                              data-bs-toggle="dropdown"
                              aria-haspopup="true"
                            >
                              <i className="mdi mdi-dots-horizontal"></i>
                            </a>
                            <div className="dropdown-menu dropdown-menu-end">
                              <a className="dropdown-item" href="#">
                                Open
                              </a>
                              <a className="dropdown-item" href="#">
                                Edit
                              </a>
                              <a className="dropdown-item" href="#">
                                Rename
                              </a>
                              <div className="dropdown-divider"></div>
                              <a className="dropdown-item" href="#">
                                Remove
                              </a>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <a href="#" className="text-dark fw-medium">
                            <i className="bx bxs-file font-size-16 align-middle text-primary me-2"></i>{" "}
                            starter-page.html
                          </a>
                        </td>
                        <td>08-10-2020, 03:22</td>
                        <td>11 KB</td>
                        <td>
                          <div className="avatar-group">
                            <div className="avatar-group-item">
                              <a href="#" className="d-inline-block">
                                <img
                                  src="https://bootdey.com/img/Content/avatar/avatar8.png"
                                  alt="img"
                                  className="rounded-circle avatar-sm"
                                />
                              </a>
                            </div>
                            <div className="avatar-group-item">
                              <a href="#" className="d-inline-block">
                                <img
                                  src="https://bootdey.com/img/Content/avatar/avatar2.png"
                                  alt="img"
                                  className="rounded-circle avatar-sm"
                                />
                              </a>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="dropdown">
                            <a
                              className="font-size-16 text-muted"
                              role="button"
                              data-bs-toggle="dropdown"
                              aria-haspopup="true"
                            >
                              <i className="mdi mdi-dots-horizontal"></i>
                            </a>
                            <div className="dropdown-menu dropdown-menu-end">
                              <a className="dropdown-item" href="#">
                                Open
                              </a>
                              <a className="dropdown-item" href="#">
                                Edit
                              </a>
                              <a className="dropdown-item" href="#">
                                Rename
                              </a>
                              <div className="dropdown-divider"></div>
                              <a className="dropdown-item" href="#">
                                Remove
                              </a>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
