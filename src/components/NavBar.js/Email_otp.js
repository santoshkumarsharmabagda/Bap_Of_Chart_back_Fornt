import React,{useState} from 'react';
import OtpInput from 'react-otp-input';
import { NavLink } from 'react-router-dom';

function Email_otp() {
  const [otp, setOtp] = useState('');
  return (
    <>
    <div className='wrapper'>
         <div className='form-wrapper'>
            <h2>Email Otp</h2>
            <form  >
               
              <div className='mt-2'>
              <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props} style={{height:"35px",width:"35px",marginTop:"20px"}} />}
          /> 
              </div>   
               <div className='submit mt-4' style={{alignContent:"center",justifyContent:"center"}}>
               <NavLink to='/password' style={{textDecoration:'none'}}>
                  <button>Register Me</button>
               </NavLink>        
               </div>
          </form>
      </div>
   </div>
    </>
  
  )
}

export default Email_otp
