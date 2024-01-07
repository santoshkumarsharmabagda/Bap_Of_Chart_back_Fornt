import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../Interceptor";
import { ToastContainer, toast } from "react-toastify";
import Lottie from 'lottie-react';
import animationData from '../Courses/ani.json'


function AllCourse({ refreshCourses,setRefreshCourses }) {

  const [changeState, setChangeState] = useState(0);
  const [isAddVideoSuccess, setIsAddVideoSuccess] = useState(false);
  const Navigate = useNavigate();
  // const NavData = {}
  console.log(changeState);
  const [data, setdata] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [isClicked2, setIsClicked2] = useState(false);
  const [chak, setchak] = useState(false);
  const [videoDetails, setvideoDetails] = useState([]);
 const [vid, setvid] = useState("")

 const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const navigate = useNavigate();

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage);
  };

  const paginate = (items, currentPage, itemsPerPage) => {
    const startIndex = currentPage * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  };

  const course = async () => {
    try {
      await axios.get("/bap/admin/course").then(async function (response) {
        // console.log(response.data.courses, "COURSE successfully");
        if (response.data.status == 1) {
          setdata(response.data.courses);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const popular = async (course_id, is_popular) => {
    try {
      await axios
        .post(`/bap/admin/add/popular?course_id=${course_id}`, {
          is_popular: !is_popular,
        })
        .then(async function (response) {
          console.log(response.data.courses);
          if (response.data.status == 1) {
            // setdata(response.data.courses)
          }
        });
    } catch (e) {
      console.log(e);
    }
  };
  const featured = async (course_id, is_featured) => {
    try {
      await axios
        .post(`/bap/admin/add/featured?course_id=${course_id}`, {
          is_featured: !is_featured,
        })
        .then(async function (response) {
          console.log(response.data.courses);
          if (response.data.status == 1) {
            // setdata(response.data.courses)
          }
        });
    } catch (err) {
      console.log(err);
    }
  };
  const api = async (courseId) => {
    navigate(`/editcourse/${courseId}`);
  };


  const deleteCourse = async (id) => {
    await axios
      .delete(`/bap/admin/delete/course?course_id=${id}`)
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
        course();
      });
  };


  useEffect(() => {
    course();
    if (refreshCourses) {
      // Call the course API when refreshCourses is true
      course();
      // Reset the refreshCourses state to false
      setRefreshCourses(false);
    }
  }, [refreshCourses]);

  // const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
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
        style={{ height: "65vh", overflowY: "auto", overflowX: "hidden" }}
      >
            <table
              className="table bg-dark m-0 p-0"
              style={{ color: "white", width: "100%", borderRadius: "10px" }}
            >
              <thead
                className="bg-dark m-0 p-0"
                style={{ borderRadius: "10px" }}
              >
                <tr>
                  <th style={{ color: "white" }} scope="col">
                    #
                  </th>
                  <th style={{ color: "white" }} scope="col">
                    Name
                  </th>
                  <th style={{ color: "white" }} scope="col">
                    price
                  </th>
                  <th style={{ color: "white" }} scope="col">
                    isFeatured
                  </th>
                  <th style={{ color: "white" }} scope="col">
                    isPopular
                  </th>
                  <th style={{ color: "white" }} scope="col">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody
                className="bg-dark m-0 p-0"
                style={{ width: "100%", borderRadius: "10px" }}
              >
                {paginate(data,currentPage,itemsPerPage).map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <th scope="row" style={{color:"white"}} >{item.id}</th>
                      <td>{item.course_name}</td>
                      <td>{item.price}</td>
                      <td>
                        {isClicked2 == true ? (
                          <input
                            type="checkbox"
                            onChange={(e) => {
                              setchak(!chak);
                              featured(item.id, item.is_featured);
                            }}
                          />
                        ) : (
                          <input
                            type="checkbox"
                            checked={item.is_featured ? true : false}
                            onClick={() => {
                              featured(
                                item.id,
                                item.is_featured,
                                setIsClicked2(true)
                              );
                            }}
                          />
                        )}
                      </td>
                      <td>
                        {isClicked == true ? (
                          <input
                            type="checkbox"
                            value={chak}
                            onChange={(e) => {
                              setchak(!chak);
                              popular(item.id, item.is_popular);
                            }}
                          />
                        ) : (
                          <input
                            type="checkbox"
                            checked={item.is_popular ? true : false}
                            onClick={() => {
                              popular(
                                item.id,
                                item.is_popular,
                                setIsClicked(true)
                              );
                            }}
                          />
                        )}
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn"
                          style={{ backgroundColor: "#5D2A42", color: "white" }}
                          onClick={() => {
                            api(item.id);
                          }}
                        >
                          Edit
                        </button>

                        <button
                          className="btn mx-2"
                          style={{ background: "#5d2a42", color: "white" }}
                          onClick={() => {
                            Navigate('/ViewCourse',{state:item.id})
                          }}
                        >
                          View
                        </button>
                        <button
                          className="btn"
                          style={{ background: "#5d2a42", color: "white" }}
                          onClick={() => {
                            deleteCourse(item.id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>



      </div>

      {/* delete button modal started  */}
      <div
        class="modal fade"
        id="staticBackdropDelete"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-body">
              <h3 className="text-center">Are you sure you want to delete ?</h3>
            </div>
            <div
              class="modal-footer border-0"
              style={{ justifyContent: "space-between" }}
            >
              <button
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                Yes
              </button>
              <button
                type="button"
                class="btn btn-danger"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* delete button modal end  */}


      <div className="d-flex justify-content-center mt-3">
        <nav aria-label="Page navigation">
          <ul className="pagination">
            <li style={{cursor:"pointer"}} className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
              <button className="page-link" style={{cursor:"pointer"}} onClick={() => handlePageChange(currentPage - 1)}>&laquo;</button>
            </li>
            {Array.from({ length: totalPages }).map((_, index) => (
              <li key={index} className={`page-item ${index === currentPage ? 'active' : ''}`}>
                <button className="page-link" style={{cursor:"pointer"}} onClick={() => handlePageChange(index)}>{index + 1}</button>
              </li>
            ))}
            <li style={{cursor:"pointer"}} className={`page-item ${currentPage === totalPages - 1 ? 'disabled' : ''}`}>
              <button className="page-link" style={{cursor:"pointer"}} onClick={() => handlePageChange(currentPage + 1)}>&raquo;</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default AllCourse;
