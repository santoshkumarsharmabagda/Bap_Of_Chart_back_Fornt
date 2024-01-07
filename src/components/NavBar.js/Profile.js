import React from 'react'
import axios from '../../Interceptor';
import { useEffect } from 'react';
import { useState } from 'react';

function Profile() {
const [data, setdata] = useState({})
const [image, setImage] = useState(null);
  const getCategories = async() => {
    try {
        await axios.get("/bap/admin/profile")
        .then((response) =>{
          localStorage.setItem("profile", response.data.data.profile)
          localStorage.setItem("name", response.data.data.name)
          setdata(response.data.data)
        })
        
    } catch (error) {
      console.log(error);
    }
  }


  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('profile', image);

      const response = await axios.post('/bap/admin/update/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type to form data
        },
      });

      console.log('Response from the server:', response);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(()=>{
    getCategories();
  },[])
  return (
   <>
    <div className='container mt-3' style={{display:"grid", alignContent:"center" ,justifyContent:"center",}}>
    <div  className='row p-5 m-3' style={{backgroundColor:"white",display:"grid", alignContent:"center" ,justifyContent:"center",borderRadius:"10px" , boxShadow: "0px -15px 25px -30px rgba(0, 0, 0, 0.45), 25px 0 20px -30px rgba(0, 0, 0, 0.45), 0px 25px 20px -30px rgba(0, 0, 0, 0.45), -25px 0 10px -30px rgba(0, 0, 0, 0.45)" ,width:"100%"}}>
    <div className="col-lg-12"  style={{display:"grid",alignContent:"center",justifyContent:"center"}} >
    <img src={data.profile} alt="" srcset="" style={{border:"1px solid black",height:"100px",width:"100px",borderRadius:"100px",backgroundSize:"cover",}} />
   </div>
   <div className="col-lg-12 mt-4" style={{color:"#000"}}>
    <h5 className='p-2'>Name : {data?.name}</h5>
    <h5 className='p-2'>Email : {data?.email}</h5>
    </div>
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit Profile</button>
    </div>
   

<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <div class="mb-3">
      <label for="formFile" class="form-label">Profile Image </label>
      <input type="file" accept="image/*" onChange={handleImageChange} />
    </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button onClick={handleSubmit}  data-bs-dismiss="modal" >Submit</button>
      </div>
    </div>
  </div>
</div>
   </div>
   </>
  )
}

export default Profile
