import React,{useState} from 'react';
import OtpInput from 'react-otp-input';
import { NavLink } from 'react-router-dom';
import axios from '../../Interceptor';
import { useNavigate } from 'react-router-dom'


function Otp() {
    const [otp, setOtp] = useState('');
    const naviget = useNavigate();

const Otpsend = async()=>{
  axios.post('bap/users/otpsend', {
    "number": otp,
 })
   .then(function (response) {
     if(response.data.status === '1'){
       naviget("/otp")
     }
   })
   .catch(function (error) {
     console.error(error.message);
   });

}

  return (
    <>
    <div className='wrapper'>
         <div className='form-wrapper'>
            <h2> Phone Otp</h2>
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
               <NavLink to='/email' style={{textDecoration:'none'}}>
                  <button >Register Me</button>
               </NavLink>        
               </div>
          </form>
      </div>
   </div>
    </>
  
  )
}

export default Otp
