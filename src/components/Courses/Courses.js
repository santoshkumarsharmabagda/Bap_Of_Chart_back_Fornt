import React, { useState } from 'react'
import'./Course.css'
import AddCourse from './AddCourse'
import EditCourseEdit from './EditCourseEdit'
import AllCourse from './AllCourse'
function Courses() {
  // const [first, setfirst] = useState(0)
  const [refreshCourses, setRefreshCourses] = useState(false);

  const handleCourseAdded = () => {
    // Set the refreshCourses state to true, which will trigger a refresh of the course list
    setRefreshCourses(true);
  }
  return (
    <>
    <div className='container bg-dark mt-1' style={{borderRadius:"10px",boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', color:"white", cursor:"pointer"}}>
    <div className='containers'>
    <div className='items' data-bs-toggle="modal" data-bs-target="#staticBackdrop" >
    <p className='text p-2' style={{backgroundColor:"#5D2A42", width:"30vh",textAlign:"center",borderRadius:"10px",color:"white"}}>Add Course</p>
    </div>
    </div>
    </div>
    <AllCourse  refreshCourses={refreshCourses} setRefreshCourses={setRefreshCourses}/>

<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
<div class="modal-dialog" style={{height:"30vh",}} >
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title" id="staticBackdropLabel">Add Course</h5>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
    <AddCourse onCourseAdded={handleCourseAdded}/>
    </div>
  </div>
</div>
</div>
    </>
  )
}

export default Courses
