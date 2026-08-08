import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaRegSadTear } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline, IoIosTimer } from "react-icons/io";
import { SiParamountplus } from "react-icons/si";
import { FiPieChart } from "react-icons/fi";
import { PiInvoiceBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import AdminDashboardComponent, {
  AdminDashboardUserTotalComponent,
  AdminDashboardReportComponent,
} from "./AdminDashboardComponent";
import { UserDashboardComponents } from "./AdminDashboardComponent";
import Divider from "./Divider";
import { usePostStore } from "../store/postStore";
import { posts } from "../assets/static_assets";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

export default function DashboardComponent() {
  const { user } = useAuthStore();
  const { getAllUsers } = useAuthStore();
  const { getAllPosts } = usePostStore();

  const [showModal, setShowModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  const handleOpenModal = (report) => {
    setSelectedReport(report);
    setShowModal(true);
  };

  // for users
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [userCount, setUserCount] = useState(0);

  console.log(users);

  // for reports
  const [posts, setPosts] = useState([]);
  const [totalReports, setTotalReports] = useState(0);
  const [lastMonthReports, setLastMonthReports] = useState(0);
  const [lastWeekReports, setLastWeekReports] = useState(0);
  const [reportCount, setReportCount] = useState(0);
  const [reportsByRole, setReportsByRole] = useState(0);

  // get users
  const getUsers = async () => {
    try {
      const users = await getAllUsers();

      console.log(users);

      setUsers(users);
      setTotalUsers(totalUsers);
      setLastMonthUsers(lastMonthUsers);
      setUserCount(userCounts);
    } catch (error) {
      console.log(error);
    }
  };

  // get users
  const getReports = async () => {
    try {
      const { posts } = await getAllPosts();
      setPosts(posts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user.role === "architect" || user.isAdmin) {
      getUsers();
    }
    getReports();
  }, [user._id]);

  return (
    <div className="flex flex-col gap-4 w-full p-3 md:mt-6">
      <h1 className="text-2xl font-bold text-blue-900 bg-clip-text">
        Dashboard
      </h1>
      {user.role === "architect" || user.isAdmin ? (
        <>
          <div className="flex-wrap flex gap-4">
            {/* show total number of registered users */}
            <AdminDashboardUserTotalComponent
              totalUsers={users?.length}
              heading={"total user count"}
              userCount={userCount}
            />

            {/* show total number reports submitted */}
            <AdminDashboardReportComponent
              totalReports={posts.length}
              heading={"total posts count"}
              reportCount={userCount}
              reportsByRole={reportsByRole}
            />

            {/* show total number reports submitted */}
            {/* <LastWeekReportComponent
              totalReports={lastWeekReports}
              heading={"this week's reports"}
              reportCount={userCount}
              reportsByRole={reportsByRole}
            /> */}

            {/* total clients created */}
            {/* <AdminDashboardComponent
              totalUsers={totalClients}
              type="Clients"
              heading={"all clients"}
              lastMonthUsers={lastMonthClients}
            /> */}

            {/* total invoices created */}
            {/* <AdminDashboardComponent
              totalUsers={totalInvoices}
              type="Invoices"
              heading={"all invoices"}
              lastMonthUsers={lastMonthInvoices}
            /> */}
          </div>
        </>
      ) : (
        <></>
      )}

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="w-full md:mx-auto"
      >
        <p className="text-lg font-bold mb-1">Recent Reports</p>
        {posts?.length > 0 ? (
          <table className="border-collapse table-auto mx-auto min-w-full border-none">
            <thead className=" bg-gray-500">
              <tr className="border-b-[2px] border-b-black text-sm">
                <th className="text-left px-4 py-1 text-nowrap">Post Date</th>
                <th className="text-left px-4 py-1 text-nowrap">Author</th>
                <th className="text-left px-4 py-1 text-nowrap">Post Title</th>
                <th className="text-left px-4 py-1 text-nowrap">Read By</th>
                <th className="text-left px-4 py-1 text-nowrap">Comments</th>
              </tr>
            </thead>

            <tbody className="text-sm">
              {posts?.slice(0, 5).map((business) => (
                <tr key={business._id} className="border-b border-b-gray-600">
                  <td className="px-4 py-1 text-sm align-top">
                    {business.createdAt
                      ? new Date(business.createdAt).toLocaleString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : ""}
                  </td>

                  <td className="px-4 py-1 align-top">
                    <Link
                      to="/about"
                      className="hover:text-blue-600 hover:underline underline-offset-2"
                    >
                      {business?.writer?.fullname}
                    </Link>
                  </td>
                  <td className="px-4 py-1 align-top">
                    <Link
                      to={`/post/${business.slug}`}
                      className="hover:text-blue-600 hover:underline underline-offset-2"
                    >
                      {business.postTitle}
                    </Link>
                  </td>
                  <td className="px-4 py-1 align-top text-sm">
                    {business.readCount} people
                  </td>
                  <td className="px-4 py-1 text-sm capitalize align-top">
                    {business.comments.length}{" "}
                    {business.comments.length === 1 ? "comment" : "comments"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No Reports found.</p>
        )}
      </motion.div>

      {/* modal to update user status */}
      {/* {showModal && (
        <ReadReport
          selectedReport={selectedReport}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )} */}
    </div>
  );
}
