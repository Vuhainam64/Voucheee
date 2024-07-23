import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";

import { Routers } from "./routers";
import { Spinner } from "./components/Loading";
import { SET_USER, SET_USER_NULL } from "./context/actions/userActions";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const fetchData = async () => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      try {
        const decodedToken = jwtDecode(accessToken);
        const accountId = decodedToken?.nameid;
        if (accountId) {
          dispatch(SET_USER(decodedToken));
          setIsLogin(true);
        } else {
          dispatch(SET_USER_NULL());
          setIsLogin(false);
        }
        console.log(accountId);
      } catch (err) {
        console.error("Error decoding token: ", err);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log("No access token received.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      {isLoading ? (
        <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
          <Spinner />
        </div>
      ) : (
        <Routers isLogin={isLogin} />
      )}
    </>
  );
};

export default App;
