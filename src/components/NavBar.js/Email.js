import React from 'react'
import { NavLink } from 'react-router-dom'

function Email() {
  return (
   <>
      


         <div className='wrapper'>
         <div className='form-wrapper'>
            <h2>Sign Up</h2>
            <form  >
               <div className='email'>
                  <label style={{fontSize:"17px"}}>Email</label>
                  <input type='email' name='email' required   placeholder='Enter Your Email'/>
               </div>    
               <div className='submit'>
               <NavLink to='/email_otp' style={{textDecoration:'none'}}>
                  <button>Register Me</button>
               </NavLink>        
               </div>
          </form>
      </div>
   </div>
    </>
  )
}

export default Email
