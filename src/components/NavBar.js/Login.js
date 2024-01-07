import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "../../Interceptor";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Login() {
  const navigat = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (email.trim() === "" || password.trim() === "") {
        // Show a toast message if one or both fields are empty
        toast.error("Please enter both email and password.", {
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
        login();
      }
    }
  };

  const login = async () => {
    try {
      await axios
        .post("/bap/admin/login", {
          email: email,
          password: password,
        })
        .then(async function (response) {
          console.log(response.data);
          if (response.data.status == "1") {
            // naviget("/otp");
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
            await localStorage.setItem("token", response.data.token);
            await localStorage.setItem("profile", response.data.profile);
            navigat("/");
          } else {
            toast.error("🦄 " + response.data.message, {
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
        .catch(function (error) {
          console.error(error.message);
        });
    } catch (error) {
      console.log(error);
    }
  };

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
        <div className="form-wrapper">
          <h2>Login</h2>
          <form>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                required
                name="email"
                value={email}
                onChange={(e) => {
                  setemail(e.target.value);
                }}
                onKeyPress={handleKeyPress}
                placeholder="Enter Your Email"
              />
              <label htmlFor="email" className="pt-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                style={{ width: "37vh" }}
                value={password}
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
                onKeyPress={handleKeyPress}
                placeholder="Enter Your Password"
              />
            </div>
          </form>
          <div className="submit mb-5">
            <button style={{ width: "100%" }} onClick={login} type="button">
              Login
            </button>
          </div>

          <div className="text-end m-0 p-0">
            <NavLink to="/ForgetEmail">
              <h1> Forgot password? </h1>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
