import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";

import { FcGoogle } from "react-icons/fc";
import { AiOutlineCheck } from "react-icons/ai";
import { FaEnvelope } from "react-icons/fa6";
import { MdPassword } from "react-icons/md";

import { signInWithGoogle } from "../../utils/helpers";
import { ResetPassword, UserAuthInput } from "../../components/Loading/Auth";
import { auth } from "../../config/firebase.config";
import { loginWithEmailPass } from "../../api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isForgot, setIsForgot] = useState(false);
  const [getEmailValidationStatus, setGetEmailValidationStatus] =
    useState(false);

  const loginWithEmailPassword = async () => {
    if (getEmailValidationStatus) {
      await loginWithEmailPass(email, password)
        .then((userCred) => {
          if (userCred) {
            console.log(userCred);
            localStorage.setItem("accessToken", userCred.token);
            toast.success("Login successful.");
            window.location.reload();
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.message.includes("user-not-found")) {
            toast.warning("Invalid Id: User not found");
          } else if (err.message.includes("wrong-password")) {
            toast.warning("Password is incorrect");
          } else {
            toast.error("Temporarily disabled due to many failed logins");
          }
        });
    }
  };

  return (
    <div className="flex-grow">
      <div className="flex mt-6 mb-10">
        <div
          className={`w-full md:max-w-6xl mx-auto px-4 flex md:flex-row-reverse flex-wrap`}
        >
          <div className="w-full md:w-1/2 md:p-6">
            <div className="border rounded-md p-6 shadow-md sticky top-4">
              <div>
                <h2 className="font-semibold text-2xl">Login to Vouchee</h2>
                <small>Welcome back! Please enter your details.</small>
                <>
                  <UserAuthInput
                    label="Email"
                    placeholder="example@gmail.com"
                    isPassword={false}
                    setStateFunction={setEmail}
                    Icon={FaEnvelope}
                    setGetEmailValidationStatus={setGetEmailValidationStatus}
                    values={email}
                  />
                  <UserAuthInput
                    label="Password"
                    placeholder="Password need more than 6 letter"
                    isPassword={true}
                    setStateFunction={setPassword}
                    Icon={MdPassword}
                    values={password}
                  />
                  <div className="relative flex items-center my-5">
                    <div className="flex items-center w-full md:w-1/2">
                      <input
                        type="checkbox"
                        className="rounded border-gray-500 cursor-pointer w-3 h-3"
                      />
                      <label className="text-gray-700 ml-2">
                        {" "}
                        Remember Me{" "}
                      </label>
                    </div>
                    <div className="w-full md:w-1/2 text-right">
                      <Link
                        onClick={() => setIsForgot(!isForgot)}
                        className="text-xs hover:underline text-gray-500 sm:text-sm hover:text-gray-700"
                      >
                        Forgot your password?
                      </Link>
                      {isForgot && <ResetPassword setIsForgot={setIsForgot} />}
                    </div>
                  </div>
                  <motion.div
                    onClick={loginWithEmailPassword}
                    whileTap={{ scale: 0.9 }}
                    className="flex items-center justify-center w-full py-3 rounded-xl hover:bg-opacity-80 cursor-pointer bg-primary"
                  >
                    <p className="text-xl text-white">Login</p>
                  </motion.div>
                </>

                <div className="flex items-center justify-center gap-12">
                  <div className="h-[1px] bg-[rgba(15,6,6,0.2)] rounded-md w-24 m-5"></div>
                  <p className="text-sm text-[rgba(15,6,6,0.2)] m-5">OR</p>
                  <div className="h-[1px] bg-[rgba(15,6,6,0.2)] rounded-md w-24 m-5"></div>
                </div>

                <motion.div
                  onClick={signInWithGoogle}
                  whileTap={{ scale: 0.9 }}
                  className="flex items-center justify-center gap-3 bg-[rgba(2566,256,256,0.2)] backdrop-blur-md w-full py-3 rounded-xl hover:bg-[rgba(2566,256,256,0.4)] cursor-pointer border border-gray-500"
                >
                  <FcGoogle className="text-3xl" />
                  <p className="text-xl  ">Sign In With Google</p>
                </motion.div>

                <p className="text-gray-500 mt-4">
                  {" "}
                  Doesn't have an account?{" "}
                  <Link
                    to={"/auth/register"}
                    className="font-semibold ml-1 text-primary cursor-pointer"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
          </div>
          {/* Context form  */}
          <div className="w-full md:w-1/2 md:p-6 mt-8 md:mt-0">
            <h1 className="font-bold text-3xl">
              {" "}
              Easy to find the voucher with Vouchee - save time for solutions{" "}
            </h1>
            <p className="text-gray-900 my-4 text-lg">
              {" "}
              If you have problems with the Vouchee, you can easily send us
              feedback now because it's free.{" "}
            </p>
            <div className="flex flex-wrap justify-center">
              <div className="flex items-center text-gray-400 text-sm  px-3 pb-3 ">
                <AiOutlineCheck className=" text-primary " />
                <span>Find Voucher</span>
              </div>
              <div className="flex items-center text-gray-400 text-sm  px-3 pb-3 ">
                <AiOutlineCheck className=" text-primary" />
                <span> Check Price</span>
              </div>
              <div className="flex items-center text-gray-400 text-sm  px-3 pb-3 ">
                <AiOutlineCheck className=" text-primary" />
                <span>Become the Seller</span>
              </div>
            </div>
            {/* <div className="py-10">
              <img src={logoPrimary} alt="logo" />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
