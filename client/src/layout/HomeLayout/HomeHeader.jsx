import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { BsFillBellFill } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";

import { logoPrimary } from "../../assets/img";
import { setAllNotify } from "../../context/actions/allNotifyActions";

import { buttonClick } from "../../animations";
import UserProfileDetails from "../HomeLayout/UserProfileDetails";
import SearchInput from "./SearchInput";

const HomeHeader = () => {
  const user = useSelector((state) => state.user?.user);
  const allNotify = useSelector((state) => state.allNotify?.allNotify);
  const cart = useSelector((state) => state.cart?.cart);

  const dispatch = useDispatch();

  const [hasShadow, setHasShadow] = useState(false);

  useEffect(() => {
    async function fetchNotify() {
      try {
        const notiData = "";
        dispatch(setAllNotify(notiData));
      } catch (error) {
        console.log("Error fetching notify:", error);
        dispatch(setAllNotify([]));
      }
    }
    fetchNotify();
  }, [dispatch]);

  // Filter the 3 most recent notifications
  const recentNotifications = allNotify
    ? allNotify.sort((a, b) => b.createdAt - a.createdAt).slice(0, 3) // Get the first 3 notifications
    : [];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHasShadow(true);
      } else {
        setHasShadow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`flex flex-col items-center justify-between bg-white w-full border-b ${
        hasShadow ? "shadow-xl" : ""
      }`}
    >
      <div className="max-w-[1400px] mx-auto flex items-center w-full justify-between">
        <Link to="/">
          <img src={logoPrimary} alt="logo" className="p-4 h-20" />
        </Link>

        <div className="flex items-center space-x-4">
          <SearchInput placeholder="Tìm kiếm voucher..." />

          <Link
            to={"/cart/select"}
            {...buttonClick}
            className="relative cursor-pointer"
          >
            <FiShoppingCart className="text-xl" />
            {cart &&
              cart.totalQuantity >= 0 && ( // Hiển thị số lượng nếu có
                <div className="absolute left-3 bottom-3 bg-primary text-white py-1 px-2 rounded-full text-xs">
                  {cart.totalQuantity}
                </div>
              )}
          </Link>
        </div>

        <div className="flex items-center">
          <div className="hidden md:block ml-auto relative">
            <Link
              to={"/help"}
              className="text-sm text-gray-600 hover:text-gray-800 cursor-pointer mt-1"
            >
              Help
            </Link>
          </div>
          <div className="flex items-center ml-8 group relative">
            <BsFillBellFill className="hover:text-blue-600" />
            <div className="hidden group-hover:block absolute top-10 -right-4 border rounded-2xl bg-white shadow-md z-10">
              <div className="bg-white w-72 m-4">
                {recentNotifications.length > 0 ? (
                  recentNotifications.map((notification) => (
                    <div key={notification.notifyId} className="border-b my-2">
                      <div className="font-semibold flex items-center">
                        <BsFillBellFill className="mx-2" />
                        <div className="text-[14px]">
                          {notification.description}
                        </div>
                      </div>
                      <div className="ml-8">{notification.feedbackName}</div>
                      <div className="text-[12px] flex w-full flex-row-reverse opacity-70">
                        Created At:{" "}
                        {new Date(notification.createdAt).toLocaleTimeString()}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    No notifications available.
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="hidden md:block pl-5 border-gray-300 border-r h-5"></div>
          <div className="block">
            <div className="flex items-center">
              <div className="ml-3 mr-4 relative">
                <div className="relative inline-block text-left">
                  {user ? (
                    <UserProfileDetails />
                  ) : (
                    <div className="flex gap-2">
                      <Link
                        to={"/auth/login"}
                        className="text-gray-600 hover:text-gray-800 px-0 sm:px-3 py-2 rounded-md text-sm"
                      >
                        Login
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
