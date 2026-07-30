import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FaBullhorn,
  FaBox,
  FaCog,
  FaHome,
  FaSignOutAlt,
  FaTable,
  FaTruck,
  FaUsers,
  FaUserCircle,
  FaFacebook,
  FaInstagramSquare,
  FaTwitterSquare,
  FaNewspaper,
  FaRegCreditCard,
  FaColumns,
  FaLinkedin,
} from "react-icons/fa";
import {
  MdClose,
  MdOutlineContactSupport,
  MdContacts,
  MdMenu,
  MdCloseFullscreen,
  MdLogin,
  MdSubscriptions,
  MdFeaturedPlayList,
} from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import { FcAbout } from "react-icons/fc";
import { RxHamburgerMenu, RxAvatar } from "react-icons/rx";
import { MdLogout } from "react-icons/md";
import { useAuthStore } from "../store/authStore";
import logo from "../assets/alter_persp_logo.png";
import { IoMdCloseCircle } from "react-icons/io";
import { TbMessage, TbStarFilled } from "react-icons/tb";
import { Input } from "./Input";
import { useReportsStore } from "../store/reportsStore";
import { useUpdatesStore } from "../store/updatesStore";

export default function HeaderComponent({ business }) {
  const menuItems = [
    {
      name: "Home",
      path: "/",
      icon: <FaHome />,
      isParent: true,
    },
    {
      name: "News",
      path: "/news",
      icon: <FaNewspaper />,
      isParent: false,
    },
    {
      name: "Featured",
      path: "/featured",
      icon: <MdFeaturedPlayList />,
      isParent: false,
    },
    {
      name: "Editorial",
      path: "/editorial",
      icon: <FaRegCreditCard />,
      isParent: false,
    },
    {
      name: "Columns",
      path: "/columns",
      icon: <FaColumns />,
      isParent: false,
    },
    {
      name: "About",
      path: "/about",
      icon: <TbListDetails />,
      isParent: true,
    },
    {
      name: "Support",
      path: "/support",
      icon: <MdOutlineContactSupport />,
      isParent: false,
    },
  ];

  const navigate = useNavigate();

  const [visible, setVisible] = useState(true);
  const [showNav, setShowNav] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [comment, setComment] = useState("");
  const [notifications, setNotifications] = useState([]);

  const { error, isLoading, logout, user } = useAuthStore();
  const { getAllUpdates, readUpdate, unreadCount } = useUpdatesStore();

  const confirmLogout = () => {
    try {
      logout();
      navigate("/");
      // setShowModal(false);
    } catch (error) {
      console.log("Error logging out!");
    }
  };

  return (
    <header className="w-full bg-red-900 shadow fixed left-0 top-0 flex flex-col items-center justify-between z-50 text-white">
      <div className="w-full px-5 md:px-20 py-2 sm:py-3 flex items-center justify-between bg-black h-10 overflow-x-auto">
        <div className="flex items-center gap-2">
          <Link
            to="#"
            className="hover:text-blue-600 transition-all duration-300"
          >
            <FaFacebook size={20} />
          </Link>
          <Link
            to="#"
            className="hover:text-blue-600 transition-all duration-300"
          >
            <FaLinkedin size={20} />
          </Link>
          <Link
            to="#"
            className="hover:text-blue-600 transition-all duration-300"
          >
            <FaInstagramSquare size={20} />
          </Link>
          <Link
            to="#"
            className="hover:text-blue-600 transition-all duration-300"
          >
            <FaTwitterSquare size={20} />
          </Link>
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-500 transition-all duration-300 px-3 py-1 rounded-md text-sm flex items-center gap-1"
        >
          <MdSubscriptions />
          Subscribe
        </button>
      </div>
      <div className="w-full px-5 md:px-20 py-1 sm:py-2 flex items-center justify-between text-white">
        <Link to="/">
          <div className="flex items-center gap-1 max-h-14 overflow-hidden rounded-md">
            <img
              src={logo}
              alt=""
              className="w-10 md:w-14 bg-white p-1 rounded-md"
            />

            <p className="hidden sm:inline-block text-2xl ml-3">
              <span className="font-extrabold">Alternative</span>
              <span className="block font-bold text-xl -mt-1">
                Perspectives
              </span>
            </p>
          </div>
        </Link>

        {/* navigation bars */}
        <nav className="hidden lg:block">
          <ul className="p-2 flex gap-6">
            {menuItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  end={item.isParent}
                  className={({ isActive }) =>
                    (isActive ? "text-yellow-400 flex items-center" : "") +
                    "flex items-center transition-all duration-300 border-b-2 border-b-transparent hover:border-b-2 hover:border-b-yellow-500"
                  }
                  to={item.path}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-md ml-1">{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* <div className="flex items-center gap-8"> */}
        {user && (
          <div className="bg-white px-2 py-1 rounded flex items-center gap-2">
            <Link
              to={"/user-dashboard?tab=notifications"}
              className="flex items-center relative"
            >
              <img src={user.avatar} className="rounded-full h-8 w-8" />
              <div className="p-2 rounded-full bg-red-600 absolute top-1 left-5 flex items-center justify-center text-white text-xs w-4 h-4 border border-white">
                {/* {notifications?.unreadCount || 0} */}3
              </div>
            </Link>
            <p className="font-bold text-md text-blue-800">
              <Link
                to={"/user-dashboard?tab=dash"}
                className=" uppercase cursor-pointer underline underline-offset-2 hover:scale-110 transition-all duration-500"
              >
                {user.fullname.split(" ")[0]}
              </Link>
            </p>
            <div className="flex items-center ml-4 bg-red-100 px-2 py-1 rounded">
              <MdLogout
                className="text-lg text-red-600 cursor-pointer hover:scale-110 transition-all duration-300"
                onClick={() => confirmLogout()}
              />
            </div>
          </div>
        )}

        {/* for small screens */}
        <div
          className="block lg:hidden z-99"
          onClick={() => setShowNav(!showNav)}
        >
          <MdMenu className="text-white" size={30} />
        </div>
        {/* </div> */}

        {/* small screen navigation */}
        {showNav ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-[50%] h-screen bg-black text-white absolute top-12 right-0 opacity-90 p-4"
          >
            <div className="flex flex-col p-4 w-full">
              <div className="flex items-center justify-between w-full gap-4">
                <p className="flex-1 h-[1px] bg-gray-500"></p>
                <MdCloseFullscreen
                  className="text-gray-500 cursor-pointer"
                  size={20}
                  onClick={() => setShowNav(!showNav)}
                />
              </div>
              <ul className="flex flex-col gap-5 bg-white/10 backdrop-blur-md shadow-lg rounded-xl mt-5 ">
                <li>
                  <Link to="/">LOGIN</Link>
                </li>
                <li>
                  <Link to="/support">SUPPORT</Link>
                </li>
                <li>
                  <Link to="/about">ABOUT APP</Link>
                </li>
                {user && (
                  <li>
                    <p
                      onClick={confirmLogout}
                      className="text-red-500 font-bold cursor-pointer"
                    >
                      LOG OUT
                    </p>
                  </li>
                )}
              </ul>
            </div>
          </motion.div>
        ) : (
          <></>
        )}
      </div>
    </header>
  );
}
