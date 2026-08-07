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
  MdContactPhone,
} from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import { FcAbout } from "react-icons/fc";
import { RxHamburgerMenu, RxAvatar } from "react-icons/rx";
import { MdLogout } from "react-icons/md";
import { useAuthStore } from "../store/authStore";
import logo from "../assets/alter_persp_logo.png";
import { IoMdCloseCircle } from "react-icons/io";
import { TbMessage, TbStarFilled } from "react-icons/tb";
import Input from "./Input";
import { usePostStore } from "../store/postStore";
import { useUpdatesStore } from "../store/updatesStore";
import toast from "react-hot-toast";
import { useSubscriptionStore } from "../store/subscriptionStore";

export default function HeaderComponent({ business }) {
  const menuItems = [
    {
      name: "Home",
      path: "/",
      icon: <FaHome />,
      isParent: true,
    },
    {
      name: "Articles",
      path: "/articles",
      icon: <FaNewspaper />,
      isParent: false,
    },
    // {
    //   name: "Features",
    //   path: "/features",
    //   icon: <MdFeaturedPlayList />,
    //   isParent: false,
    // },
    // {
    //   name: "Editorial",
    //   path: "/editorial",
    //   icon: <FaRegCreditCard />,
    //   isParent: false,
    // },
    // {
    //   name: "Columns",
    //   path: "/columns",
    //   icon: <FaColumns />,
    //   isParent: false,
    // },
    {
      name: "About",
      path: "/about",
      icon: <TbListDetails />,
      isParent: true,
    },
    {
      name: "Contact",
      path: "/contact",
      icon: <MdContactPhone />,
      isParent: false,
    },
  ];

  const navigate = useNavigate();

  const [visible, setVisible] = useState(true);
  const [showNav, setShowNav] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const [comment, setComment] = useState("");
  const [notifications, setNotifications] = useState([]);

  const { error, isLoading, logout, user } = useAuthStore();
  const { subscribe } = useSubscriptionStore();
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

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!isChecked) {
      toast.error("You must accept terms to continue!");
      return;
    }

    try {
      await subscribe({ subscriber: fullname, email, acceptance: isChecked });
      toast.success("Subscription Successfully Done");
      setShowSubscriptionModal(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to subscribe; please try again!");
    }
  };

  return (
    <header className="w-full bg-red-900 shadow fixed left-0 top-0 flex flex-col items-center justify-between z-50 text-white">
      <div className="w-full px-5 md:px-20 py-2 sm:py-3 flex items-center justify-between bg-black h-10">
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
          onClick={() => setShowSubscriptionModal(true)}
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
        {user ? (
          <div className="bg-white px-2 py-1 rounded flex items-center gap-2">
            {user?.role === "admin" ||
            user?.role === "architect" ||
            user?.role === "editor" ? (
              <>
                <Link
                  to={"/user-dashboard?tab=notifications"}
                  className="flex items-center relative"
                >
                  <img src={user?.avatar} className="rounded-full h-8 w-8" />
                  <div className="p-2 rounded-full bg-red-600 absolute top-1 left-5 flex items-center justify-center text-white text-xs w-4 h-4 border border-white">
                    {/* {notifications?.unreadCount || 0} */}3
                  </div>
                </Link>
                <p className="font-bold text-md text-blue-800">
                  <Link
                    to={"/user-dashboard?tab=dash"}
                    className=" uppercase cursor-pointer underline underline-offset-2 hover:scale-110 transition-all duration-500"
                  >
                    {user?.fullname?.split(" ")[0]}
                  </Link>
                </p>
              </>
            ) : (
              <></>
            )}

            <div className="flex items-center ml-4 bg-red-100 px-2 py-1 rounded">
              <MdLogout
                className="text-lg text-red-600 cursor-pointer hover:scale-110 transition-all duration-300"
                onClick={() => confirmLogout()}
              />
            </div>
          </div>
        ) : (
          <Link
            to={"/login"}
            className="px-4 py-1 cursor-pointer bg-blue-700 text-white hover:bg-white hover:text-blue-900 rounded hover:scale-110 transition-all duration-500"
          >
            Login
          </Link>
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
                {menuItems.map((item) => (
                  <li
                    key={item.name}
                    className="p-2 hover:bg-white/20 transition-all duration-300"
                  >
                    <NavLink
                      end={item.isParent}
                      to={item.path}
                      className="text-white hover:text-blue-500"
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}

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

        {/* subscription modal */}
        {showSubscriptionModal ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="w-full h-screen bg-black/80 absolute top-0 right-0 opacity-90 flex items-center justify-center p-3"
          >
            <div className="flex flex-col p-2 w-full max-w-xl bg-white rounded">
              <div className="w-full flex items-center justify-between">
                <p className="text-lg font-bold text-red-700">
                  Subscription Form
                </p>
                <div className="flex items-center gap-1 w-fit border rounded-full px-2 py-1 text-gray-600 text-xs">
                  Close
                  <MdClose
                    className="text-red-700 cursor-pointer"
                    size={20}
                    onClick={() =>
                      setShowSubscriptionModal(!showSubscriptionModal)
                    }
                  />
                </div>
              </div>

              {/*  */}
              <div className="flex flex-col gap-2 border-t border-gray-300 mt-2 pt-2">
                <p className="text-black text-sm text-center leading-4">
                  Enter your email address to subscribe and receive updates on
                  the latest news, features, and columns from{" "}
                  <b>Alternative Perspectives</b>. We respect your privacy and
                  will not share your information with third parties.
                </p>
              </div>

              {/* subscription form */}
              <form
                className="flex flex-col md:flex-row gap-4 w-full mt-6"
                onSubmit={handleSubscribe}
              >
                <div className="flex flex-col w-full relative">
                  <p className="text-xs bg-white absolute -top-2 left-2 px-1 z-50 text-gray-950">
                    Your Name:
                  </p>
                  <input
                    type="text"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    // placeholder="Enter your email address"
                    className="border border-gray-300 rounded px-1 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 text-sm text-black"
                  />
                </div>
                <div className="flex flex-col w-full relative">
                  <p className="text-xs bg-white absolute -top-2 left-2 px-1 z-50 text-gray-950">
                    Your email address:
                  </p>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    // placeholder="Enter your email address"
                    className="border border-gray-300 rounded px-1 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 text-sm text-black"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!isChecked}
                  className={`text-sm px-4 py-2 rounded transition-colors duration-300 ${
                    isChecked
                      ? "bg-red-700 hover:bg-red-600 text-white cursor-pointer"
                      : "bg-gray-400 text-gray-200 cursor-not-allowed"
                  }`}
                >
                  Subscribe
                </button>
              </form>

              <p className="flex items-center text-sm text-black mt-3 text-center">
                <input
                  type="checkbox"
                  className="mr-1"
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                />{" "}
                By subscribing, you agree to our{" "}
                <Link
                  to="privacy-policy"
                  className="text-blue-600 underline underline-offset-2 font-bold"
                >
                  Privacy Policy
                </Link>
                , and{" "}
                <Link
                  to="terms-of-use"
                  className="text-blue-600 underline underline-offset-2 font-bold"
                >
                  Terms of Use
                </Link>
                .
              </p>
            </div>
          </motion.div>
        ) : (
          <></>
        )}
      </div>
    </header>
  );
}
