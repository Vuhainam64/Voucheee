import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { auth } from "./config/firebase.config";

import { SET_USER } from "./context/actions/userActions";
import { SET_ROLE } from "./context/actions/roleActions";
import { SET_LOCATION } from "./context/actions/locationActions";
import { SET_CART } from "./context/actions/cartActions";

import { getUserInfo } from "./api/auth";
import { getCart } from "./api/cart";
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
        const { email, accessToken, roleId, roleName } = userInfo;
        // Cập nhật thông tin người dùng vào Redux
        localStorage.setItem("access_token", accessToken);

        const userData = {
          ...userCred.providerData[0],
          displayName: userInfo.name,
          email,
          emailVerified: userCred.emailVerified,
          creationTime: userCred.metadata.creationTime,
          lastSignInTime: userCred.metadata.lastSignInTime,
          photoURL: userInfo.image,
          roleId,
          accessToken,
        };
        dispatch(SET_USER(userData));
        setUserRole(roleName);
        dispatch(SET_ROLE(roleName));

        // Gọi API để lấy giỏ hàng
        const cartData = await getCart(userCred.accessToken);
        dispatch(SET_CART(cartData));

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              dispatch(SET_LOCATION({ latitude, longitude }));
            },
            (error) => {
              console.error("Error getting location:", error);
            }
          );
        }
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
        }
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      },
      [dispatch]
    );

    return () => unsubscribe();
    // eslint-disable-next-line
  }, [dispatch]);

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
