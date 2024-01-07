
import React, { useState } from "react";
import axios from "../../Interceptor.js";
import { ToastContainer, toast } from "react-toastify";

const SocialMedia = () => {

  const [fb,setFb] = useState("");
  const [ins,setIns] = useState("");
  const [te,setTe] = useState("");
  const [tw,setTw] = useState("");
  
  const sendLinks = async()=>{
    if (!fb || !ins || !te || !tw) {
      toast.error("🦄 Please fill in all social media links.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return; 
    }
    try{
      await axios.post('/bap/admin/link/post',{
        facebook:fb,
        instagram:ins,
        telegram:te,
        twitter:tw
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
          });
          setFb("");
          setIns("");
          setTe("");
          setTw("");
        }else{
          toast.error("🦄 "+response.data.message,{
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

      <div className="wrapper d-flex align-items-center mt-3">
        <div className="form-wrapper">
          <h3 className="text-center" style={{fontWeight:600}} >Enter Social Media Links</h3>
          {/* <form> */}
            <div className="email mt-3">
              <label htmlFor="email">Facebook</label>
              <input
                type="text"
                required
                // name="email"
                style={{width:"37vh"}}
                // value={email}
                // onChange={(e) => {
                //   setemail(e.target.value);
                // }}
                // onKeyPress={handleKeyPress}
                onChange={(e)=>setFb(e.target.value)}
                placeholder="Facebook Handle Link"
              />
              <label htmlFor="email" className="pt-2">
                Instagram
              </label>
              <input
                type="text"
                style={{width:"37vh"}}
                onChange={(e)=>setIns(e.target.value)}
                // name="password"
                required
                placeholder="Instagram Handle Link"
              />
              <label htmlFor="email" className="pt-2">
                Telegram
              </label>
              <input
                type="text"
                style={{width:"37vh"}}
                onChange={(e)=>setTe(e.target.value)}
                // name="password"
                required
                placeholder="Telegram Handle Link"
              />
              <label htmlFor="email" className="pt-2">
                Twitter
              </label>
              <input
                type="text"
                style={{width:"37vh"}}
                onChange={(e)=>setTw(e.target.value)}
                // name="password"
                required
                placeholder="Twitter Handle Link"
              />  
            </div>
          {/* </form> */}
          <div className="submit mb-5">
            <button style={{ width: "100%" }} onClick={sendLinks}  type="button">
              Proceed
            </button>
          </div>

          {/* <div className="text-end m-0 p-0">
            <NavLink to="/ForgetEmail">
              <h1> Forgot password? </h1>
            </NavLink>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default SocialMedia;
