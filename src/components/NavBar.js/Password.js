import React from 'react'
import { NavLink } from 'react-router-dom'

function Password() {
  return (
    <>
      <div className='wrapper'>
    <div className='form-wrapper'>
       <form  >
          <div className='email'>
             <label htmlFor="email">Passowrd</label>
             <input type='password' name='password' placeholder='Enter Your Password'/>
             <label htmlFor="email" style={{paddingTop:"10px"}}>Confirm Passowrd</label>
             <input type='password' name='password' placeholder='Enter Your Confirm  Password'/>
          </div>    
          <div className='submit'>
          <NavLink to='/login' style={{textDecoration:'none'}}>
             <button>Register Me</button>
          </NavLink>        
          </div>
     </form>
 </div>
</div>
    </>
  )
}

export default Password
