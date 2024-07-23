import { Link } from "react-router-dom";
import { Logo } from "../../assets/img";

const NavigationBar = () => {
  return (
    <div>
      <nav class="bg-primary">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/">
            <img src={Logo} alt="logo" className="p-4" />
          </Link>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div class="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-primary">
              <li>
                <a
                  href="#"
                  class="block py-2 px-3 text-white bg-primary"
                  aria-current="page"
                >
                  Trang chủ
                </a>
              </li>
              <li>
                <Link
                  to="/user/vouchers"
                  class="block py-2 px-3 text-white bg-primary"
                >
                  Vouchers của bạn
                </Link>
              </li>
              <li>
                <Link
                  to="/user/information"
                  class="block py-2 px-3 text-white bg-primary"
                >
                  Thông tin cá nhân
                </Link>
              </li>
              {/* <li>
                <a href="#" class="block py-2 px-3 text-white bg-primary"></a>
              </li> */}
              <Link
                to="/user/sell"
                class="block py-2 px-3 text-white bg-primary"
              >
                Đăng bán vouchers
              </Link>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavigationBar;
