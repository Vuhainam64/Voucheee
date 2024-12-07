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

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isForgot, setIsForgot] = useState(false);

  const update = async () => {
    try {
      // Kiểm tra xem người dùng đã nhập đầy đủ thông tin hay chưa
      if (!currentPassword) {
        toast.error("Vui lòng nhập mật khẩu hiện tại.");
        return;
      }
      if (!password) {
        toast.error("Vui lòng nhập mật khẩu mới.");
        return;
      }
      if (!confirmPassword) {
        toast.error("Vui lòng nhập lại mật khẩu để xác nhận.");
        return;
      }

      if (password.length < 6) {
        toast.error("Mật khẩu mới cần ít nhất 6 ký tự.");
        return;
      }

      if (password !== confirmPassword) {
        toast.error("Mật khẩu mới và mật khẩu xác nhận không khớp.");
        return;
      }

      const user = auth.currentUser;

      if (user) {
        // Xác thực lại người dùng
        const credential = EmailAuthProvider.credential(
          user.email,
          currentPassword
        );
        await reauthenticateWithCredential(user, credential);

        // Cập nhật mật khẩu nếu xác thực thành công
        await updatePassword(user, password);
        toast.success("Cập nhật mật khẩu thành công.");
        setCurrentPassword("");
        setPassword("");
        setConfirmPassword("");
      } else {
        toast.error("Không có người dùng nào đang đăng nhập.");
      }
    } catch (error) {
      // Xử lý lỗi chi tiết dựa trên mã lỗi Firebase
      switch (error.code) {
        case "auth/wrong-password":
          toast.error("Mật khẩu hiện tại không chính xác.");
          break;
        case "auth/too-many-requests":
          toast.error("Đã có quá nhiều yêu cầu. Vui lòng thử lại sau.");
          break;
        case "auth/weak-password":
          toast.error("Mật khẩu mới quá yếu. Vui lòng chọn mật khẩu mạnh hơn.");
          break;
        case "auth/user-not-found":
          toast.error("Người dùng không tồn tại hoặc đã bị xóa.");
          break;
        case "auth/invalid-login-credentials":
          toast.error("Thông tin đăng nhập không hợp lệ.");
          break;
        default:
          toast.error(`Lỗi không xác định: ${error.message}`);
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-md">
        <div className="text-lg font-semibold">Đổi mật khẩu</div>
      </div>
      <div className="bg-white p-4 rounded-md">
        <UserAuthInput
          label="Mật khẩu hiện tại"
          placeholder="Nhập mật khẩu hiện tại của bạn"
          isPassword={true}
          setStateFunction={setCurrentPassword}
          Icon={MdPassword}
          values={currentPassword}
        />
        <UserAuthInput
          label="Mật khẩu mới"
          placeholder="Mật khẩu cần dài hơn 6 ký tự"
          isPassword={true}
          setStateFunction={setPassword}
          Icon={MdPassword}
          values={password}
        />
        <UserAuthInput
          label="Xác nhận mật khẩu"
          placeholder="Xác nhận lại mật khẩu mới"
          isPassword={true}
          setStateFunction={setConfirmPassword}
          Icon={MdPassword}
          values={confirmPassword}
        />
        <div className="flex mt-4 justify-between">
          <motion.div
            {...buttonClick}
            onClick={update}
            className="flex items-center justify-center p-2 rounded-xl hover:bg-secondary cursor-pointer bg-primary"
          >
            <p className="text-xl text-white">Cập nhật mật khẩu</p>
          </motion.div>
          <div className="w-full md:w-1/2 text-right">
            <Link
              onClick={() => setIsForgot(!isForgot)}
              className="text-xs hover:underline text-gray-500 sm:text-sm hover:text-gray-700"
            >
              Quên mật khẩu?
            </Link>
            {isForgot && <ResetPassword setIsForgot={setIsForgot} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
