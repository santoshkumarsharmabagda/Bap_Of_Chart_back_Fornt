import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../Interceptor";
import { ToastContainer, toast } from "react-toastify";

const ForgetEmail = () => {
  const navigate = useNavigate();

  const [getEmail,setGetEmail] = useState("");

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setGetEmail(email);
    localStorage.setItem("getEmail", email);
  };

  const sendOtp = async () =>{
    try{
      await axios.post("/bap/admin/email/otpSend",{
        "email":getEmail,
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
              navigate("/ForgetEmailOtp");
            },
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

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (getEmail === "") {
        toast.error("Please enter email.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        sendOtp();
      }
    }
  };

  return (

    <>


    <div className="wrapper" >
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
      <div className="form-wrapper justify-content-center" >
                <h1 className="fs-3 text-center" >Verification</h1>
                <div className=" mt-3">
                  <input style={{width:"37vh"}} onKeyPress={handleKeyPress} type="email" placeholder="enter your email" required name="email" className="ps-2" onChange={handleEmailChange} />
                </div>
                {/* <NavLink to='/ForgetEmailOtp' > */}
                    <button onClick={sendOtp}  className="btn btn-primary w-100 mt-3 pb-3" >Get OTP</button>
                {/* </NavLink> */}
      </div>
    </div>
    </>
  );
};

export default ForgetEmail;
