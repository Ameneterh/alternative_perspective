import { useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import toast from "react-hot-toast";
import InvoiceHeader from "../components/InvoiceHeader.jsx";
import CompanyDetails from "../components/ReporterDetails.jsx";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import MainLayout from "../layout/MainLayout.jsx";
import { useAuthStore } from "../store/authStore.js";
import OrderedTextarea, {
  Input,
  InvInput,
  PhoneField,
} from "../components/Input.jsx";
import { Button } from "flowbite-react";
import { RiArrowGoBackLine } from "react-icons/ri";
import { FaCloudDownloadAlt } from "react-icons/fa";
import {
  CalendarDays,
  FileDigit,
  FolderPen,
  Loader,
  Mail,
  MapPinCheck,
  PhoneCall,
} from "lucide-react";
import {
  MdAddBusiness,
  MdLockReset,
  MdOutlineCreateNewFolder,
  MdOutlinePublishedWithChanges,
} from "react-icons/md";
import { VscPreview } from "react-icons/vsc";
import { TbReport } from "react-icons/tb";
import { FaSave } from "react-icons/fa";
import { workStations, dutyType, dutyTime } from "../assets/static_assets.js";
import ReporterDetails from "../components/ReporterDetails.jsx";
import { usePostStore } from "../store/postStore.js";
import ReactQuill from "react-quill";
import { modules } from "../modules.js";
import "react-quill/dist/quill.snow.css";

export default function UpdateContent() {
  const { postId } = useParams();
  const { user } = useAuthStore();
  const { savePost, editPost, getAllPosts, isLoading } = usePostStore();

  const navigate = useNavigate();

  const [post, setPost] = useState([]);
  const [formData, setFormData] = useState({
    postTitle: post.postTitle,
    postContent: post.postContent,
  });

  const getPost = async () => {
    try {
      const { posts } = await getAllPosts();
      setPost(posts.find((post) => post._id === postId));

      return post;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  useEffect(() => {
    if (post) {
      setFormData({
        postTitle: post.postTitle || "",
        postContent: post.postContent || "",
      });
    }
  }, [post]);

  useEffect(() => {
    getPost();
  }, [post?._id]);

  console.log(post);

  // update post
  const updatePost = async (e) => {
    e.preventDefault();

    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No changes made!");
      return;
    }

    try {
      const changedFields = {};

      if (formData.postTitle !== post.postTitle)
        changedFields.postTitle = formData.postTitle;

      if (formData.postContent !== post.postContent)
        changedFields.postContent = formData.postContent;

      await editPost(postId, changedFields);
      toast.success("Post updated successfully!");
      navigate(`/post/${post.slug}`);
    } catch (error) {
      toast.error(error.message);
      // setUpdateUserError(data.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className="md:px-10 mt-6 w-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen max-w-7xl w-full mx-auto mt-2 mb-10 p-4 bg-white"
      >
        <p className="flex items-center gap-1 text-xl font-extrabold mb-6 text-blue-950 text-center border-b-2 border-b-red-900 pb-2">
          <MdOutlineCreateNewFolder size={20} />
          Update Post
        </p>

        <form onSubmit={updatePost}>
          <div className="flex flex-col justify-center gap-y-5">
            <article className="flex flex-col gap-5">
              {/* post title */}
              <div className="flex flex-col sm:flex-row gap-3 relative w-full border-none">
                <p className="text-xs bg-white font-semibold absolute -top-2 px-1 flex items-center gap-[2px]">
                  Post Title
                  <span className="text-red-600 font-bold ml-1">*</span>
                </p>
                <input
                  value={formData.postTitle}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      postTitle: e.target.value,
                    })
                  }
                  placeholder="Enter post title as it should appear when published"
                  className="w-full sm:w-1/4 pl-2 pr-3 py-2 border-b border-b-gray-700 placeholder-gray-400 transition duration-200 flex-1 text-xs outline-none ring-0 focus:ring-0 focus:outline-none focus:border-transparent focus:border-b-2 focus:border-b-red-700 border-transparent"
                />
              </div>

              {/* post content */}
              <div className="flex flex-col sm:flex-row gap-3 relative w-full border-none">
                <p className="text-xs bg-white font-semibold absolute -top-2 px-1 flex items-center gap-[2px]">
                  Post Content
                  <span className="text-red-600 font-bold ml-1">*</span>
                </p>

                <ReactQuill
                  theme="snow"
                  modules={modules}
                  placeholder="Enter post content here ..."
                  className="h-96 mb-12 w-full"
                  required
                  value={formData.postContent}
                  onChange={(value) => {
                    setFormData({ ...formData, postContent: value });
                  }}
                />
              </div>
            </article>

            {/* preview button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-x-4 gap-y-3">
              <motion.button
                className="py-2 px-6 bg-gradient-to-r from-red-600 to-red-800 rounded-lg hover:border-white hover:from-red-800 hover:to-red-600 border focus:outline-none transition duration-200 cursor-pointer flex items-center justify-center text-white"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader className="animate-spin mx-auto" />
                    <span className="pl-3">Saving ...</span>
                  </>
                ) : (
                  <>
                    <MdOutlinePublishedWithChanges size={20} className="mr-1" />{" "}
                    Save Edits
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
