import { v4 as uuidv4 } from "uuid";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import {
  MdDashboard,
  MdOutlineDashboard,
  MdOutlinePayments,
  MdOutlineRateReview,
  MdOutlineSettings,
} from "react-icons/md";
import {
  RiAdminLine,
  RiCustomerService2Fill,
  RiInboxArchiveFill,
  RiRefundFill,
} from "react-icons/ri";
import { CiBank } from "react-icons/ci";
import { SiSecurityscorecard, SiZalo } from "react-icons/si";
import { BsShop } from "react-icons/bs";
import { FaBoxes } from "react-icons/fa";
import { PiCoinThin } from "react-icons/pi";
import { GrTransaction } from "react-icons/gr";
import { HiOutlineTicket } from "react-icons/hi";
import { TbTruckDelivery } from "react-icons/tb";
import { AiOutlineUserSwitch } from "react-icons/ai";
import { IoShareSocial, IoWallet } from "react-icons/io5";
import { LuBarChartHorizontal, LuWallet } from "react-icons/lu";

import { auth } from "../config/firebase.config";
import { FaUserGear } from "react-icons/fa6";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  await signInWithPopup(auth, googleProvider).then((useCred) => {
    window.location.reload();
  });
};

export const signOutAction = async () => {
  await auth.signOut().then(() => {
    window.location.reload();
  });
  localStorage.clear();
};

export const Menus = [
  {
    id: uuidv4(),
    icon: <MdOutlineSettings />,
    name: <div className="text-nowrap">Thông tin cá nhân</div>,
    uri: "/user/myProfile",
  },
  {
    id: uuidv4(),
    icon: <RiAdminLine />,
    name: <div className="text-nowrap">Trang quản trị</div>,
    uri: "/admin/dashboard",
  },
  {
    id: uuidv4(),
    icon: <BsShop />,
    name: <div className="text-nowrap">Trang người bán</div>,
    uri: "/seller/productlist",
  },
  {
    id: uuidv4(),
    icon: <AiOutlineUserSwitch />,
    name: <div className="text-nowrap">Trang nhà cung cấp</div>,
    uri: "/supplier/dashboard",
  },
  {
    id: uuidv4(),
    icon: <HiOutlineTicket />,
    name: <div className="text-nowrap">Voucher của tôi</div>,
    uri: "/user/listVoucher",
  },

];

export const ClientMenus = [
  {
    title: "Sản Phẩm",
    Icon: FaBoxes,
    spacing: true,
    submenu: true,
    subMenuItems: [
      {
        title: "Quản lý sản phẩm",
        Icon: FaBoxes,
        uri: "/seller/productlist",
      },
      {
        title: "Thêm sản phẩm",
        Icon: RiInboxArchiveFill,
        uri: "/seller/publish",
      },
    ],
  },
  {
    title: "Đơn Hàng",
    Icon: LuBarChartHorizontal,
    spacing: true,
    submenu: true,
    subMenuItems: [
      {
        title: "Đơn đặt hàng",
        Icon: TbTruckDelivery,
        uri: "/seller/order",
      },
      {
        title: "Quản lý đơn hoàn trả",
        Icon: RiRefundFill,
        uri: "/seller/reverse",
      },
      {
        title: "Quản lý đánh giá",
        Icon: MdOutlineRateReview,
        uri: "/seller/review",
      },
    ],
  },
  {
    title: "Tài Chính",
    Icon: IoWallet,
    spacing: true,
    submenu: true,
    subMenuItems: [
      {
        title: "Thu nhập của tôi",
        Icon: PiCoinThin,
        uri: "/seller/myIncome/incomeOverview",
      },
      {
        title: "Ví của tôi",
        Icon: LuWallet,
        uri: "/seller/myTransaction",
      },
      {
        title: "Tài khoản ngân hàng",
        Icon: CiBank,
        uri: "/seller/myBank",
      }
    ],
  },
  {
    title: "Hỗ Trợ",
    Icon: RiCustomerService2Fill,
    spacing: true,
    submenu: true,
    subMenuItems: [
      {
        title: "Zalo",
        Icon: SiZalo,
        uri: "/dash/zalo",
      },
      {
        title: "Social",
        Icon: IoShareSocial,
        uri: "/dash/social",
      },
    ],
  },
];

export const AdminMenus = [
  {
    title: "Trung tâm",
    Icon: MdDashboard,
    spacing: true,
    submenu: true,
    subMenuItems: [
      {
        title: "Tổng quát",
        Icon: MdOutlineDashboard,
        uri: "/admin/dashboard",
      }, {
        title: "Quản lý người dùng",
        Icon: FaUserGear,
        uri: "/admin/permission",
      },

    ],
  },
  {
    title: "Quản lí thanh toán",
    Icon: MdOutlinePayments,
    spacing: true,
    submenu: true,
    subMenuItems: [
      {
        title: "Tổng quan",
        Icon: MdOutlineDashboard,
        uri: "/admin/financial-overview",
      }, {
        title: "Giao dịch",
        Icon: GrTransaction,
        uri: "/admin/transactions",
      },
    ],
  },
];

export const DashboardMenus = [
  {
    id: 10003,
    menu: "Chức năng",
    uri: "/dash/account",
    isAdmin: true,
  },
  {
    id: 10004,
    menu: "Cài đặt",
    uri: "/admin/users",
    isAdmin: true,
  },
];

export const SupplierMenus = [
  {
    title: "Trung tâm Hoạt động",
    Icon: SiSecurityscorecard,
    spacing: true,
    submenu: true,
    subMenuItems: [
      {
        title: "Trang chủ",
        Icon: MdOutlineDashboard,
        uri: "/supplier/dashboard",
      },
    ],
  },
  {
    title: "Tài Chính",
    Icon: IoWallet,
    spacing: true,
    submenu: true,
    subMenuItems: [
      {
        title: "Thu nhập của tôi",
        Icon: PiCoinThin,
        uri: "/supplier/myIncome",
      },
      {
        title: "Ví của tôi",
        Icon: LuWallet,
        uri: "/supplier/myTransaction",
      },
      {
        title: "Tài khoản ngân hàng",
        Icon: CiBank,
        uri: "/supplier/myBank",
      }
    ],
  },
  {
    title: "Hỗ Trợ",
    Icon: RiCustomerService2Fill,
    spacing: true,
    submenu: true,
    subMenuItems: [
      {
        title: "Zalo",
        Icon: SiZalo,
        uri: "/dash/zalo",
      },
      {
        title: "Social",
        Icon: IoShareSocial,
        uri: "/dash/social",
      },
    ],
  },
];