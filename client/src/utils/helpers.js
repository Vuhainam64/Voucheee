import { v4 as uuidv4 } from "uuid";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import {
  MdDashboard,
  MdOutlineDashboard,
  MdOutlineRateReview,
  MdOutlineSettings,
} from "react-icons/md";
import {
  RiCustomerService2Fill,
  RiInboxArchiveFill,
} from "react-icons/ri";
import { CiBank, CiBoxList } from "react-icons/ci";
import { BsShop } from "react-icons/bs";
import { FaBoxes, FaFileAlt, FaUndo } from "react-icons/fa";
import { PiCoinThin } from "react-icons/pi";
import { BiTransferAlt } from "react-icons/bi";
import { HiOutlineTicket } from "react-icons/hi";
import { TbTruckDelivery } from "react-icons/tb";
import { IoShareSocial, IoWallet } from "react-icons/io5";
import { SiSecurityscorecard, SiZalo } from "react-icons/si";
import { LuBarChartHorizontal, LuWallet } from "react-icons/lu";
import { GrDocumentUpdate, GrUploadOption } from "react-icons/gr";

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
    icon: <BsShop />,
    name: <div className="text-nowrap" id="SELLER">Trang người bán</div>,
    uri: "/seller/productlist",
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
      // {
      //   title: "Quản lý đơn hoàn trả",
      //   Icon: RiRefundFill,
      //   uri: "/seller/reverse",
      // },
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
        uri: "/seller/zalo",
      },
      {
        title: "Social",
        Icon: IoShareSocial,
        uri: "https://www.facebook.com/profile.php?id=61561068212943",
      },
    ],
  },
  {
    title: "Chính sách",
    Icon: FaFileAlt,
    spacing: true,
    uri: "/seller/policy",
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
    title: "Giải ngân",
    Icon: BiTransferAlt,
    spacing: true,
    submenu: true,
    subMenuItems: [
      {
        title: "Danh sách giải ngân",
        Icon: CiBoxList,
        uri: "/admin/disbursementList",
      },
      {
        title: "Cập nhật giải ngân",
        Icon: GrUploadOption,
        uri: "/admin/disbursementUpdate",
      },
      // {
      //   title: "Lịch sử giải ngân",
      //   Icon: MdHistory,
      //   uri: "/admin/disbursementHistory",
      // },
    ],
  },
  // {
  //   title: "Quảng cáo",
  //   Icon: FaBullhorn,
  //   spacing: true,
  //   submenu: true,
  //   subMenuItems: [
  //     {
  //       title: "Phân tích",
  //       Icon: AiOutlinePieChart,
  //       uri: "/admin/analysis",
  //     },
  //     {
  //       title: "Chiến dịch",
  //       Icon: MdCampaign,
  //       uri: "/admin/campaign",
  //     },
  //   ],
  // },
  {
    title: "Hỗ Trợ",
    Icon: RiCustomerService2Fill,
    spacing: true,
    submenu: true,
    subMenuItems: [
      {
        title: "Zalo",
        Icon: SiZalo,
        uri: "/admin/zalo",
      },
      {
        title: "Social",
        Icon: IoShareSocial,
        uri: "https://www.facebook.com/profile.php?id=61561068212943",
      },
    ],
  },
];

export const DashboardMenus = [
  // {
  //   id: 10003,
  //   menu: "Chức năng",
  //   uri: "/dash/account",
  //   isAdmin: true,
  // },
  {
    id: 10004,
    menu: "Thông tin cá nhân",
    uri: "/user/myProfile",
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
      {
        title: "Cập nhật voucher",
        Icon: GrDocumentUpdate,
        uri: "/supplier/convertVoucher",
      },
      {
        title: "Quản lý hoàn trả",
        Icon: FaUndo,
        uri: "/supplier/returnRequest",
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
        uri: "/supplier/zalo",
      },
      {
        title: "Social",
        Icon: IoShareSocial,
        uri: "https://www.facebook.com/profile.php?id=61561068212943",
      },
    ],
  },
];