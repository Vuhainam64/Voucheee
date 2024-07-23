import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";

import { FcGoogle } from "react-icons/fc";
import { AiOutlineCheck } from "react-icons/ai";
import { FaEnvelope } from "react-icons/fa6";
import { MdPassword, MdPhone } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";

import { signInWithGoogle } from "../../utils/helpers";
import { auth } from "../../config/firebase.config";
import { UserAuthInput } from "../../components/Loading/Auth";

const Register = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [getEmailValidationStatus, setGetEmailValidationStatus] =
    useState(false);

  const createNewUser = async () => {
    if (!agreedToTerms) {
      toast.warning("You must agree to the terms and conditions.");
      return;
    }
    if (getEmailValidationStatus) {
      if (password !== confirmPassword) {
        toast.warning("Passwords do not match.");
        return;
      }
      try {
        const userCred = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        if (userCred) {
          await updateProfile(userCred.user, {
            displayName: name,
          });
          await sendEmailVerification(userCred.user);
          console.log(userCred);
          toast.success(
            "Account created successfully. Please check your email for verification."
          );
        }
      } catch (error) {
          toast.warning("An error occurred while creating the account.");
      }
    }
  };

  return (
    <div className="flex-grow">
      <div className="flex mt-6 mb-10">
        <div
          className={`w-full md:max-w-6xl mx-auto px-4 flex md:flex-row-reverse flex-wrap items-center`}
        >
          <div className="w-full md:w-1/2 md:p-6">
            <div className="border rounded-md p-6 shadow-md sticky top-4">
              <div>
                <h2 className="font-semibold text-2xl">Create an account</h2>
                <small>Sign up in less than 2 minutes.</small>
                <>
                  <UserAuthInput
                    label="Username"
                    placeholder="Your username"
                    isPassword={false}
                    setStateFunction={setUsername}
                    Icon={RxAvatar}
                    values={username}
                  />
                  <div className="flex space-x-4">
                    <UserAuthInput
                      label="Name"
                      placeholder="Your name"
                      isPassword={false}
                      setStateFunction={setName}
                      Icon={RxAvatar}
                      values={name}
                    />
                    <UserAuthInput
                      label="Phone"
                      placeholder="Your phone"
                      isPassword={false}
                      setStateFunction={setPhone}
                      Icon={MdPhone}
                      values={phone}
                    />
                  </div>
                  <UserAuthInput
                    label="Email"
                    placeholder="example@gmail.com"
                    isPassword={false}
                    setStateFunction={setEmail}
                    Icon={FaEnvelope}
                    setGetEmailValidationStatus={setGetEmailValidationStatus}
                    values={email}
                  />
                  <div className="flex space-x-4">
                    <UserAuthInput
                      label="Password"
                      placeholder="Password need more than 6 letter"
                      isPassword={true}
                      setStateFunction={setPassword}
                      Icon={MdPassword}
                      values={password}
                    />
                    <UserAuthInput
                      label="Confirm Password"
                      placeholder="Confirm your password"
                      isPassword={true}
                      setStateFunction={setConfirmPassword}
                      Icon={MdPassword}
                      values={confirmPassword}
                    />
                  </div>
                  <div className="relative mb-3">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-500 cursor-pointer w-5 h-5"
                        checked={agreedToTerms}
                        onChange={() => setAgreedToTerms(!agreedToTerms)}
                      />
                      <label className="text-gray-700 ml-2 text-sm mt-3">
                        I agree with the{" "}
                        <Link to={"/terms-conditions"} className="text-primary">
                          Terms and conditions
                        </Link>{" "}
                        and{" "}
                        <Link to={"/privacy-policy"} className="text-primary">
                          Privacy policy
                        </Link>{" "}
                        of the website and I accept them.
                      </label>
                    </div>
                  </div>
                  <motion.div
                    onClick={createNewUser}
                    whileTap={{ scale: 0.9 }}
                    className="flex items-center justify-center w-full py-3 rounded-xl hover:bg-blue-500 cursor-pointer bg-blue-600"
                  >
                    <p className="text-xl text-white">Create an account</p>
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
                    to={"/auth/login"}
                    className="font-semibold ml-1 text-primary text-base cursor-pointer"
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

export default Register;
