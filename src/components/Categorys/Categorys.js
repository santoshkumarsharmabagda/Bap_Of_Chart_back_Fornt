import React, { useState } from "react";
// import AddData from "./AddData";
import { ToastContainer, toast } from "react-toastify";
import axios from "../../Interceptor";
import { useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import Pagination from 'react-bootstrap/Pagination';  

function Categorys() {
  const [categories, setcategories] = useState("");
  const [categoryData, setcategoryData] = useState([]);
  const [categoryid, setcategoryid] = useState("");
  const [subCategorie, setsubCategorie] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  // const [currentPage, setCurrentPage] = useState(0);
  // const itemsPerPage = 10;

  // const handlePrevious = () => {
  //   if (currentPage > 0) {
  //     setCurrentPage(currentPage - 1);
  //   }
  // };

  // const handleNext = () => {
  //   const totalPages = Math.ceil(categoryData.length / itemsPerPage);
  //   if (currentPage < totalPages - 1) {
  //     setCurrentPage(currentPage + 1);
  //   }
  // };

  const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage] = useState(10);

  
  const addCategory = async () => {
    try {
      await axios
        .post("/bap/admin/create/category", {
          category: categories,
        })
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
            getCategories();
            handleClose();
            setcategories("")
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
          console.log(response.data);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const getCategories = async () => {
    try {
      await axios.get("/bap/admin/category").then((response) => {
        console.log(response.data);
        if (response.data.status == 1) {
          setcategoryData(response.data.categories);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  const addSubCategory = async () => {
    try {
      await axios
        .post("/bap/admin/create/sub/category", {
          category_id: JSON.stringify(categoryid),
          sub_category: subCategorie,
        })
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
            getCategories();
            handleClose1();
            setsubCategorie("");
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
            handleClose1();
          }
          console.log(response.data);
        });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);

  // const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = categoryData.slice(indexOfFirstItem, indexOfLastItem);

  const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = categoryData.slice(indexOfFirstItem, indexOfLastItem);
const paginate = (pageNumber) => {
  setCurrentPage(pageNumber);
};

const totalPages = Math.ceil(categoryData.length / itemsPerPage);

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
        className="container bg-dark mt-1"
        style={{
          borderRadius: "10px",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          color: "white",
          cursor: "pointer",
        }}
      >
        <div className="containers">
          <div
            className="items mt-2"
            // data-bs-toggle="modal"
            // data-bs-target="#staticBackdrop"
            onClick={handleShow}
          >
            <p
              className="text p-2"
              style={{
                backgroundColor: "#5D2A42",
                width: "30vh",
                textAlign: "center",
                borderRadius: "10px",
                color: "white",
              }}
            >
              Add Category
            </p>
          </div>
        </div>
      </div>

      <div>
        <div
          className="container-fluid m-0 p-0 mt-1 example"
          style={{ height: "65vh", overflowY: "auto" }}
        >
            <div className="table m-0 p-2" style={{ background: "#212529", color: "#fff", width: "100%", borderRadius: "10px" }}>
        {currentItems.map((card, index) => (
          <div
            key={index}
            className="m-2 mt-3 pb-2"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid white",
            }}
          >
            <span>{card.category}</span>
            <button
              className="m-0 p-1"
              style={{ background: "#5d2a42", color: "white" }}
              onClick={() => {
                setcategoryid(card.id);
                handleShow1();
              }}
            >
              +Add Subcategory
            </button>
          </div>
        ))}
      </div>
        </div>

        {/* <div className="d-flex justify-content-center mt-3">
        <Pagination>
          <Pagination.Prev onClick={handlePrevious} disabled={currentPage === 0} />
          <Pagination.Item active>
            {currentPage + 1}
          </Pagination.Item>
          <Pagination.Next onClick={handleNext} disabled={currentPage === Math.ceil(categoryData.length / itemsPerPage) - 1} />
        </Pagination>
      </div> */}
      <div className="d-flex justify-content-center mt-3">
      <Pagination>
  <Pagination.First onClick={() => paginate(1)} />
  <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
  {Array.from({ length: totalPages }).map((_, index) => (
    <Pagination.Item key={index} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
      {index + 1}
    </Pagination.Item>
  ))}
  <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} />
  <Pagination.Last onClick={() => paginate(totalPages)} />
</Pagination>

    </div>
      </div>


      {/* add category modal started  */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered={true}
      >
        <Modal.Header className="border-0" closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pb-5 pt-0 mb-5 mt-5" >
        <div
                className="w-75 m-auto"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <input
                  type="text"
                  placeholder="enter category name"
                  className="py-2 px-2"
                  value={categories}
                  onChange={(e) => {
                    setcategories(e.target.value);
                  }}

                  onKeyPress={(e) => {
                if (e.key === "Enter") {
                  if (!categories) {
                    toast.error("Please enter a category name.", {
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
                    addCategory();
                  }
                }
              }}
                />
                <button
                  className="py-2 mt-3"
                  onClick={addCategory}
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  Add Category
                </button>
              </div>
        </Modal.Body>
      </Modal>
      {/* add category modal end  */}

      {/* add subcategory modal started  */}
      <Modal show={show1} onHide={handleClose1} backdrop="static" keyboard={false} centered={true}>
        <Modal.Header className="border-0" closeButton>
          <Modal.Title>Add SubCategory</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pb-5 pt-0 mb-5 mt-5">
          <div className="w-75 m-auto" style={{ display: "flex", flexDirection: "column" }}>
            <input
              type="text"
              placeholder="enter subcategory name"
              className="py-2 px-2"
              value={subCategorie}
              onChange={(e) => {
                setsubCategorie(e.target.value);
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  if (!subCategorie) {
                    toast.error("Please enter a subcategory name.", {
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
                    addSubCategory();
                  }
                }
              }}
            />
            <button className="py-2 mt-3" onClick={addSubCategory}>
              Add SubCategory
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Categorys;
