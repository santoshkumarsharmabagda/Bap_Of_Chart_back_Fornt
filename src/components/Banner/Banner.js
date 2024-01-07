import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "../../Interceptor";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Banner = () => {
  const [getThumbnail, setGetThumbnail] = useState("");
  const [banners, setBanners] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addBanner = async () => {
    try {
      var formData = new FormData();
      formData.append("banner", getThumbnail[0]);
      await axios
        .post(`/bap/admin/add/banner`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response.data);
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
            fetchBanners();
            setGetThumbnail("");
          }
        });
    } catch (e) {
      console.log(e);
    }
  };

  const fetchBanners = async () => {
    try {
      await axios.get("/bap/admin/get/banner").then((response) => {
        console.log(response.data);
        if (response.data.status == 1) {
          setBanners(response.data.message);
          console.log(response.data.status);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteBanner = async (banner_id) => {
    try {
      await axios
        .delete(`/bap/admin/delete/banner?bannerId=${banner_id}`)
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
            fetchBanners();
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBanners();
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
            className="items"
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
              Add Banner
            </p>
          </div>
        </div>
      </div>

      <div
        className="container scrollbar"
        style={{ height: "70vh", overflowY: "auto" }}
      >
        <div className="row mt-3 " style={{ rowGap: "10px" }}>
          {banners.map((banner) => (
            <div className="col-lg-3 col-md-6 col-sm-12" key={banner.id}>
              <div className="card h-100" style={{ width: "100%" }}>
                <img
                  src={banner.banner}
                  className="card-img-top"
                  style={{ height: "100px", objectFit: "contain" }}
                  alt={`Banner ${banner.id}`}
                />
                <div className="card-body">
                  <button
                    className="btn btn-primary w-100"
                    onClick={() => {
                      deleteBanner(banner.id);
                    }}
                  >
                    Delete Banner
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* input modal started  */}

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered={true}
      >
        <Modal.Header closeButton className="border-0" >
          <Modal.Title className="fs-5" >Banner</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-0" >
        <label
                for="exampleFormControlInput1"
                class="form-label mt-2 fs-5"
              >
                Select Banner
              </label>
              <input
                class="form-control"
                type="file"
                placeholder="banner"
                aria-label="default input example"
                accept="image/*"
                onChange={(e) => {
                  setGetThumbnail(e.target.files);
                }}
              ></input>
        </Modal.Body>
        <Modal.Footer className="w-100 border-0">
  <Button
    onClick={() => {
      if (getThumbnail.length === 0) {
        toast.error("Please select a file before adding a banner", {
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
        addBanner();
        handleClose();
      }
    }}
    data-bs-dismiss="modal"
    aria-label="Close"
    className="w-100 p-2"
    type="button"
    class="btn btn-primary"
  >
    Add Banner
  </Button>
</Modal.Footer>

      </Modal>
      {/* input modal end  */}
    </>
  );
};

export default Banner;
