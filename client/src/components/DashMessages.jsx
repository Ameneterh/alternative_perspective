import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { SiReaddotcv } from "react-icons/si";
import { FaCheck, FaTimes } from "react-icons/fa";
import {
  Trash2,
  FilePenLine,
  BadgePoundSterling,
  Share2,
  Search,
  Check,
  X,
  CircleX,
  Loader,
  Binoculars,
  MailOpen,
  MessageSquareText,
  ScanText,
  StepForward,
  StepBack,
  NotepadText,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { Input } from "./Input";
import { MdEditNote, MdFilterList } from "react-icons/md";
import { ReportFiltersComponent } from "./DashFilterComponent";
import { usePostStore } from "../store/postStore";
import { pdf } from "@react-pdf/renderer";
import ReportsPDF from "./ReportsPDF";
import Spinner from "./Spinner";
import { useContactStore } from "../store/contactStore";

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

export default function DashMessages() {
  const { user } = useAuthStore();
  const { getAllMessages, isLoading } = useContactStore();

  // sorting and filtering states
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");

  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState(false);

  const [formData, setFormData] = useState({});

  // others
  const [messages, setMessages] = useState([]);
  const [filteredFields, setFilteredFields] = useState([]);
  const [visibleCount, setVisibleCount] = useState(20);
  const [startIndex, setStartIndex] = useState(0);

  const [showMore, setShowMore] = useState(true);
  const [showReadReportsModal, setShowReadReportsModal] = useState(false);

  const [selectedReport, setSelectedReport] = useState(null);

  const getMessages = async () => {
    try {
      const messages = await getAllMessages();
      setMessages(messages.messages);
      setStartIndex(0);
      setVisibleCount(20);

      return messages;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  useEffect(() => {
    getMessages();
  }, [user?._id]);

  const handleOpenModal = (report) => {
    setSelectedReport(report);
    setShowModal(true);
  };

  const handleShowMore = async () => {
    setStartIndex((prev) => prev + 20);
    setVisibleCount((prev) => prev + 20);
  };

  const handleShowLess = async () => {
    setStartIndex((prev) => prev - 20);
    setVisibleCount((prev) => prev - 20);
  };

  const selectedMessages = messages
    ?.filter((message) => {
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        message?.sender_name?.toLowerCase().includes(search) ||
        message?.status?.toLowerCase().includes(search) ||
        message?.text?.toLowerCase().includes(search) ||
        new Date(user?.createdAt)
          .toLocaleDateString("en-GB")
          .toLowerCase()
          .includes(search);

      return matchesSearch;
    })
    .sort((a, b) => {
      let result = 0;

      switch (sortBy) {
        case "date":
          result = new Date(a.createdAt) - new Date(b.createdAt);
          break;

        case "readCount":
          result = (a.readCount || 0) - (b.readCount || 0);
          break;

        case "writer":
          result = a.writer?.fullname.localeCompare(b.writer?.fullname);
          break;

        case "status":
          result = a.status?.localeCompare(b.status);
          break;

        default:
          break;
      }

      return sortOrder === "asc" ? result : -result;
    });

  if (isLoading) return <Spinner />;

  return (
    <div className="w-full table-auto overflow-x-scroll md:mt-4 md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 flex gap-5 mt-8 sm:mt-20">
      {showFilters && (
        <ReportFiltersComponent
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          filters={filters}
          setFilters={setFilters}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          user={user}
        />
      )}

      <div className="flex flex-col gap-5 w-full mt-5">
        <h1 className="text-xl font-extrabold">List of Messages:</h1>

        <div className="flex flex-col gap-2">
          <div className="flex gap-5 items-center">
            {!showFilters && (
              <div
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-1 cursor-pointer"
              >
                <p className="text-primary">Filters</p>
                <MdFilterList className="w-5 h-5" />
              </div>
            )}

            {/* search bar */}
            <div className="w-full max-w-96">
              <Input
                icon={Search}
                type="text"
                placeholder="Search by Reporter ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="w-full md:mx-auto"
        >
          {selectedMessages?.length > 0 ? (
            <>
              <table className="border-collapse table-auto mx-auto min-w-full border-none">
                <thead className=" bg-gray-500">
                  <tr className="border-b-[2px] border-b-black text-sm">
                    <th className="text-left px-4 py-1 text-nowrap">Sent on</th>
                    <th className="text-left px-4 py-1 text-nowrap">Sent by</th>
                    <th className="text-left px-4 py-1 text-nowrap">Message</th>
                    <th className="text-left px-4 py-1 text-nowrap">Status</th>
                    <th className="text-left px-4 py-1 text-nowrap">Actions</th>
                  </tr>
                </thead>

                <tbody className="text-sm">
                  {selectedMessages
                    ?.slice(startIndex, visibleCount)
                    .map((business) => (
                      <tr
                        key={business._id}
                        className="border-b border-b-gray-600"
                      >
                        <td className="px-4 py-1 text-sm align-top">
                          {business.createdAt
                            ? new Date(business.createdAt).toLocaleString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                  // hour: "numeric",
                                  // minute: "2-digit",
                                  // hour12: true,
                                },
                              )
                            : ""}
                        </td>
                        <td className="px-4 py-1 align-top capitalize">
                          {business?.sender_name}
                        </td>
                        <td className="flex items-center gap-2 px-4 py-1 text-sm capitalize align-top">
                          {business?.text}
                        </td>
                        <td className="px-4 py-1 align-top capitalize">
                          {business?.status}
                        </td>
                        <td className="px-4 py-1 align-top">
                          <div className="flex items-center gap-2">
                            <Link
                              to={`/read/${business?._id}`}
                              className="text-blue-700 hover:scale-110 transition-all duration-300"
                            >
                              <NotepadText size={18} />
                            </Link>

                            <Trash2
                              size={18}
                              className="text-red-700 hover:scale-110 transition-all duration-300"
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <div className="flex justify-center items-center gap-4 mt-4 text-sm">
                {startIndex > 0 && (
                  // previous button
                  <button
                    onClick={() => handleShowLess()}
                    className="px-4 py-1 flex items-center"
                  >
                    <StepBack size={16} />
                    Prev
                  </button>
                )}

                {/* page info // numbering */}
                <p className="flex items-center gap-1">
                  {startIndex + 1} -{" "}
                  {visibleCount < selectedMessages.length
                    ? visibleCount
                    : selectedMessages.length}{" "}
                  of {selectedMessages.length}
                </p>

                {/* next button */}
                {visibleCount < selectedMessages.length && (
                  <button
                    onClick={() => handleShowMore()}
                    className="px-4 py-1 flex items-center"
                  >
                    Next <StepForward size={16} />
                  </button>
                )}
              </div>
            </>
          ) : (
            <p>No Reports found.</p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
