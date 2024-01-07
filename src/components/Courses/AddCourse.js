import React, { useState } from 'react';
import Select from 'react-select';
import axios from '../../Interceptor';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import Lottie from 'lottie-react';
import animationData from '../Img/Lodin.json'
function AddCourse({ onCourseAdded }) {
  var options = []
  var options2 = []
  const [waitingLobby,setWaitingLobby] = useState(0)
  const [lodings, setlodings] = useState(false)
  const [formData, setFormData] = useState({
    courseName: '',
    videoName: '',
    thumbnail: null,
    price: '',
    mrp: '',
    description: '',
    validity: '',
    category: null,
    subCategory: null,
    video: null,
  });


  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const addCourse = async () => {
    setlodings(true);
    const formDataToSend = new FormData();
  formDataToSend.append('course_name', formData.courseName);
  formDataToSend.append('video_name', formData.videoName);
  formDataToSend.append('thumbnail', formData.thumbnail);
  formDataToSend.append('price', formData.price);
  formDataToSend.append('mrp', formData.mrp);
  formDataToSend.append('course_description', formData.description);
  formDataToSend.append('course_validity', formData.validity);
  setWaitingLobby(1);

  if (formData.category && formData.category.value) {
    formDataToSend.append('categorie', formData.category.value);
  }

  if (formData.subCategory && formData.subCategory.value) {
    formDataToSend.append('sub_categorie', formData.subCategory.value);
  }

  formDataToSend.append('video', formData.video);

    try {
      const response = await axios.post('/bap/admin/create/course', formDataToSend);
      console.log(response.data);
      if (response.data.status == 1) {
        setWaitingLobby(0);
       await toast.success('🦄 ' + response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
          onCourseAdded();
          setFormData("");
      }
    } catch (error) {
      toast.error('🦄 ' + error, {
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

const getCetegry = async () => {
  try {
    await axios.get("/bap/admin/category")
    .then(response => {
      response.data.categories.map((item) => {
        options.push({value: item.category, label: item.category})
      })
      console.log(response.data);
    })
  } catch (error) {
    console.log(error);
  }
}
const getCetegry2 = async () => {
  try {
    await axios.get("/bap/admin/sub/category")
    .then(response => {
      console.log(response.data.data);
      response.data.data.map((item) => {
        options2.push({value: item.sub_category, label: item.sub_category})
      })
    })
  } catch (error) {
    console.log(error);
  }
}

// useEffect(() => {
//   getCetegry();
//   getCetegry2();
// },[])
  return (
    <>
   {
    waitingLobby == 0?
    <>
    <div className="container p-2 m-auto" style={{ overflowY: 'auto' }}>
    
      <div className="mb-3">
        <label htmlFor="courseName" className="form-label">
          Course Name
        </label>
        <input
          name="courseName"
          className="form-control"
          type="text"
          placeholder="Web Development"
          onChange={handleChange}
          style={{ backgroundColor: 'transparent', color: 'black' }}
        />
        <label htmlFor="courseName" className="form-label">
          Video Name
        </label>
        <input
          name="videoName"
          className="form-control"
          type="text"
          placeholder="Web Development"
          onChange={handleChange}
          style={{ backgroundColor: 'transparent', color: 'black' }}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="thumbnail" className="form-label">
          Thumbnail
        </label>
        <input
          required={true}
          name="thumbnail"
          className="form-control"
          type="file"
          accept="image/*"
          onChange={handleChange}
          style={{ backgroundColor: 'transparent', color: 'black' }}
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
          onChange={handleChange}
          style={{ backgroundColor: 'transparent', color: 'black' }}
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
          onChange={handleChange}
          style={{ backgroundColor: 'transparent', color: 'black' }}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Course Description
        </label>
        <input
          name="description"
          className="form-control"
          type="text"
          placeholder="Web Development in Hindi"
          onChange={handleChange}
          style={{ backgroundColor: 'transparent', color: 'black' }}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="validity" className="form-label">
          Course Validity
        </label>
        <input
          name="validity"
          className="form-control"
          type="number"
          placeholder="365 Days"
          onChange={handleChange}
          style={{ backgroundColor: 'transparent', color: 'black' }}
        />
      </div>
      <div className="mb-3"  onMouseEnter={getCetegry}>
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <Select
          name="category"
          options={options}
          onChange={(selectedOption) => setFormData({ ...formData, category: selectedOption })}
        />
      </div>
      <div className="mb-3"  onMouseEnter={getCetegry2}>
        <label htmlFor="subCategory" className="form-label">
          Sub Category
        </label>
        <Select
          name="subCategory"
          options={options2}
          onChange={(selectedOption) => setFormData({ ...formData, subCategory: selectedOption })}
        />
      </div>
      <div className="mb-5">
        <label htmlFor="video" className="form-label">
          Upload Video
        </label>
        <input 
          required={true}
          name="video"
          className="form-control"
          type="file"
          accept="video/*"
          onChange={handleChange}
          style={{ backgroundColor: 'transparent', color: 'black' }}
        />
      </div> 
      <button data-bs-dismiss="modal" aria-label="Close" onClick={addCourse} style={{backgroundColor:'#000', color:'#fff', width:'100%',padding:'10px'}}> Add Course</button>
    </div>

    </>:<>
    <Lottie
    animationData={animationData}
    loop={true} // Set to true if you want the animation to loop
    autoplay={true} // Set to true if you want the animation to play automatically
    className='w-100 m-auto'
  />
    </>
   }
    </>
  );
}

export default AddCourse;
