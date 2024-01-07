import React from 'react'

function ChangePass() {
  return (
    <>
    <div className='wrapper'>
  <div className='form-wrapper'>
     <form  >
        <div className='email'>
           <label htmlFor="email"> Current Passowrd</label>
           <input type='password'  name='password' placeholder='Enter Your Current Password'/>
           <label htmlFor="email" style={{paddingTop:"10px"}}>New Passowrd</label>
           <input type='password'  name='password' placeholder='Enter Your New Password'/>
           <label htmlFor="email" style={{paddingTop:"10px"}}>Confirm Passowrd</label>
           <input type='password'  name='password' placeholder='Enter Your confirm Password'/>
        </div>    
        
   </form>
</div>
</div>
  </>
  )
}

export default ChangePass
