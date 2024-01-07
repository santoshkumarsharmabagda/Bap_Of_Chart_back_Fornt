import React, { useState, useEffect } from "react";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../../Interceptor";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

function SignUp() {
  //   const [Phone, setPhone] = useState("");
  const [Number, setNumber] = useState("");
  const naviget = useNavigate();

  useEffect(() => {
    console.log(Number);
  },[]);

  const otp = () => {
    try{
    axios
      .post("/bap/users/otpsend", {
        number: Number,
      })
      .then(function (response) {
        if (response.data.status == "1") {
          // naviget("/otp");
          console.log("dadada", response.data);
        }
      })
      .catch(function (error) {
        console.error(error.message);
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {/* <div className="wrapper">
        <div className="form-wrapper">
          <h2>Sign Up</h2>
          <form>
            <div className="email">
              <label style={{ fontSize: "17px" }}>Phone</label>
              <PhoneInput
              inputProps={{
    name: 'phone',
    required: true,
    autoFocus: true
  }}
  country={'in'}
//   value={Phone}
  onChange={(value)=>{setNumber(value)}}
  countryCodeEditable={false}
  disableDropdown
/>
            </div>
            <div className="submit">
              <button type="button" onClick={otp}>
                Register Me
              </button>
            </div>
          </form>
        </div>
      </div> */}

<div className="wrapper" >

      <div className="container" >
        <div className="row">
          <div className="col-lg-4 col-md-4 col-sm-10 mx-auto">
              <div style={{boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)",borderRadius:"10px"}} className="p-3"  >
                  <div style={{display:"flex",flexDirection:"column",}} >
                    <label>Email</label>
                    <input type="email" autoComplete="on" required placeholder="enter your email" />
                  </div>

                  <div style={{display:"flex",flexDirection:"column",}} >
                    <label>Password</label>
                    <input type="password" required placeholder="enter password" />
                  </div>

                  <div>
                    <button className="w-100 py-2 " style={{borderRadius:"10px"}} onClick={otp} >Log In</button>
                  </div>
              </div>
          </div>
        </div>
      </div>
</div>
    </>
  );
}

export default SignUp;
