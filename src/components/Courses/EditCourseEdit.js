import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "../../Interceptor";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
function EditCourseEdit() {
  const { courseId } = useParams();
  const [data, setdata] = useState([]);
  const [coursename, setcoursename] = useState();
  const [first, setfirst] = useState(false);
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setfirst(true);
    const { name, value, files } = e.target;

    setFormData({
      ...formData,
      [name]: value,
      // [name]: files.name ? files[0].name : value,
    });
  };
  const course = async () => {
    try{
    await axios
      .get(`/bap/admin/get/update/course?course_id=${courseId}`)
      .then(async function (response) {
        console.log("kjhdfsg", response.data);
        if (response.data.status == 1) {
          setdata(response.data.data);
          setcoursename(response.data.data[0].course_name);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const addCourse = async () => {
    var formDataToSend = new FormData();
    Object.entries(formData).map(([key, value]) =>
      formDataToSend.append(key, value)
    );

    // if (formData.category && formData.category.value) {
    //   formDataToSend.append("categorie", formData.category.value);
    // }

    if (formData.subCategory && formData.subCategory.value) {
      formDataToSend.append("sub_categorie", formData.subCategory.value);
    }

    // formDataToSend.append("course_videos", formData.video);

    try {
      const response = await axios.post(
        `/bap/admin/update/course?course_id=${courseId}`,
        formDataToSend
      );
      console.log(response.data);
      if (response.data.status == 1) {
        await toast.success("🦄 " + response.data.message, {
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
    } catch (error) {
      // Handle error
      toast.error("🦄 " + error, {
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
  };

  const options = [
    { value: "blues", label: "Blues" },
    { value: "rock", label: "Rock" },
    { value: "jazz", label: "Jazz" },
    { value: "orchestra", label: "Orchestra" },
  ];

  console.log(data, "jjjjjjjjjjj");
  console.log(formData, "mo");
  useEffect(() => {
    course();
  }, []);
  return (
    <div
      className="container p-2 m-auto"
      style={{overflowX:"hidden" }}
    >
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

      {data.map((item, index) => {
        return (
          <>
            <div className="mb-3" key={index}>
              <label htmlFor="courseName" className="form-label">
                Course Name
              </label>
              <input
                name="course_name"
                className="form-control"
                type="text"
                defaultValue={item?.course_name}
                placeholder="Web Development"
                onChange={handleChange}
                style={{ backgroundColor: "transparent", color: "black" }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="thumbnail" className="form-label">
                Thumbnail
              </label>
              <input
                name="thumbnail"
                className="form-control"
                type="file"
                accept="image/*"
                onChange={handleChange}
                style={{ backgroundColor: "transparent", color: "black" }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                name="price"
                className="form-control"
                type="number"
                placeholder="3000"
                defaultValue={item?.price}
                onChange={handleChange}
                style={{ backgroundColor: "transparent", color: "black" }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="mrp" className="form-label">
                M.R.P.
              </label>
              <input
                name="mrp"
                className="form-control"
                type="number"
                placeholder="9000"
                defaultValue={item?.mrp}
                onChange={handleChange}
                style={{ backgroundColor: "transparent", color: "black" }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Course Description
              </label>
              <input
                name="course_description"
                className="form-control"
                type="text"
                placeholder="Web Development in Hindi"
                defaultValue={item?.course_description}
                onChange={handleChange}
                style={{ backgroundColor: "transparent", color: "black" }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="validity" className="form-label">
                Course Validity
              </label>
              <input
                name="course_validity"
                className="form-control"
                type="number"
                placeholder="365 Days"
                onChange={handleChange}
                defaultValue={item?.course_validity}
                style={{ backgroundColor: "transparent", color: "black" }}
              />
            </div>
           
            <div
              className="container-fluid p-0"
            >
              <button
                type="button"
                className="btn btn-primary " 
                style={{ backgroundColor: "black",float:"right" }}
                onClick={addCourse}
              >
                Add Course
              </button>
            </div>
          </>
        );
      })}
    </div>
  );
}

export default EditCourseEdit;
