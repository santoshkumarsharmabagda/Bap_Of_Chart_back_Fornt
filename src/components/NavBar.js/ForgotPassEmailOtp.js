import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { OTP } from "react-custom-otp";
import "react-custom-otp/dist/index.css";
import { useNavigate } from "react-router-dom";
import axios from "../../Interceptor";
import { ToastContainer, toast } from "react-toastify";

const ForgotPassEmailOtp = () => {
  const navigate = useNavigate();
  const [stringCode, setStringCode] = useState("");
  const [submitStatus, setSubmitStatus] = useState(false);

  const checkOtp = async ()=>{
    // alert(stringCode);
    try{
      await axios.post('/bap/admin/email/verification',{
        "email":localStorage.getItem("getEmail"),
        "otp":stringCode
      })
      .then((response)=>{
        if(response.data.status==1){
          toast.success("🦄 " + response.data.message, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            onClose: () => {
              navigate("/EnterNewPassword");
            },
          });
        }else{
          toast.error("🦄 otp not match",{
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
      })
    }catch(e){
      console.log(e);
    }
  }

  const resendOtp = async()=>{
    try{
      await axios.post("/bap/admin/email/otpSend",{
        "email":localStorage.getItem("getEmail")
      })
      .then((response)=>{
        if(response.data.status==1){
          toast.success("🦄 otp re-sended successfully", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            // onClose: () => {
            //   navigate("/ForgetEmailOtp");
            // },
          });
        }else{
          toast.error("🦄 error otp not send",{
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
      })
    }catch (e){
      console.log(e);
    }
  }
  return (
    <>
    <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

              <div className="wrapper" >
                <div className="form-wrapper justify-content-center gap-3">

              <h1 className="text-center" >Enter OTP</h1>

                <OTP
                  inputsClasses="custom-inputs"
                  inputsStyles={{ background: "#f1f1f1", color: "#333" }}
                  containerClasses="otp-container"
                  containerStyles={{ background: "#fff",width:"100%",justifyContent:"center" }}
                  inputsNumber={6}
                  setStringCode={setStringCode}
                  setSubmitStatus={setSubmitStatus}
                  separator={<span>-</span>}
                />

                <div className="w-100 mx-auto text-center" >
                    {/* <NavLink to='/EnterNewPassword' > */}
                        <button onClick={checkOtp} className="w-100 m-auto text-center" >Proceed</button>
                    {/* </NavLink> */}
                </div>

                <div>
                    <p onClick={resendOtp} className="text-primary text-end" style={{fontSize:"0.8rem"}} >Resend OTP?</p>
                </div>
                </div>
              </div>
    </>
  );
};

export default ForgotPassEmailOtp;
