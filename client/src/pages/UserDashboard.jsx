import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import MainLayout from "../layout/MainLayout";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashboardComponent from "../components/DashboardComponent";
import DashUsers from "../components/DashUsers";
import DashProfile from "../components/DashProfile";
import AddContent from "./AddContent";
import DashPosts from "../components/DashPosts";
import DashAddUser from "../components/DashAddUser";

export default function UserDashboard() {
  const { user, logout, isLoading } = useAuthStore();

  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5 }}
        className="w-full min-h-screen mt-20 flex flex-col md:flex-row"
      >
        {/* Sidebar */}
        <div className="">
          <DashSidebar />
        </div>

        {/* profile ... */}
        {tab === "profile" && <DashProfile />}

        {/* for users */}
        {tab === "users" && <DashUsers />}

        {/* for dashboard */}
        {tab === "dash" && <DashboardComponent />}

        {/* for invoice creation */}
        {tab === "add-content" && <AddContent />}

        {/* for adding a new handler */}
        {tab === "add-user" && <DashAddUser />}

        {/* view business */}
        {tab === "posts" && <DashPosts />}

        {/* generate reports */}
        {/* {tab === "generate-report" && <DashGenerateReport />} */}
      </motion.div>
    </MainLayout>
  );
}
