import React, { useState } from "react";
import logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const notifyS = (str) => toast.success(str);
  const notifyF = (str) => toast.error(str);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const [loader, setLoader] = useState(true);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("handling\n");
    if (email === "" || password === "") {
      notifyF("Please fill in all the fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw {
          message: data.message,
          errorCode: response.status,
        };
      }

      // Handle successful login response here
      console.log("Login successful!", data);

      // popup
      // notifyS("Login successful! Wait a sec!");

      // navigate to home page
      navigate("/home");
    } catch (error) {
      // Handle error
      console.error("Login error: ", error.message);
      notifyF(error.message);

      // If error has additional properties
      if ("errorCode" in error) {
        console.error("Error Code:", error.errorCode);
      }
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="w-[100vw] font-Roboto h-[100vh] flex bg-login justify-center items-center">
      <div className=" flex flex-col  bg-black  max-h-[90vh] h-[650px] w-[600px] rounded-[16px] overflow-hidden ">
        <div className="flex flex-col  w-full h-full p-4 space-y-4 items-center ">
          <img
            className="bg-transparent  outline-none   h-[150px] p-3 rounded-[6px]  hover:bg-gray-900"
            alt="logo"
            src={logo}
          ></img>

          <div className="relative w-full flex flex-col justify-center items-center ">
            <p className="text-lg font-bold bg-black z-20 px-2 py-2">
              Please enter your credentials login
            </p>
            <div className="w-full h-[2px] bg-gray-800 absolute top-1/2 -translate-1/2"></div>
          </div>

          <form
            className="flex flex-col space-y-3 w-full items-center"
            // action=""
            onSubmit={handleLogin}
          >
            <input
              type="email"
              placeholder="email"
              value={email}
              className="bg-transparent border border-gray-600 outline-none  w-[60%] h-[50px] p-3 rounded-[6px] "
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              className="bg-transparent border border-gray-600 outline-none  w-[60%] h-[50px] p-3 rounded-[6px] "
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={handleLogin}
              type="submit"
              className="bg-transparent border border-gray-600 outline-none  w-[20%] h-[50px] p-3 rounded-[6px]  hover:bg-gray-900"
            >
              go
            </button>
          </form>

          <div className="relative w-full flex flex-col justify-center items-center">
            <p className="text-lg font-bold bg-black z-20 px-2 py-2 ">
              Not a member?
            </p>
            <div className="w-full h-[2px] bg-gray-800 absolute top-1/2 -translate-1/2"></div>
          </div>
          <button
            className="bg-transparent border border-gray-600 outline-none  w-[60%] h-[50px] p-3 rounded-[6px] text-center hover:bg-gray-900"
            onClick={() => navigate("/signup")}
          >
            sign up now
          </button>
        </div>
      </div>
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
    </div>
  );
};

export default Login;
