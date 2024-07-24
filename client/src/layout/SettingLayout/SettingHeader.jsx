import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { BsFillBellFill } from "react-icons/bs";

import { Logo } from "../../assets/img";
import { setAllNotify } from "../../context/actions/allNotifyActions";
import { getNotifications } from "../../api";
import UserProfileDetails from "../HomeLayout/UserProfileDetails";

function SettingHeader() {
  const user = useSelector((state) => state.user?.user);
  const allNotify = useSelector((state) => state.allNotify?.allNotify);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchNotify() {
      try {
        const notiData = await getNotifications();
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

  return (
    <>
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link
                to={"/"}
                className="flex-shrink-0 font-semibold hover:no-underline flex items-center router-link-active"
              >
                <img src={Logo} alt="Logo" className="w-8 h-8" />
                <span className="ml-2 text-md hidden sm:inline text-black ">
                  {" "}
                  Vouchee!
                </span>
              </Link>
            </div>
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
                      <div
                        key={notification.notifyId}
                        className="border-b my-2"
                      >
                        <div className="font-semibold flex items-center">
                          <BsFillBellFill className="mx-2" />
                          <div className="text-[14px]">
                            {notification.description}
                          </div>
                        </div>
                        <div className="ml-8">{notification.feedbackName}</div>
                        <div className="text-[12px] flex w-full flex-row-reverse opacity-70">
                          Created At:{" "}
                          {new Date(
                            notification.createdAt
                          ).toLocaleTimeString()}
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
                          {" "}
                          Login{" "}
                        </Link>
                        <Link
                          to={"/auth/login"}
                          className="v-btn py-1 px-2
                    bg-transparent border border-blue-600 hover:bg-blue-600 focus:ring-blue-500 focus:ring-offset-blue-200
                    text-blue-600 hover:text-white transition ease-in duration-200 text-center text-sm font-medium focus:outline-none focus:ring-2
                    focus:ring-offset-2 rounded-lg flex items-center hover:no-underline"
                        >
                          <span className="no-underline mx-auto">
                            Create a feedback
                            <svg
                              viewBox="0 0 12 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="ml-2 w-3 h-3 inline"
                            >
                              <path
                                d="M1 11L11 1M11 1H1M11 1V11"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                            </svg>
                          </span>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="w-full md:w-4/5 lg:w-3/5 md:mx-auto md:max-w-4xl px-4"></div>
    </>
  );
}

export default SettingHeader;
