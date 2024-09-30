import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import {
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";

import { MdPassword } from "react-icons/md";

import { auth } from "../../config/firebase.config";
import { ResetPassword, UserAuthInput } from "../../components/Auth";
import { buttonClick } from "../../animations";

function Password() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isForgot, setIsForgot] = useState(false);

  const update = async () => {
    try {
      const user = auth.currentUser;

      if (user) {
        // Xác thực lại người dùng
        const credential = EmailAuthProvider.credential(
          user.email,
          currentPassword
        );
        await reauthenticateWithCredential(user, credential);

        if (password === confirmPassword) {
          // Cập nhật mật khẩu
          await updatePassword(user, password);
          toast.success("Password updated");
          setCurrentPassword("");
          setPassword("");
          setConfirmPassword("");
        } else {
          toast.error("Passwords do not match");
        }
      } else {
        toast.error("No user is currently signed in.");
      }
    } catch (error) {
      toast.error(`Error updating password: ${error.message}`);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <p className="font-semibold text-xl text-gray-900">Password</p>
        <small>Manage your password.</small>
      </div>
      <UserAuthInput
        label="Current Password"
        placeholder="Enter your current password"
        isPassword={true}
        setStateFunction={setCurrentPassword}
        Icon={MdPassword}
        values={currentPassword}
      />
      <UserAuthInput
        label="New Password"
        placeholder="Password needs to be more than 6 characters"
        isPassword={true}
        setStateFunction={setPassword}
        Icon={MdPassword}
        values={password}
      />
      <UserAuthInput
        label="Confirm Password"
        placeholder="Confirm your new password"
        isPassword={true}
        setStateFunction={setConfirmPassword}
        Icon={MdPassword}
        values={confirmPassword}
      />
      <div className="flex mt-4 justify-between">
        <motion.div
          {...buttonClick}
          onClick={update}
          className="flex items-center justify-center p-2 rounded-xl hover:bg-blue-700 cursor-pointer bg-blue-600"
        >
          <p className="text-xl text-white">Update Password</p>
        </motion.div>
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
    </div>
  );
}

export default Password;
