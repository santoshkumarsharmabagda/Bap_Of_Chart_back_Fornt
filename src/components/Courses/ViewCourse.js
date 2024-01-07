import React, { useState, useEffect } from "react";
import axios from "../../Interceptor";
import { ToastContainer, toast } from "react-toastify";
import Lottie from "lottie-react";
import animationData from "../Courses/ani.json";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";

const ViewCourse = () => {
  const location = useLocation();
  const [videoDetails, setvideoDetails] = useState([]);
  const [courseId, setcourseId] = useState("");
  const [CourseName, setCourseName] = useState("");
  const [tum, settum] = useState("");
  const [video, setvideo] = useState("");
  const [is_free, setis_free] = useState();
  const [assignment_name, setassignment_name] = useState();
  const [assignment_file, setassignment_file] = useState();
  const [waitingLobby, setWaitingLobby] = useState(0);
  const [vid, setvid] = useState("");
  const [data, setdata] = useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteVideo = async (videoId) => {
    try {
      await axios
        .delete(`/bap/admin/delete/video?video_id=${videoId}`)
        .then((response) => {
          if (response.data.status == 1) {
            toast.success("🦄 " + response.data.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            GetVideo();
          }

          // console.log(response.data);
        });
    } catch (e) {
      console.log(e);
    }
  };
  const addVideo = async () => {
    try {
      const formData = new FormData();
      formData.append("course_name", CourseName);
      formData.append("thumbnail", tum[0]);
      formData.append("video", video[0]);
      setWaitingLobby(1);
      await axios
        .post(`/bap/admin/create/video?course_id=${location.state}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.status == 1) {
            setWaitingLobby(0);
            GetVideo();
            toast.success("🦄 " + response.data.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            handleClose();
            setCourseName("");
            settum("");
            setvideo("");
          }
        });
    } catch (e) {
      console.log(e);
    }
  };

  const freeVideo = async (id) => {
    try {
      const newIsFreeState = !is_free; // Calculate the new is_free state

      await axios
        .post(`/bap/admin/add/free/video?video_id=${id}`, {
          is_free: newIsFreeState, // Use the new state in the API call
        })
        .then((response) => {
          toast.success("🦄 " + response.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          GetVideo();

          // Update the is_free state immediately to reflect the new state
          setis_free(newIsFreeState);

          setis_free(2);
        });
    } catch (e) {
      console.log(e);
    }
  };
  const addAssignment = async () => {
    // alert(location.id)
    const formData = new FormData();
    formData.append("assignment_name", assignment_name);
    formData.append("assignment_file", assignment_file[0]);
    try {
      await axios
        .post(
          `/bap/admin/add/addAssignment?course_id=${location.state}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          console.log(response.data);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const GetVideo = async () => {
    try {
      await axios
        .get(`/bap/admin/get/videos/bycourseId?course_id=${location.state}`)
        .then((response) => {
          console.log(response.data, "videos by course");
          // setcourseDetail(response.data.course)
          if (response.data.status == 1) {
            //   alert(response.data.data);
            console.log(response.data.data);
            setvideoDetails(response.data.data);
            setvid(response.data.data[0].course_videos);
          } else {
            toast.error("🦄 " + response.data.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    GetVideo();
  }, []);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div
        className="container-fluid m-0 p-0 mt-1 example"
        style={{ height: "79vh", overflowY: "auto", overflowX: "hidden" }}
      >
        <div className="row">
          <div className="col-lg-12">
            <div
              className="p-2"
              style={{
                color: "white",
                width: "100%",
                borderRadius: "10px",
                background: "#212529",
              }}
            >
              <h3 className="text-center">Course Details</h3>
              <button
                class="btn btn-success"
                type="button"
                onClick={handleShow}
              >
                Add Video
              </button>
              <button
                class="btn btn-warning ms-4"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Add Assignment
              </button>
              <div
                class="modal fade"
                id="exampleModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-dialog-centered">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5
                        class="modal-title"
                        id="exampleModalLabel"
                        style={{ color: "black" }}
                      >
                        Add Assignment
                      </h5>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <label
                        for="exampleFormControlInput1"
                        class="form-label mt-2 fs-5"
                      >
                        Assignment Name
                      </label>
                      <input
                        class="form-control"
                        type="text"
                        placeholder="Assignment Name"
                        aria-label="default input example"
                        onChange={(e) => {
                          setassignment_name(e.target.value);
                        }}
                      ></input>
                      <label
                        for="exampleFormControlInput1"
                        class="form-label mt-2 fs-5"
                      >
                        Assignment
                      </label>
                      <input
                        class="form-control"
                        type="file"
                        placeholder="Enter Video Name"
                        aria-label="default input example"
                        onChange={(e) => {
                          setassignment_file(e.target.files);
                        }}
                      ></input>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        class="btn btn-primary"
                        onClick={addAssignment}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div
                class="offcanvas offcanvas-end"
                tabindex="-1"
                id="offcanvasRight"
                aria-labelledby="offcanvasRightLabel"
              >
                <div class="offcanvas-header">
                  <h5 id="offcanvasRightLabel">Offcanvas right</h5>
                  <button
                    type="button"
                    class="btn-close text-reset"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="offcanvas-body">
                  {waitingLobby === 0 ? (
                    <>
                      <h2 style={{ color: "black", textAlign: "center" }}>
                        Add Course
                      </h2>
                      <label
                        for="exampleFormControlInput1"
                        class="form-label mt-2 fs-5"
                      >
                        Video Name
                      </label>
                      <input
                        class="form-control"
                        type="text"
                        placeholder="Enter Video Name"
                        aria-label="default input example"
                        onChange={(e) => {
                          setCourseName(e.target.value);
                        }}
                      ></input>
                      <label
                        for="exampleFormControlInput1"
                        class="form-label mt-2 fs-5"
                      >
                        thumbnail
                      </label>
                      <input
                        class="form-control"
                        type="file"
                        placeholder="thumbnail"
                        aria-label="default input example"
                        onChange={(e) => {
                          settum(e.target.files);
                        }}
                      ></input>
                      <label
                        for="exampleFormControlInput1"
                        class="form-label mt-2 fs-5"
                      >
                        Video
                      </label>
                      <input
                        class="form-control"
                        type="file"
                        placeholder="video"
                        aria-label="default input example"
                        onChange={(e) => {
                          setvideo(e.target.files);
                        }}
                      />

                      <button
                        className="btn btn-primary w-100 mt-4"
                        onClick={addVideo}
                      >
                        {" "}
                        Add Video{" "}
                      </button>
                    </>
                  ) : (
                    <>
                      <div>
                        <Lottie
                          animationData={animationData}
                          loop={true}
                          autoplay={true}
                          className="w-100 m-auto"
                        />
                        <p style={{ color: "black" }} className="text-center">
                          Please wait....
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div> */}

              <Offcanvas
                show={show}
                placement={"end"}
                onHide={handleClose}
                backdrop="static"
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>Add Video</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  {waitingLobby === 0 ? (
                    <>
                      <label
                        for="exampleFormControlInput1"
                        class="form-label mt-2 fs-5"
                      >
                        Video Name
                      </label>
                      <input
                        class="form-control"
                        type="text"
                        placeholder="Enter Video Name"
                        aria-label="default input example"
                        value={CourseName}
                        onChange={(e) => {
                          setCourseName(e.target.value);
                        }}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            if (!CourseName) {
                              toast.error("Please enter video name.", {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "colored",
                              });
                            } else {
                              addVideo()
                            }
                          }
                        }}
                      ></input>
                      <label
                        for="exampleFormControlInput1"
                        class="form-label mt-2 fs-5"
                      >
                        thumbnail
                      </label>
                      <input
                        class="form-control"
                        type="file"
                        placeholder="thumbnail"
                        aria-label="default input example"
                        onChange={(e) => {
                          settum(e.target.files);
                        }}
                      ></input>
                      <label
                        for="exampleFormControlInput1"
                        class="form-label mt-2 fs-5"
                      >
                        Video
                      </label>
                      <input
                        class="form-control"
                        type="file"
                        placeholder="video"
                        aria-label="default input example"
                        onChange={(e) => {
                          setvideo(e.target.files);
                        }}
                      />

                      <button
                        className="btn btn-primary w-100 mt-4"
                        onClick={() => {
                          if (!CourseName) {
                              toast.error("Please enter video name.", {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "colored",
                              });
                            }
                          else if(tum.length === 0) {
                            toast.error("Please select a thumbnail", {
                              position: "top-right",
                              autoClose: 5000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "colored",
                            });
                          } else if (video.length === 0) {
                            toast.error("Please select a video", {
                              position: "top-right",
                              autoClose: 5000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "colored",
                            });
                          } else {
                            addVideo();
                          }
                        }}
                      >
                        {" "}
                        Add Video{" "}
                      </button>
                    </>
                  ) : (
                    <>
                      <div>
                        <Lottie
                          animationData={animationData}
                          loop={true}
                          autoplay={true}
                          className="w-100 m-auto"
                        />
                        <p style={{ color: "black" }} className="text-center">
                          Please wait....
                        </p>
                      </div>
                    </>
                  )}
                </Offcanvas.Body>
              </Offcanvas>

              <div className="mt-5">
                <h5> Course Name : {videoDetails[0]?.course_name}</h5>
                <h5> Course Price : {videoDetails[0]?.price}</h5>
              </div>

              <h3 className="mt-5">Course Details</h3>

              <table className="w-100">
                <thead>
                  <tr>
                    <th style={{ color: "white" }}>Course Id</th>
                    <th style={{ color: "white" }}>video Name</th>
                  </tr>
                </thead>
                <tbody>
                  {videoDetails?.map((item, index) => {
                    return (
                      <tr
                        style={{ borderBottom: "1px solid white" }}
                        className="pb-5"
                      >
                        <td className="p-1">{item.course_id}</td>
                        <td className="p-1">{item.video_name}</td>
                        <td className="p-1">
                          <button
                            className="btn btn-primary"
                            style={{ color: "white" }}
                            onClick={() => {
                              deleteVideo(item.id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                        <td className="p-1">
                          <button
                            className="btn btn-primary"
                            style={
                              item.is_free === 1
                                ? { color: "white" }
                                : { color: "red", backgroundColor: "black" }
                            }
                            onClick={() => {
                              freeVideo(item.id);
                            }}
                          >
                            Is Free
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewCourse;
