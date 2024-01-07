import React, { useEffect, useState } from "react";
import { MdFeaturedPlayList } from "react-icons/md";
import axios from "../../Interceptor";
import Lottie from "lottie-react";
import {BiUserCircle} from "react-icons/bi";
import {BiLaptop} from "react-icons/bi";
import animationData from "../Img/firstAnimation.json";
import animationData1 from "../Img/Animation2.json";
import animationData2 from "../Img/Animation3.json";
import animationData4 from "../Img/Animation4.json";
import animationData5 from "../Img/Animation5.json";

function Home() {
  const [user, setuser] = useState()
  const [course, setcourse] = useState()
  const [video, setvideo] = useState()
  //   {
  //     icon: ReactIcons.BiUserCircle,
  //     heading: "Total Users",
  //     total: 500,
  //     animationData: animationData,
  //   },
  //   {
  //     icon: ReactIcons.BiLaptop,
  //     heading: "Total Courses",
  //     total: 500,
  //     animationData: animationData1,
  //   },
  //   {
  //     icon: MdFeaturedPlayList,
  //     heading: "Total Courses",
  //     total: 500,
  //     animationData: animationData2,
  //   },
  // ];

 const getDetails = async () => {
    try{
      await axios.get("/bap/admin/get/dashboard")
      .then((response)=>{
        if(response.data.status == 1){
          setuser(response.data.user[0]["count(*)"])
          setcourse(response.data.video[0]["count(*)"])
          setvideo(response.data.course[0]["count(*)"])
        }
      })
    }catch(e) {
      console.log(e)
    }
      
 }

 useEffect(() => {
   getDetails();
 }, [])
 
 

  return (
    <>
      <div className="container scrollbar" style={{ height: "80vh", overflowY: "auto" }}>
        <div className="row mt-3" style={{ rowGap: "10px" }}>

          <div className="col-lg-4 col-md-4 col-sm-12">
            <div className="card">
              <div className="card-body">
              <div className="row" >
                <div className="col-7 align-self-center">
                  <h3
                    className="d-flex align-items-center gap-2"
                    style={{ fontSize: "1rem" }}
                  >
                    <BiUserCircle style={{fontSize:"1.5rem"}} />
                    Total Users
                  </h3>
                  <h1
                    className="mt-2"
                    style={{ fontSize: "2rem", fontWeight: 600 }}
                  >
                    {user}
                  </h1>
                </div>

                <div className="col-5">
                  <Lottie
                    animationData={animationData}
                    loop={true}
                    autoplay={true}
                    className="w-100 m-auto"
                  />
                </div>
              </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12">
            <div className="card">
              <div className="card-body">
              <div className="row" >
                <div className="col-7 align-self-center">
                  <h3
                    className="d-flex align-items-center gap-2"
                    style={{ fontSize: "1rem" }}
                  >
                    <BiLaptop style={{fontSize:"1.5rem"}} />
                    Total Videos
                  </h3>
                  <h1
                    className="mt-2"
                    style={{ fontSize: "2rem", fontWeight: 600 }}
                  >
                    {course}
                  </h1>
                </div>

                <div className="col-5">
                  <Lottie
                    animationData={animationData2}
                    loop={true}
                    autoplay={true}
                    className="w-100 m-auto"
                  />
                </div>
              </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12">
            <div className="card">
              <div className="card-body">
              <div className="row" >
                <div className="col-7 align-self-center">
                  <h3
                    className="d-flex align-items-center gap-2"
                    style={{ fontSize: "1rem" }}
                  >
                    <MdFeaturedPlayList style={{fontSize:"1.5rem"}} />
                    Total Courses
                  </h3>
                  <h1
                    className="mt-2"
                    style={{ fontSize: "2rem", fontWeight: 600 }}
                  >
                    {video}
                  </h1>
                </div>

                <div className="col-5">
                  <Lottie
                    animationData={animationData1}
                    loop={true}
                    autoplay={true}
                    className="w-100 m-auto"
                  />
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row" >
          <div className="col-lg-6 col-md-6 col-sm-12" >  
          <Lottie
                    animationData={animationData4}
                    loop={true}
                    autoplay={true}
                    className="w-100 m-auto"
                  />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12" >  
          <Lottie
                    animationData={animationData5}
                    loop={true}
                    autoplay={true}
                    className="w-75 m-auto"
                  />
          </div>

        </div>
      </div>
    </>
  );
}

export default Home;
