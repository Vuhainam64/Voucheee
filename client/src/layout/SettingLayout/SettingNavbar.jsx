import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function SettingNavbar() {
  const user = useSelector((state) => state?.user?.user);
  return (
    <div className="bg-white pb-8">
      <div className="flex bg-gray-50">
        <div className="w-full md:w-4/5 lg:w-3/5 md:mx-auto md:max-w-4xl px-4">
          <div className="pt-4 pb-0">
            <div className="flex">
              <p className="flex-grow text-gray-900 font-semibold text-2xl">
                My Account
              </p>
            </div>
            <div className="flex text-gray-500">
              <div>{user.email}</div>
            </div>
            <div className="mt-4 border-b border-gray-200">
              <div className="flex flex-wrap -mb-px text-sm font-medium text-center">
                <NavLink
                  to={"/setting/profile"}
                  className={({ isActive }) =>
                    isActive
                      ? "mr-6 hover:no-underline inline-block py-4 rounded-t-lg border-b-2 border-blue-600 text-blue-600 hover:text-blue-900"
                      : "mr-6 hover:no-underline inline-block py-4 rounded-t-lg border-b-2 text-gray-500 hover:text-gray-600"
                  }
                >
                  Profile
                </NavLink>
                <NavLink
                  to={"/setting/password"}
                  className={({ isActive }) =>
                    isActive
                      ? "mr-6 hover:no-underline inline-block py-4 rounded-t-lg border-b-2 border-blue-600 text-blue-600 hover:text-blue-900"
                      : "mr-6 hover:no-underline inline-block py-4 rounded-t-lg border-b-2 text-gray-500 hover:text-gray-600"
                  }
                >
                  Password
                </NavLink>
                <NavLink
                  to={"/setting/account"}
                  className={({ isActive }) =>
                    isActive
                      ? "mr-6 hover:no-underline inline-block py-4 rounded-t-lg border-b-2 border-blue-600 text-blue-600 hover:text-blue-900"
                      : "mr-6 hover:no-underline inline-block py-4 rounded-t-lg border-b-2 text-gray-500 hover:text-gray-600"
                  }
                >
                  Delete account
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingNavbar;
