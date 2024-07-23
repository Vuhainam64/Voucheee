import { useState } from "react";
import { useSelector } from "react-redux";
import { sendPasswordResetEmail } from "firebase/auth";

import { AiOutlineClose } from "react-icons/ai";
import { HiOutlineKey, HiOutlineMail } from "react-icons/hi";
import { FaEnvelope } from "react-icons/fa6";
import { IoArrowBackOutline } from "react-icons/io5";

import { toast } from "react-toastify";
import { auth } from "../../../config/firebase.config";
import UserAuthInput from "./UserAuthInput";

function ResetPassword(props) {
  const user = useSelector((state) => state?.user?.user);
  const [email, setEmail] = useState(user.email || "");
  const setGetEmailValidationStatus = useState(false);
  const [sendEmail, setSendEmail] = useState(false);

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setSendEmail(true);
    } catch (err) {
      if (err.message.includes("missing-email")) {
        toast.warning("Account not found");
      }
    }
  };
  return (
    <div className="fixed z-30 top-0 inset-x-0 px-4 pt-6 sm:px-0 sm:flex sm:items-top sm:justify-center">
      <div className="fixed inset-0 transform">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <div className="modal-content bg-white rounded-lg overflow-y-auto shadow-xl transform transition-all sm:w-full sm:max-w-lg">
        <div className="bg-white relative p-4 md:p-6">
          <div className="absolute top-4 right-4">
            <button className="text-gray-500 hover:text-gray-900 cursor-pointer">
              <AiOutlineClose onClick={() => props.setIsForgot(false)} />
            </button>
          </div>

          {/* email reset form  */}
          {!sendEmail ? (
            <>
              <div className="sm:flex sm:flex-col sm:items-start">
                <div className="flex w-full justify-center mb-4">
                  <div className="w-14 h-14 rounded-full flex justify-center items-center bg-blue-100 text-blue-600">
                    <HiOutlineKey className="text-2xl" />
                  </div>
                </div>
                <div className="mt-3 text-center sm:mt-0 w-full">
                  <div className="text-2xl font-semibold text-center text-gray-900">
                    Forgot password?
                  </div>
                </div>
                <div className="mt-2 w-full">
                  <div className="text-center text-base">
                    No worries, we'll send you reset instructions.
                  </div>
                  <div className="p-4">
                    <UserAuthInput
                      label="Email"
                      placeholder="Email"
                      isPassword={false}
                      setStateFunction={setEmail}
                      Icon={FaEnvelope}
                      setGetEmailValidationStatus={setGetEmailValidationStatus}
                      values={email}
                    />
                    <div className="w-full mt-2">
                      <div
                        onClick={handleResetPassword}
                        className="w-full my-3 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white text-center text-base font-medium rounded-lg "
                      >
                        <span className="no-underline mx-auto">
                          Reset password
                        </span>
                      </div>
                    </div>
                    <div className="w-full text-center ">
                      <div
                        onClick={() => props.setIsForgot(false)}
                        className="text-xs hover:underline text-gray-500 sm:text-sm hover:text-gray-700 cursor-pointer flex items-center justify-center mt-4 -mb-4"
                      >
                        <IoArrowBackOutline className="text-xl mr-2" />
                        Back to log in
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* check email  */}
              <div className="sm:flex sm:flex-col sm:items-start">
                <div className="flex w-full justify-center mb-4">
                  <div className="w-14 h-14 rounded-full flex justify-center items-center bg-blue-100 text-blue-600">
                    <HiOutlineMail className="text-3xl" />
                  </div>
                </div>
                <div className="mt-3 text-center sm:mt-0 w-full">
                  <div className="text-2xl font-semibold text-center text-gray-900">
                    Check your email
                  </div>
                </div>
                <div className="mt-2 w-full">
                  <div className="text-center">
                    We sent a password reset link to <br />
                    {email}
                  </div>
                </div>
                <div className="w-full p-2 text-center">
                  <span className="mt-4 flex items-center justify-center text-base">
                    Didn't receive the email?
                    <div
                      onClick={handleResetPassword}
                      className="ml-1 cursor-pointer text-blue-600 hover:underline"
                    >
                      Click to resend
                    </div>
                  </span>
                </div>
                <div className="w-full text-center ">
                  <div
                    onClick={() => props.setIsForgot(false)}
                    className="text-xs hover:underline text-gray-500 sm:text-sm hover:text-gray-700 cursor-pointer flex items-center justify-center mt-4"
                  >
                    <IoArrowBackOutline className="text-xl mr-2" />
                    Back to log in
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
