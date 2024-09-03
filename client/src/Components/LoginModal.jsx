import React, { useState } from "react";

export default function LoginModal({ closemod }) {
  const [credentials, setCredentials] = useState({
    first_name: "",
    last_name: "",
    age: "",
    mob: "",
    email: "",
    password: "",
  });

  const [loggedIn, setLoggedIn] = useState(false);

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const eventHandler = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await fetch("http://localhost:5000/register/creatuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      console.log(json);

      if (json.userexist) {
        alert("User already exists");
      } else {
        if (!json.success) {
          alert("An error occurred, please check your credentials and try again.");
        } else {
          localStorage.setItem("authToken", json.authToken);
          console.log("Token saved:", localStorage.getItem("authToken"));
          setLoggedIn(true);
        }
      }
    } catch (error) {
      console.error("Failed to fetch:", error);
      alert("An error occurred. Please try again.");
    }
  };

  if (loggedIn) {
    closemod[0](false); // Close the modal
    return null; // Prevent rendering of the modal after logging in
  }

  return (
    <div>
      <div className="w-[100%] fixed top-0 h-full snap-none z-50 bg-[#131722c3]">
        <div className="text-black bg-white rounded-md border-2 border-white w-[70%] md:w-[50%] mx-auto mt-[40px] md:mt-[200px]">
          <button
            onClick={() => closemod[0](false)}
            className="font-bold ml-5 mt-3"
          >
            X
          </button>
          <div>
            <h1 className="text-center p-1 font-bold text-[18px] sm:text-[25px] z-50">
              Welcome to Crypto_Ascend!
            </h1>

            <form className="grid grid-cols-1 md:grid-cols-2 p-3" onSubmit={eventHandler}>
              <div className="flex p-2 justify-between m-1 flex-wrap z-50">
                <label htmlFor="first_name" className="font-semibold">
                  First Name
                </label>
                <div>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={credentials.first_name}
                    onChange={onChange}
                    className="text-black bg-[#cfcfcf]"
                  />
                </div>
              </div>
              <div className="flex p-2 justify-between m-1 flex-wrap z-50">
                <label htmlFor="last_name" className="font-semibold">
                  Last Name
                </label>
                <div>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={credentials.last_name}
                    onChange={onChange}
                    className="text-black bg-[#cfcfcf]"
                  />
                </div>
              </div>
              <div className="flex p-2 justify-between m-1 flex-wrap z-50">
                <label htmlFor="age" className="font-semibold">
                  Age
                </label>
                <div>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={credentials.age}
                    onChange={onChange}
                    className="text-black bg-[#cfcfcf]"
                  />
                </div>
              </div>
              <div className="flex p-2 justify-between m-1 flex-wrap">
                <label htmlFor="mob" className="font-semibold">
                  Mobile Number
                </label>
                <div>
                  <input
                    type="number"
                    id="mob"
                    name="mob"
                    value={credentials.mob}
                    onChange={onChange}
                    className="text-black bg-[#cfcfcf]"
                  />
                </div>
              </div>
              <div className="flex p-2 justify-between m-1 flex-wrap">
                <label htmlFor="email" className="font-semibold">
                  Email
                </label>
                <div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={credentials.email}
                    onChange={onChange}
                    className="text-black bg-[#cfcfcf]"
                  />
                </div>
              </div>
              <div className="flex p-2 justify-between m-1 flex-wrap">
                <label htmlFor="password" className="font-semibold">
                  Password
                </label>
                <div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={credentials.password}
                    onChange={onChange}
                    className="text-black bg-[#cfcfcf]"
                  />
                </div>
              </div>
              <div className="text-center mx-auto font-semibold">
                <button
                  onClick={() => {
                    closemod[1](true);
                    closemod[0](false);
                  }}
                >
                  Already a user...?
                </button>
              </div>
              <div className="text-center mx-auto font-semibold m-3 bg-[#131722] rounded-md text-white w-[100px] p-1 hover:bg-[#414141]">
                <button type="submit">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
