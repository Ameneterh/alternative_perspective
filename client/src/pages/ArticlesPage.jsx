import React from "react";
import { motion } from "framer-motion";
import MainLayout from "../layout/MainLayout";
import founder_image from "../assets/founder_image.jpeg";
import { Link, useParams } from "react-router-dom";
import { MdFilterList, MdOutlineWhatsapp } from "react-icons/md";
import { FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";
import { posts } from "../assets/static_assets";
import PostThumbComponent from "../components/PostThumbComponent";
import { usePostStore } from "../store/postStore";
import { useState } from "react";
import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { ReportFiltersComponent } from "../components/DashFilterComponent";
import { Input } from "../components/Input";
import { Search } from "lucide-react";

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

export default function ArticlesPage() {
  const { error, isLoading, logout, user } = useAuthStore();
  const { getAllPosts } = usePostStore();
  const { slug } = useParams();
  const [comment, setComment] = useState("");
  const [posts, setPosts] = useState([]);

  // search functionality
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState(false);
  const [filteredFields, setFilteredFields] = useState([]);

  const getPosts = async () => {
    try {
      const { posts } = await getAllPosts();
      setPosts(posts);

      return posts;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  useEffect(() => {
    getPosts();
  }, [user?._id]);

  const selectedReports = posts
    .filter((post) => {
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        post?.postTitle?.toLowerCase().includes(search) ||
        new Date(post?.createdAt)
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

  return (
    <MainLayout>
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="w-full md:mx-auto"
      >
        <motion.section
          className="min-h-screen w-full max-w-6xl mx-auto bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl flex flex-col mt-20 p-4 text-sm md:text-md"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          <div className="flex items-start md:items-end justify-between flex-col md:flex-row">
            <h1 className="text-red-950 font-bold text-xl md:text-3xl mt-4 md:mt-20 border-l-[6px] border-l-orange-600 pl-3 mb-3 md:mb-0">
              Articles & Opinions
            </h1>

            {/* search bar */}
            <div className="w-full max-w-96">
              <Input
                icon={Search}
                type="text"
                placeholder="Search by Artitle Title, Article Date ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <motion.section
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="w-full mx-auto flex flex-col md:flex-row gap-10"
          >
            <motion.div className="w-full">
              {selectedReports.length > 0 ? (
                <motion.div className="mt-6 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                  {selectedReports?.map((post, index) => (
                    <PostThumbComponent key={index} post={post} />
                  ))}
                </motion.div>
              ) : (
                <p className="text-red-800 font-bold">No News Post Yet!</p>
              )}
            </motion.div>
          </motion.section>
        </motion.section>
      </motion.div>
    </MainLayout>
  );
}
