import React from 'react'
import Select from "react-select";

function AddData() {
  const options = [
    { value : "blues", label: "Blues" },
    { value : "rock", label: "Rock" },
    { value : "jazz", label: "Jazz" },
    { value : "orchestra", label: "Orchestra"},
    
  ];
  return (
   <>
   <div className='container p-2'>
    <div class="mb-3">
    <label for="exampleFormControlInput1" class="form-label">Course Name</label>
    <input class="form-control" type="text" placeholder="Web Development" aria-label="default input example" style={{backgroundColor:"transparent", color:"black"}}/>
    </div>
    <div class="mb-3">
    <label for="exampleFormControlInput1" class="form-label">Thumbnail</label>
    <input class="form-control" type="file" placeholder="Web Development" aria-label="default input example" style={{backgroundColor:"transparent", color:"black"}}/>
    </div>
    <div class="mb-3 d-flex" style={{width:"100%"}}>
    <div className='' style={{width:"100%"}}>
    <label for="exampleFormControlInput1" class="form-label">Price</label>
    <input class="form-control" type="number" placeholder="3000" aria-label="default input example" style={{backgroundColor:"transparent", color:"black"}}/>
    </div>
    <div class="ms-2" style={{width:"100%"}}> 
    <label for="exampleFormControlInput1" class="form-label">M.R.P.</label>
    <input class="form-control" type="number" placeholder="9000" aria-label="default input example" style={{backgroundColor:"transparent", color:"black"}}/>
    </div>
    </div>
    <div class="mb-3">
    <label for="exampleFormControlInput1" class="form-label">Course Description</label>
    <input class="form-control" type="text" placeholder="Web Development in hindi" aria-label="default input example" style={{backgroundColor:"transparent", color:"black"}}/>
    </div>
    <div class="mb-3">
    <label for="exampleFormControlInput1" class="form-label">Course Validity</label>
    <input class="form-control" type="number" placeholder="365 Day" aria-label="default input example" style={{backgroundColor:"transparent", color:"black"}}/>
    </div>
    <div class="mb-3 d-flex" style={{width:"100%"}}>
    <div className='' style={{width:"100%"}}>
    <label for="exampleFormControlInput1" class="form-label">Category </label>
    <Select options={options} />
    </div>
    <div class="ms-2" style={{width:"100%"}}> 
    <label for="exampleFormControlInput1" class="form-label">Sub Category </label>
    <Select options={options} />
    </div>
    </div>
    </div>
  )
   </>
  )
}

export default AddData
