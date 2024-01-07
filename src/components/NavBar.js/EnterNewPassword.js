import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "../../Interceptor";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const EnterNewPassword = () => {
  const Navigate = useNavigate();
  const [passwords, setPasswords] = useState({
    password1: "",
    password2: "",
  });

  const [match,setMatch] = useState("");
  console.log(passwords.password1);
  console.log(passwords.password2);

  const [showPasswords, setShowPasswords] = useState({
    password1: false,
    password2: false,
  });

  const handlePasswordChange = (e, fieldName) => {
    setPasswords({
      ...passwords,
      [fieldName]: e.target.value,
    });
  };

  const togglePasswordVisibility = (fieldName) => {
    setShowPasswords({
      ...showPasswords,
      [fieldName]: !showPasswords[fieldName],
    });
  };

  const matchPassword = async()=>{

    if(passwords.password1!==passwords.password2){
      return toast.error("🦄 password not match",{
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

    try{
      await axios.post('/bap/admin/forgot/password',{
        "email":localStorage.getItem("getEmail"),
        "password":passwords.password1
      }).then((response)=>{
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
              Navigate("/login");
            },
          });
        }else{
          toast.error("🦄 error",{
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
      console.log(e)
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

      <div className="wrapper">
        <div className="form-wrapper justify-content-center gap-3">
          <div
            className="p-1"
            style={{ border: "1px solid grey", borderRadius: "10px",width:"37vh" }}
          >
            <input
              type={showPasswords.password1 ? "text" : "password"}
              placeholder="Enter New Password"
              style={{ width: "93%", border: "none" }}
              value={passwords.password1}
              onChange={(e) => handlePasswordChange(e, "password1")}
            />
            <span
              style={{ cursor: "pointer" }}
              className="password-toggle-icon"
              onClick={() => togglePasswordVisibility("password1")}
            >
              {showPasswords.password1 ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <div
            className="p-1"
            style={{ border: "1px solid grey", borderRadius: "10px",width:"37vh" }}
          >
            <input
              type={showPasswords.password2 ? "text" : "password"}
              placeholder="Re-enter Password"
              style={{ width: "93%", border: "none" }}
              value={passwords.password2}
              onChange={(e) => handlePasswordChange(e, "password2")}
            />
            <span
              style={{ cursor: "pointer" }}
              className="password-toggle-icon"
              onClick={() => togglePasswordVisibility("password2")}
            >
              {showPasswords.password2 ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="w-100">
            <button onClick={matchPassword} className="w-100  btn btn-primary">Confirm Password</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EnterNewPassword;
