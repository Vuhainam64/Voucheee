import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button, Checkbox, Image, InputNumber, Space } from "antd";

import { FiGift } from "react-icons/fi";
import { FcShop } from "react-icons/fc";
import { MdMessage } from "react-icons/md";
import { FaPercent, FaRegTrashAlt } from "react-icons/fa";

import { buttonClick } from "../../animations";
import { LuScanLine } from "react-icons/lu";
import { Momo } from "../../assets/img";

const Cart = () => {
  const onChange = (value) => {
    console.log("changed", value);
  };

  return (
    <div className="w-full bg-slate-100">
      <div className="max-w-[1400px] w-full flex flex-col mx-auto p-4">
        <div className="grid grid-cols-3 gap-4 py-4">
          <div className="col-span-2">
            <div
              className="overflow-y-auto scrollbar-none space-y-4"
              style={{ height: "calc(100vh - 314px)" }}
            >
              <div className="bg-white p-4 rounde d-lg">
                <div className="flex items-center space-x-4">
                  <Checkbox />
                  <div>Sản phẩm</div>
                </div>
              </div>
              <div className="bg-white rounded-lg">
                <div className="flex items-center space-x-4 border-b py-4 px-4">
                  <Checkbox />
                  <Link to={""} className="flex items-center space-x-2">
                    <FcShop />
                    <div>Cửa hàng Grab</div>
                  </Link>
                  <MdMessage />
                </div>
                <div className="pb-4 px-4">
                  <div className="flex items-center space-x-4 border-b py-4">
                    <Checkbox />
                    <Image
                      width={100}
                      src="https://cdn.dealtoday.vn/img/c280x280/Nghi-duong-phong-Grand-Beach-Front-Triple-tai-Canvas-Hotel-Da-Nang-avt_12092024162347.jpg?sign=EBibDmSt-kDPmr-A0EY1Bw"
                    />
                    <div>
                      <div>
                        Canvas Hotel Đà Nẵng - Nghỉ dưỡng phòng Grand Beach
                        Front Triple
                      </div>
                      <div>Canvas Danang Beach Hotel</div>
                    </div>
                    <div className="line-through text-gray-500">2.000.000đ</div>
                    <div>1.500.000đ</div>
                    <Space.Compact>
                      <Button>-</Button>
                      <InputNumber
                        min={1}
                        max={100}
                        defaultValue={3}
                        onChange={onChange}
                      />
                      <Button>+</Button>
                    </Space.Compact>
                    <div className="text-primary text-lg font-semibold">
                      1.500.000đ
                    </div>
                    <motion.div
                      {...buttonClick}
                      className="hover:text-red-600 cursor-pointer"
                    >
                      <FaRegTrashAlt />
                    </motion.div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg">
                <div className="flex items-center space-x-4 border-b py-4 px-4">
                  <Checkbox />
                  <Link to={""} className="flex items-center space-x-2">
                    <FcShop />
                    <div>Cửa hàng Grab</div>
                  </Link>
                  <MdMessage />
                </div>
                <div className="pb-4 px-4">
                  <div className="flex items-center space-x-4 border-b py-4">
                    <Checkbox />
                    <Image
                      width={100}
                      src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    />
                    <div>
                      <div>
                        Buffet chay thanh tịnh tại Nhà hàng Buffet Chay Hương
                        Thiền
                      </div>
                      <div>Chay Hương Thiền</div>
                    </div>
                    <div className="line-through text-gray-500">150.000đ</div>
                    <div>100.000đ</div>
                    <Space.Compact>
                      <Button>-</Button>
                      <InputNumber
                        min={1}
                        max={100}
                        defaultValue={3}
                        onChange={onChange}
                      />
                      <Button>+</Button>
                    </Space.Compact>
                    <div className="text-primary text-lg font-semibold">
                      100.000đ
                    </div>
                    <motion.div
                      {...buttonClick}
                      className="hover:text-red-600 cursor-pointer"
                    >
                      <FaRegTrashAlt />
                    </motion.div>
                  </div>
                  <div className="flex items-center space-x-4 border-b py-4">
                    <Checkbox />
                    <Image
                      width={100}
                      src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    />
                    <div>
                      <div>
                        Buffet chay thanh tịnh tại Nhà hàng Buffet Chay Hương
                        Thiền
                      </div>
                      <div>Chay Hương Thiền</div>
                    </div>
                    <div className="line-through text-gray-500">150.000đ</div>
                    <div>100.000đ</div>
                    <Space.Compact>
                      <Button>-</Button>
                      <InputNumber
                        min={1}
                        max={100}
                        defaultValue={3}
                        onChange={onChange}
                      />
                      <Button>+</Button>
                    </Space.Compact>
                    <div className="text-primary text-lg font-semibold">
                      100.000đ
                    </div>
                    <motion.div
                      {...buttonClick}
                      className="hover:text-red-600 cursor-pointer"
                    >
                      <FaRegTrashAlt />
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Phần này sẽ được giữ cố định khi cuộn */}
          <div className="sticky top-4">
            <div className="bg-white p-4 rounded-lg space-y-4">
              <div className="flex items-center justify-between">
                <div className="font-semibold">Bạn có mã ưu đãi?</div>
                <FaPercent />
              </div>
              <div className="flex items-center justify-between">
                <div className="font-semibold">Bạn muốn tặng cho bạn bè?</div>
                <FiGift />
              </div>
              <div className="font-semibold">Thanh toán</div>
              <div className="flex items-center justify-between">
                <div>Tổng giá trị sản phẩms</div>
                <div>1.500.000đ</div>
              </div>
              <div className="flex items-center justify-between">
                <div>Thưởng VPoint</div>
                <div>1.500</div>
              </div>
              <div className="border-b"></div>
              <div className="flex items-center justify-between">
                <div>Tổng giá trị phải thanh toán</div>
                <div>1.500.000đ</div>
              </div>
              <div className="flex items-center justify-between">
                <div>Số dư hiện tại</div>
                <div>200.000đ</div>
              </div>
              <div className="flex items-center justify-between">
                <div>Số tiền cần nạp thêm</div>
                <div>1.300.000đ</div>
              </div>
              <motion.div
                {...buttonClick}
                className="bg-primary text-white p-2 rounded-lg no-underline
              cursor-pointer hover:bg-heroPrimary transition-colors duration-300
              text-center text-lg "
              >
                Nạp thêm vào tài khoản
              </motion.div>
              <div className="flex items-center justify-between gap-16">
                <div className="w-16 h-[1px] rounded-md bg-slate-400"></div>
                <p className="text-slate-400">Quét mã thanh toán</p>
                <div className="w-16 h-[1px] rounded-md bg-slate-400"></div>
              </div>
              <motion.div
                {...buttonClick}
                className="bg-blue-600 text-white p-2 rounded-lg no-underline
              cursor-pointer hover:bg-blue-700 transition-colors duration-300
              text-lg flex items-center space-x-4 justify-center"
              >
                <LuScanLine />
                <div>Thanh toán với Mobile Banking</div>
              </motion.div>
              <motion.div
                {...buttonClick}
                className="bg-[#A50064] text-white p-2 rounded-lg no-underline
              cursor-pointer hover:bg-[#8d0562] transition-colors duration-300
              text-lg flex items-center space-x-4 justify-center"
              >
                <img src={Momo} alt="momo" className="w-6" />
                <div>Thanh toán với Momo</div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
