import React, { useState } from "react";
import { CgMailForward } from "react-icons/cg";
import axios from "../../Interceptor";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";

const Chat = () => {

  let { id } = useParams();
  
  
  const [userTyped,setUserTyped] = useState();
  const [getChat,setGetChat] = useState([]);
  console.log(userTyped);
  const chatData = [
    {
      user: "Hey This is Chat One",
      admin: "Hey This is Chat Two",
    },
  ];

  const addChat = async () => {
    console.log(userTyped,"kokkk");
    try {
    await axios.post(`/bap/admin/add/chat?user_id=${id}`,{
      admin_chat:userTyped,
      admin_status:"1"
    })
    .then(response =>{
      console.log(response.data);
      if (response.data.status == "1") {
        toast.success("🦄 " + response.data.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
        console.log(response,"uyguffiufu")
        setUserTyped("");
      }else{
        console.log("not send")
      }
    })
  } catch (e) {
    console.log(e);
  }
  }

  const getData = async () =>{
    await axios.get(`/bap/admin/get/chat?user_id=${id}`)
    .then((response)=>{
      if (response.data.status == "1") {
        setGetChat(response.data.messages)
      }
    })
  }

  useEffect(() => {
    getData();
  }, [])
  

 

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
      <div className="container bg-dark  text-white" style={{boxShadow:"rgba(0, 0, 0, 0.35) 0px 5px 15px",borderRadius:"10px",height:"85vh"}} >
        <div className="scrollbar" style={{ height: "90%", overflowY: "auto" }}>
          {getChat.map((value, index) => (
            <div key={value.id}>
            <hr/>
              {/* <p style={{color:"red",fontWeight:600}} >{`User : -  ${value.chat}`}</p> */}
              {/* <p style={value.admin_status == 1 ?{color:"green",fontWeight:600} : {color:"red",fontWeight:600} } >{`Admin : - ${value.admin_chat}`}</p> */}
              {
                value.admin_status==1?
                <>
                  <p style={{color:"green",fontWeight:600}} >{`Admin : - ${value.admin_chat}`}</p>
                </>:
                <>
                  <p style={{color:"red",fontWeight:600}} >{`User : - ${value.chat}`}</p>
                </>
              }
              <hr/>
            </div>
          ))}
        </div>
        <div className="m-auto" style={{ height: "10%" }}>
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Enter Your Chat"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              onChange={(e)=>setUserTyped(e.target.value)}
            />
            <span onClick={addChat} class="input-group-text" id="basic-addon2" style={{cursor:"pointer"}} >
              <CgMailForward />
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
