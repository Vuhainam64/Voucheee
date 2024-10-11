import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { auth } from "./config/firebase.config";

import { SET_USER } from "./context/actions/userActions";
import { SET_ROLE } from "./context/actions/roleActions";

import { getUserInfo } from "./api/auth";
import { Spinner } from "./components/Spinner";
import { Routers } from "./routers";

function App() {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [userRole, setUserRole] = useState("");

  const getUserData = async (userCred) => {
    try {
      const userInfo = await getUserInfo(userCred.accessToken);
      if (userInfo) {
        console.log("User Info:", userInfo);
        const { email, accessToken, roleId, roleName } = userInfo;
        // Cập nhật thông tin người dùng vào Redux
        const userData = {
          ...userCred.providerData[0],
          displayName: userInfo.name,
          email,
          emailVerified: userCred.emailVerified,
          creationTime: userCred.metadata.creationTime,
          lastSignInTime: userCred.metadata.lastSignInTime,
          photoURL: userInfo.image,
          roleId,
        };
        dispatch(SET_USER(userData));
        setUserRole(roleName);
        dispatch(SET_ROLE(roleName));
        // localStorage.setItem("userId", userCred.uid);
        // localStorage.setItem("uid", userCred.providerData[0].uid);
        localStorage.setItem("accessToken", accessToken); // Lưu access token nếu cần
      } else {
        console.log("No user info found.");
      }
      setIsEmailVerified(userCred.emailVerified);
    } catch (error) {
      console.error("Error getting user data:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      (userCred) => {
        if (userCred) {
          setIsLogin(true);
          getUserData(userCred);
        } else {
        }

        setInterval(() => {
          setIsLoading(false);
        }, 1000);
      },
      [dispatch]
    );

    return () => unsubscribe();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      {isLoading ? (
        <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
          <Spinner />
        </div>
      ) : (
        <div className="bg-white">
          <Routers
            isLogin={isLogin}
            isEmailVerified={isEmailVerified}
            userRole={userRole}
          />
        </div>
      )}
    </>
  );
}

export default App;
