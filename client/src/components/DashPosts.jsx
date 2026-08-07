import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { HiOutlineExclamationCircle } from "react-icons/hi";
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

export default function DashPosts() {
  const { user } = useAuthStore();
  const { getAllPosts, isLoading } = usePostStore();

  // sorting and filtering states
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");

  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState(false);

  const [formData, setFormData] = useState({});

  // others
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [filteredFields, setFilteredFields] = useState([]);
  const [visibleCount, setVisibleCount] = useState(20);
  const [startIndex, setStartIndex] = useState(0);
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0],
  );

  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showNewModal, setShowNewModal] = useState(false);
  const [showReadReportsModal, setShowReadReportsModal] = useState(false);

  const [selectedReport, setSelectedReport] = useState(null);
  const [pdfLoading, setPDFLoading] = useState(false);

  const getPosts = async () => {
    try {
      const { posts } = await getAllPosts();
      setPosts(posts);
      setStartIndex(0);
      setVisibleCount(20);

      return posts;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  useEffect(() => {
    getPosts();
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

  const selectedReports = posts
    .filter((report) => {
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        report?.writer?.fullname?.toLowerCase().includes(search) ||
        report?.postTitle?.toLowerCase().includes(search) ||
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
        <h1 className="text-xl font-extrabold">Posts List:</h1>

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
          {selectedReports.length > 0 ? (
            <>
              <table className="border-collapse table-auto mx-auto min-w-full border-none">
                <thead className=" bg-gray-500">
                  <tr className="border-b-[2px] border-b-black text-sm">
                    <th className="text-left px-4 py-1 text-nowrap">
                      Post Date
                    </th>
                    <th className="text-left px-4 py-1 text-nowrap">
                      Post Title & Content Summary
                    </th>
                    <th className="text-left px-4 py-1 text-nowrap">
                      Read Count
                    </th>
                    <th className="text-left px-4 py-1 text-nowrap">
                      Comment Count
                    </th>
                    <th className="text-left px-4 py-1 text-nowrap">Actions</th>
                  </tr>
                </thead>

                <tbody className="">
                  {selectedReports
                    .slice(startIndex, visibleCount)
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
                        <td className="px-4 py-1 align-top">
                          <Link
                            to={`/post/${business?.slug}`}
                            className="text-blue-600 hover:underline underline-offset-2"
                          >
                            {business?.postTitle}
                          </Link>
                        </td>
                        <td className="flex items-center gap-2 px-4 py-1 text-sm capitalize align-top">
                          {business?.readCount} read
                        </td>
                        <td className="px-4 py-1 align-top">
                          <div className="flex items-center gap-1">
                            <span>{business?.comments?.length}</span>
                            <span className="text-xs">
                              {business?.comments?.length === 1
                                ? "comment"
                                : "comments"}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-1 align-top">
                          <div className="flex items-center gap-1">
                            <Link
                              to={`/edit-post/${business?._id}`}
                              className="text-blue-700 hover:scale-110"
                            >
                              <MdEditNote size={24} />
                            </Link>
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
                  {visibleCount < selectedReports.length
                    ? visibleCount
                    : selectedReports.length}{" "}
                  of {selectedReports.length}
                </p>

                {/* next button */}
                {visibleCount < selectedReports.length && (
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

      {/* modal to update user status */}
      {showNewModal && (
        <div className="p-2 fixed inset-0 bg-black bg-opacity-50 flex justify-center z-50">
          <div className="mt-6 bg-white rounded shadow-lg w-full sm:w-[75%]  max-h-[90vh] sm:max-h-[80vh] relative">
            {/* top close button */}
            <span
              className="flex items-center absolute top-1 right-2 cursor-pointer"
              onClick={() => setShowNewModal(false)}
            >
              <span className="text-xs text-gray-400 mr-1">Close</span>
              <CircleX className="text-red-500" />
            </span>

            <div className="flex flex-col p-2 rounded border text-sm bg-white">
              <div className="flex flex-col pb-2 border-b-2">
                <p className="capitalize font-bold text-lg text-center text-blue-900">
                  View <span className="capitalize">{title}</span>
                </p>
              </div>

              {/* reporter details */}
              <article className="flex flex-col px-4 mt-3 overflow-y-auto max-h-[60vh] py-2">
                {filteredFields &&
                  filteredFields.map((field, index) => (
                    <>
                      <div className="flex items-center gap-1 text-sm -mb-3 text-nowrap">
                        <span
                          className="font-bold"
                          title={field?.reporter?.fullname}
                        >
                          {field?.reporter?.fullname.length > 20
                            ? field?.reporter?.fullname.slice(0, 20) + " ..."
                            : field?.reporter?.fullname}
                        </span>{" "}
                        from
                        <span className="font-semibold">
                          {field?.workStation.length > 10
                            ? field?.workStation.slice(0, 10)
                            : field?.workStation}
                        </span>
                        <p className="block">
                          on{" "}
                          <span className="font-semibold">
                            {field.createdAt
                              ? new Date(field.createdAt).toLocaleString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  },
                                )
                              : ""}
                          </span>
                        </p>
                      </div>
                      <ul key={index} className="list-disc text-sm -ml-5">
                        {/* {field.split("\n").map((line, i) => (
                        <li key={i}>{line.trim()}</li>
                      ))} */}
                        {field.value.split("\n").map((line, i) => (
                          <li key={i} className="flex items-start gap-1">
                            <span>*</span>
                            <span className="">{line.trim()}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  ))}

                {/* {filteredFields &&
                  filteredFields.map((field) => (
                    <p className="flex items-center gap-1">
                      <span>*</span>
                      <span>{field}</span>
                    </p>
                  ))} */}
                <section className="flex flex-col pb-3"></section>

                {/* <div className="overflow-y-auto max-h-[55vh] p-2">
                  <div className="flex flex-col gap-2 py-2 w-full">
                    <div className="flex flex-col w-full mb-2">
                      <p className="font-bold">Work Done:</p>
                      <p className="whitespace-pre-line text-sm">
                        {selectedReport?.dutiesDone}
                      </p>
                    </div>
                    <div className="flex flex-col w-full mb-2">
                      <p className="font-bold">Challenges:</p>
                      <p className="whitespace-pre-line text-sm">
                        {selectedReport?.challenges}
                      </p>
                    </div>
                    <div className="flex flex-col w-full mb-2">
                      <p className="font-bold">Observations:</p>
                      <p className="whitespace-pre-line text-sm">
                        {selectedReport?.observations}
                      </p>
                    </div>
                    <div className="flex flex-col w-full mb-2">
                      <p className="font-bold">Medication Reviews:</p>
                      <p className="whitespace-pre-line text-sm">
                        {selectedReport?.interventions}
                      </p>
                    </div>
                    <div className="flex flex-col w-full mb-2">
                      <p className="font-bold">Out of Stock:</p>
                      <p className="whitespace-pre-line text-sm">
                        {selectedReport?.outOfStock}
                      </p>
                    </div>
                    <div className="flex flex-col w-full mb-2">
                      <p className="font-bold">Remarks:</p>
                      <p className="whitespace-pre-line text-sm">
                        {selectedReport?.remarks}
                      </p>
                    </div>
                    <div className="flex flex-col w-full mb-2">
                      <p className="font-bold">Comments:</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 p-2 bg-slate-200 gap-2">
                        {selectedReport?.comments?.length > 0 ? (
                          selectedReport?.comments?.map((comment) => (
                            <div
                              key={comment._id}
                              className="flex flex-col text-sm"
                            >
                              <div className="p-1 bg-slate-50 rounded h-full">
                                <span className="block text-xs">
                                  Comment by:{" "}
                                  <span className="font-semibold">
                                    {comment?.commentBy?.rank === "Dep Director"
                                      ? "Pharm Mrs"
                                      : comment?.commentBy?.role ===
                                          "pharmacist"
                                        ? "Pharm"
                                        : "Pharm Tech"}
                                  </span>{" "}
                                  <span className="font-bold">
                                    {comment?.commentBy.fullname}
                                  </span>
                                </span>
                                <p className="ml-4">{comment?.comment}</p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p>No comments</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div> */}
              </article>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
