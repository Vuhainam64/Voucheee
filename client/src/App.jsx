import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { createDefaultRole, getRoleWithRoleID } from "./api";
import { SET_USER } from "./context/actions/userActions";
import { SET_ROLE } from "./context/actions/roleActions";
import { auth, db } from "./config/firebase.config";
import { Spinner } from "./components/Spinner";
import { Routers } from "./routers";

function App() {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [userRole, setUserRole] = useState("");

  const getUserDataAndRole = (userCred) => {
    getDoc(doc(db, "user", userCred.uid)).then((userDoc) => {
      if (userDoc.exists() && userDoc.data().roleId) {
        console.log("userDoc: ", userDoc.data());
        const userData = {
          ...userCred.providerData[0],
          displayName: userCred.displayName,
          emailVerified: userCred.emailVerified,
          creationTime: userCred.metadata.creationTime,
          lastSignInTime: userCred.metadata.lastSignInTime,
          photoURL: userCred.photoURL,
          roleId: userDoc.data().roleId,
        };
        setDoc(doc(db, "user", userCred.uid), userData).then(() => {
          dispatch(SET_USER(userData));
          if (userCred.emailVerified) {
            setIsEmailVerified(true);
          } else {
            setIsEmailVerified(false);
          }
        });
        const getRole = async () => {
          const roleId = userDoc.data().roleId;
          const role = await getRoleWithRoleID(roleId);
          setUserRole(role);
          console.log("role_name: ", role);
          dispatch(SET_ROLE(role));
        };
        getRole();
        localStorage.setItem("userId", userCred.uid);
        localStorage.setItem("uid", userCred.providerData[0].uid);
        console.log("userCred: ", userCred);
        console.log("roleID: ", userDoc.data().roleId);
        console.log("uid: ", userCred.providerData[0].uid);
      } else {
        console.log("Invalid roleId => Update role");
        setDoc(doc(db, "user", userCred.uid), userCred.providerData[0]);
        createDefaultRole(userCred.uid).then(() => {
          // Sau khi cập nhật role, gọi lại hàm getUserDataAndRole để cập nhật dữ liệu mới
          getUserDataAndRole(userCred);
        });
      }
    });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      (userCred) => {
        if (userCred) {
          setIsLogin(true);
          getUserDataAndRole(userCred);
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
