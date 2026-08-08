import { useEffect, useState } from "react";
import {
  HiAnnotation,
  HiArrowSmRight,
  HiChartPie,
  HiDocumentText,
  HiOutlineUserGroup,
  HiUser,
} from "react-icons/hi";
import { TiMessages } from "react-icons/ti";
import {
  MdOutlineCreateNewFolder,
  MdAddBusiness,
  MdBusiness,
  MdOutlineNotificationsActive,
} from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";
import { FaRegAddressBook } from "react-icons/fa";
import { TbMessage } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { Button, Sidebar } from "flowbite-react";
import Divider from "./Divider";
import { useUpdatesStore } from "../store/updatesStore";

export default function DashSidebar() {
  const { error, isLoading, logout, user } = useAuthStore();
  const { getAllUpdates, readUpdate, unreadCount } = useUpdatesStore();

  const [updates, setUpdates] = useState([]);

  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const getUpdates = async () => {
    try {
      const { updates } = await getAllUpdates(user?._id);
      setUpdates(updates);
      return updates;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  useEffect(() => {
    getUpdates();
  }, [user?._id]);

  return (
    // <div className="min-h-screen w-full">
    <Sidebar className="w-full md:min-h-screen flex flex-col justify-between text-sm">
      <Sidebar.Items className="mb-5">
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          {user && (
            <>
              <Link to="/user-dashboard?tab=dash" className="text-nowrap">
                <Sidebar.Item
                  active={tab === "dash" || !tab}
                  icon={HiChartPie}
                  as="div"
                >
                  Dashboard
                </Sidebar.Item>
              </Link>
              <Link to="/user-dashboard?tab=profile" className="text-nowrap">
                <Sidebar.Item
                  active={tab === "profile"}
                  icon={HiUser}
                  as="div"
                  className="capitalize"
                  label={
                    <span className="text-nowrap bg-gray-600 text-white px-2 py-[6px] rounded-md text-xs capitalize">
                      {user.role
                        .split(" ")
                        .map((word) => word.slice(0, 5))
                        .join(" ")}
                    </span>
                  }
                >
                  Profile
                </Sidebar.Item>
              </Link>
            </>
          )}

          {(user.isAdmin || user.role === "architect") && (
            <>
              <Link to="/user-dashboard?tab=posts" className="text-nowrap">
                <Sidebar.Item
                  active={tab === "posts"}
                  icon={HiDocumentText}
                  as="div"
                >
                  View Posts
                </Sidebar.Item>
              </Link>
              <Link to="/user-dashboard?tab=users" className="text-nowrap">
                <Sidebar.Item
                  active={tab === "users"}
                  icon={HiOutlineUserGroup}
                  as="div"
                >
                  View Users
                </Sidebar.Item>
              </Link>
              <Link to="/user-dashboard?tab=messages" className="text-nowrap">
                <Sidebar.Item
                  active={tab === "messages"}
                  icon={TiMessages}
                  as="div"
                >
                  View Messages
                </Sidebar.Item>
              </Link>
              <Link
                to="/user-dashboard?tab=add-content"
                className="text-nowrap"
              >
                <Sidebar.Item
                  active={tab === "add-content"}
                  icon={MdOutlineCreateNewFolder}
                  as="div"
                >
                  Add Content
                </Sidebar.Item>
              </Link>
            </>
          )}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
    // </div>
  );
}
