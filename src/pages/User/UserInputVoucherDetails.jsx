<script src="../path/to/flowbite/dist/datepicker.js"></script>;
function InputVoucherDetails() {
  return (
    <div className="pt-4 mb-4">
      <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black">
        Đăng bán voucher
      </h1>
      <form>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              for="category"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >
              Ngành hàng
            </label>
            <select
              id="category"
              class="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option>Du lịch</option>
              <option>Ăn uống</option>
              <option>Đi lại</option>
              <option>Chỗ ở</option>
            </select>
          </div>
          <div>
            <label
              for="category"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >
              Tên voucher
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="first-name"
                id="first-name"
                autoComplete="given-name"
                className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
        <div className="mt-2">
          <label
            for="message"
            class="block mb-2 text-sm font-medium text-black "
          >
            Mô tả
          </label>
          <textarea
            id="message"
            rows="4"
            class="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 "
            placeholder="Điền mô tả của Voucher"
          ></textarea>
        </div>

        <div date-rangepicker class="flex items-center mt-2">
          <label for="message" class=" text-black mr-2">
            Ngày bắt đầu:
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
              </svg>
            </div>
            <input
              name="start"
              type="date"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Select date start"
            />
          </div>
          <label for="message" class=" text-black mx-2">
            Ngày hết hạn:
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
              </svg>
            </div>
            <input
              name="end"
              type="date"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Select date end"
            />
          </div>
        </div>
        <div className="mt-2">
          <label
            for="message"
            class="block mb-2 text-sm font-medium text-black "
          >
            Policy
          </label>
          <textarea
            id="message"
            rows="4"
            class="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 "
            placeholder="Điền policy của Voucher"
          ></textarea>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div>
            <label
              for="category"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
            >
              Giá bán gốc
            </label>
            <div className="flex rounded-md pl-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full">
              <input
                type="number"
                step={5000}
                className="block w-full flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="100.000"
              />
              <span className="flex select-none items-center pr-3 text-gray-500 sm:text-sm">
                VNĐ
              </span>
            </div>
          </div>
          <div>
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
              Giá bán đã giảm
            </label>
            <div className="flex rounded-md pl-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full">
              <input
                type="number"
                step={5000}
                className="block w-full flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="75.000"
              />
              <span className="flex select-none items-center pr-3 text-gray-500 sm:text-sm">
                VNĐ
              </span>
            </div>
          </div>
        </div>
        <div className="mt-2">
          <label
            for="category"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
          >
            Số lượng
          </label>
          <div className="flex rounded-md pl-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full">
            <input
              type="number"
              step={1}
              className="block w-full flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              placeholder="5"
            />
            <span className="flex select-none items-center pr-3 text-gray-500 sm:text-sm">
              Cái
            </span>
          </div>
        </div>
        <div className="mt-2">
          <label
            for="category"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
          >
            Mã voucher
          </label>
          <div className="mt-2">
            <input
              type="text"
              autoComplete="given-name"
              className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="mt-2">
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            for="user_avatar"
          >
            Hoặc upload hình mã vạch của Voucher
          </label>
          <input
            class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            aria-describedby="user_avatar_help"
            type="file"
          />
          <div
            class="mt-1 text-sm text-gray-500 dark:text-gray-300"
            id="user_avatar_help"
          >
            Hình chụp, thông tin của Voucher (Mã vạch, mã QR,...)
          </div>
        </div>

        <div className="mt-2">
          <label
            class="block mb-2 text-2xl font-medium text-gray-900 dark:text-white"
            for="user_avatar"
          >
            Điều khoản và điều kiện
          </label>
          <fieldset>
            <legend class="sr-only">Checkbox variants</legend>

            <div class="flex items-center mb-4">
              <input
                checked
                id="checkbox-1"
                type="checkbox"
                value=""
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="checkbox-1"
                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Tôi đồng ý với{" "}
                <a
                  href="#"
                  class="text-blue-600 hover:underline dark:text-blue-500"
                >
                  điều khoản và điều kiện{" "}
                </a>
                của Vouchee!.
              </label>
            </div>

            <div class="flex mb-4">
              <div class="flex items-center h-5">
                <input
                  id="helper-checkbox"
                  aria-describedby="helper-checkbox-text"
                  type="checkbox"
                  value=""
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div class="ms-2 text-sm">
                <label
                  for="helper-checkbox"
                  class="font-medium text-gray-900 dark:text-gray-300"
                >
                  Điều kiện và điều khoản khác
                </label>
                <p
                  id="helper-checkbox-text"
                  class="text-xs font-normal text-gray-500 dark:text-gray-400"
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Et
                  veniam, aperiam delectus aut facere quaerat, cupiditate fugiat
                  quae repudiandae esse fuga consectetur aliquam, dolor nemo
                  provident eligendi? Deserunt, beatae quos.
                </p>
              </div>
            </div>
          </fieldset>
        </div>
        <div className="mt-2">
          <button
            type="button"
            class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Xác nhận
          </button>
          <button
            type="button"
            class="text-red-700 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            Huỷ
          </button>
        </div>
      </form>
    </div>
  );
}

export default InputVoucherDetails;
