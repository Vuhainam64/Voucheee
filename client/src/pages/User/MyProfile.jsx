import React, { useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Button, Form, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

import { RxAvatar } from "react-icons/rx";
import { MdDelete, MdOutlineEmail } from "react-icons/md";

import { Avatar } from "../../assets/img";
import { Spinner } from "../../components/Spinner";
import { SET_USER } from "../../context/actions/userActions";
import { buttonClick } from "../../animations";
import { auth, db, storage } from "../../config/firebase.config";

const MyProfile = () => {
  const user = useSelector((state) => state?.user?.user);
  const userId = auth.currentUser?.uid;
  const dispatch = useDispatch();

  const [name, setName] = useState(user.displayName || "");
  const [email, setEmail] = useState(user.email || "");
  const [isLoading, setisLoading] = useState(false);
  const [progress, setProgress] = useState(null);
  const [imageDownloadURL, setImageDownloadURL] = useState(null);

  const uploadImage = (e) => {
    setisLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `Images/${Date.now()}_${imageFile.name}`);

    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageDownloadURL(downloadURL);
          setisLoading(false);
          setProgress(null);
          toast.success("Image Uploaded to the cloud.");
        });
      }
    );
  };

  const deleteImageFromFirebase = () => {
    setisLoading(true);
    const deleteRef = ref(storage, imageDownloadURL);

    deleteObject(deleteRef).then(() => {
      setImageDownloadURL(null);
      setisLoading(false);
      toast.success("Image removed from the cloud.");
    });
  };

  const submitNewData = async () => {
    try {
      if (name !== user.displayName) {
        await updateProfile(auth.currentUser, { displayName: name });
      }
      if (imageDownloadURL) {
        await updateProfile(auth.currentUser, { photoURL: imageDownloadURL });
      }
      await updateDoc(doc(db, "user", userId), {
        displayName: name,
        photoURL: imageDownloadURL || user.photoURL,
      });
      dispatch(
        SET_USER({
          ...user,
          displayName: name,
          photoURL: imageDownloadURL || user.photoURL,
        })
      );
      toast.success("User data updated successfully.");
    } catch (error) {
      toast.error(`Error updating user data: ${error}`);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-md">
        <div className="text-lg font-semibold">Thông Tin Cá Nhân</div>
      </div>
      <div className="bg-white p-4 rounded-md">
        <div className="flex items-center relative justify-center">
          <label>
            <input
              type="file"
              accept="image/*"
              onChange={uploadImage}
              style={{ display: "none" }}
            />
            {isLoading ? (
              <div className="w-full h-full flex flex-col items-center justify-evenly">
                <Spinner />
                {Math.round(progress > 0) && (
                  <div className=" w-full flex flex-col items-center justify-center gap-2">
                    <div className="flex justify-between w-full">
                      <span className="text-base font-medium text-textColor pr-3">
                        Progress
                      </span>
                      <span className="text-sm font-medium text-textColor">
                        {Math.round(progress) > 0 && (
                          <>{`${Math.round(progress)}%`}</>
                        )}
                      </span>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-red-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                        style={{
                          width: `${Math.round(progress)}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative w-full h-full overflow-hidden rounded-md">
                <motion.img
                  whileHover={{ scale: 1.15 }}
                  src={
                    imageDownloadURL
                      ? imageDownloadURL
                      : user?.photoURL
                      ? user?.photoURL
                      : Avatar
                  }
                  className="rounded-full my-4 h-32 w-32"
                />
              </div>
            )}
            {imageDownloadURL && (
              <motion.div
                {...buttonClick}
                type="button"
                className="absolute top-1 left-24 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out"
                onClick={() => deleteImageFromFirebase(imageDownloadURL)}
              >
                <MdDelete className="-rotate-0" />
              </motion.div>
            )}
          </label>
        </div>
        <Form
          layout="vertical"
          className="space-y-4"
          initialValues={{
            name: name,
            email: email,
          }}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input
              prefix={<RxAvatar />}
              placeholder="Your name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              prefix={<MdOutlineEmail />}
              placeholder="Your email"
              onChange={(e) => setEmail(e.target.value)}
              disabled
            />
          </Form.Item>
        </Form>
        <div className="flex w-full justify-end mt-4">
          <Button
            type="primary"
            onClick={submitNewData}
            className="bg-primary"
            size="large"
          >
            Save changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
