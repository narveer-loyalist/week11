import React, { useContext, useEffect, useState } from "react";
import Header from "../Component/Header";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";

function Login() {
  const [signup, setSignup] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const { onUserAuthenticate } = useContext(UserContext);
  const dispatch = useDispatch();

  const registerHandler = async () => {
    try {
      await axios
        .post("http://localhost:5000/api/user/registerUser ", {
          username: userName,
          password: password,
        })
        .then((res) => {
          dispatch({
            type: "ADD_USER_DETAIL",
            payload: res.data.user,
          });
          onUserAuthenticate();
          navigate("/");
        });
    } catch (err) {
      console.log(err);
    }
  };

  const loginHandler = async () => {
    try {
      await axios
        .post("http://localhost:5000/api/user/loggedInUser", {
          username: userName,
          password: password,
        })
        .then((res) => {
          dispatch({
            type: "ADD_USER_DETAIL",
            payload: res.data.user,
          });
          onUserAuthenticate();
          navigate("/");
        });
    } catch (err) {
      console.log(err);
    }
  };

  const getUsers = async () => {
    try {
      await axios.get("http://localhost:5000/api/user/getUsers").then((res) => {
        setUsers(res.data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUsers();
  }, [userName]);

  const exsistedUser = !!users.find((item) => item.username === userName);

  return (
    <div className="flex flex-col   items-center justify-center h-screen">
      <div className="p-4 space-y-4 text-center shadow-lg ">
        <p className="text-2xl font-semibold">{signup ? `SignUp` : `Login`}</p>
        <div>
          <input
            onChange={(e) => setUserName(e.target.value)}
            className="bg-transparent border border-black px-4 py-2 w-[400px] rounded-md"
            type="text"
            placeholder="Enter Username"
          />
        </div>
        <p className="text-red-600">
          {exsistedUser && signup && `Username already taken`}
        </p>
        <div>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="bg-transparent border border-black px-4 py-2 w-[400px] rounded-md"
            type="password"
            placeholder="Enter Password"
          />
        </div>
        {signup ? (
          <button
            onClick={registerHandler}
            className="bg-[#231F20] text-white px-4 py-2 rounded-md min-w-[300px]"
          >
            SignUp
          </button>
        ) : (
          <button
            onClick={loginHandler}
            className="bg-[#231F20] text-white px-4 py-2 rounded-md min-w-[300px]"
          >
            Login
          </button>
        )}
        {!signup ? (
          <p onClick={() => setSignup(true)}>
            Don't have account?{" "}
            <spam className="text-blue-600 cursor-pointer font-semibold">
              SignUp
            </spam>
          </p>
        ) : (
          <p onClick={() => setSignup(false)}>
            Already't have account?{" "}
            <spam className="text-blue-600 cursor-pointer font-semibold">
              Login
            </spam>
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;
