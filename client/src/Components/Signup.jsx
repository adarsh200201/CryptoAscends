import React, { useState } from "react";

export default function Signup({ closemod }) {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loggedIn, setLoggedIn] = useState(false);

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const eventHandler = async () => {
    const body = {
      email: credentials.email,
      password: credentials.password,
    };

    try {
      // Use your local server URL or the external service URL here
      const response = await fetch("http://localhost:5000/register/Signup", {  // Update URL as needed
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data.error) {
        alert(data.error);
      } else {
        closemod[1](false);
        localStorage.setItem("authToken", data.authToken);
        console.log(localStorage.getItem("authToken"));
        setLoggedIn(true);
      }
    } catch (error) {
      console.error("Failed to fetch:", error);
      alert("An error occurred. Please try again.");
    }
  };

  if (loggedIn) {
    return null; // Prevent rendering of the signup form after logging in
  }

  return (
    <div>
      <div className="z-50 w-[100%] fixed top-0 h-full snap-none bg-[#131722c3]">
        <div className="text-black bg-white rounded-md border-2 border-white w-[70%] md:w-[50%] mx-auto mt-[150px] md:mt-[200px]">
          <button
            onClick={() => {
              closemod[1](false);
            }}
            className="font-bold ml-5 mt-3"
          >
            X
          </button>
          <h1 className="text-center p-1 font-bold text-[18px] sm:text-[25px] z-50">
            Welcome to our Crypto_Ascend!
          </h1>
          <div></div>
          <form className="grid grid-cols-1 md:grid-cols-2 p-3">
            <div className="flex p-2 justify-between m-1 flex-wrap z-50">
              <label htmlFor="email" className="font-semibold">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={credentials.email}
                onChange={onChange}
                className="text-black bg-[#cfcfcf]"
              />
            </div>
            <div className="flex p-2 justify-between m-1 flex-wrap z-50">
              <label htmlFor="password" className="font-semibold">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={onChange}
                className="text-black bg-[#cfcfcf]"
              />
            </div>
          </form>

          <div className="text-center mx-auto font-semibold">
            <button
              onClick={() => {
                closemod[0](true);
                closemod[1](false);
              }}
            >
              Don't have an account...?
            </button>
          </div>
          <div className="text-center mx-auto font-semibold m-3 bg-[#131722] rounded-md text-white w-[100px] p-1 hover:bg-[#414141]">
            <button onClick={eventHandler}>Signup</button>
          </div>
        </div>
      </div>
    </div>
  );
}
