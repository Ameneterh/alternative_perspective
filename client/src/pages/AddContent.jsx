import { useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import toast from "react-hot-toast";
import InvoiceHeader from "../components/InvoiceHeader.jsx";
import CompanyDetails from "../components/ReporterDetails.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

export default function AddContent() {
  const { user } = useAuthStore();
  const { savePost, isLoading } = usePostStore();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({});

  // save post
  const saveNewPost = async (e) => {
    e.preventDefault();

    try {
      await savePost({
        postTitle: formData.postTitle,
        // postImage: formData.postImage,
        postImage:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqj88DlUTf3eWQ3k0J-x2y3WJ_4CU4ScXrJVdWq3GxBoSmSR2Q8UNlcz0&s=10",
        category: formData.category,
        subCategory: formData.subCategory,
        postContent: formData.postContent,
        writer: user._id,
      });

      toast.success("Post saved successfully!");
      navigate("/user-dashboard?tab=posts");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
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
          Add Content
        </p>

        <form onSubmit={saveNewPost}>
          <div className="flex flex-col justify-center gap-y-5">
            <article className="flex flex-col gap-10">
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

              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="flex flex-col sm:flex-row gap-3 relative w-full border-none">
                  <p className="text-xs bg-white font-semibold absolute -top-2 px-1 flex items-center gap-[2px]">
                    Post Image
                    <span className="text-red-600 font-bold ml-1">*</span>
                  </p>
                  <input
                    type="file"
                    className="w-full sm:w-1/4 pl-2 pr-3 py-2 border-b border-b-gray-700 placeholder-gray-400 transition duration-200 flex-1 text-xs outline-none ring-0 focus:ring-0 focus:outline-none focus:border-transparent focus:border-b-2 focus:border-b-red-700 border-transparent"
                  />
                </div>

                {/* select post category */}
                <div className="flex flex-col sm:flex-row gap-3 relative w-full border-none">
                  <p className="text-xs bg-white font-semibold absolute -top-2 px-1 flex items-center gap-[2px]">
                    Post Category
                    <span className="text-red-600 font-bold ml-1">*</span>
                  </p>
                  <select
                    // value={formData.category}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target.value,
                      })
                    }
                    className="w-full sm:w-1/4 pl-2 pr-3 py-2 border-b border-b-gray-700 placeholder-gray-400 transition duration-200 flex-1 text-xs outline-none ring-0 focus:ring-0 focus:outline-none focus:border-transparent focus:border-b-2 focus:border-b-red-700 border-transparent"
                  >
                    <option>Select category</option>
                    <option value="columns">Columns</option>
                    <option value="editorials">Editorials</option>
                    <option value="features">Features</option>
                    <option value="news">News</option>
                  </select>
                </div>

                {/* select post subcategory */}
                <div className="flex flex-col sm:flex-row gap-3 relative w-full border-none">
                  <p className="text-xs bg-white font-semibold absolute -top-2 px-1 flex items-center gap-[2px]">
                    Post Sub Category
                    <span className="text-red-600 font-bold ml-1">*</span>
                  </p>
                  <select
                    // value={formData.category}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        subCategory: e.target.value,
                      })
                    }
                    className="w-full sm:w-1/4 pl-2 pr-3 py-2 border-b border-b-gray-700 placeholder-gray-400 transition duration-200 flex-1 text-xs outline-none ring-0 focus:ring-0 focus:outline-none focus:border-transparent focus:border-b-2 focus:border-b-red-700 border-transparent"
                  >
                    <option>Select sub-category</option>
                    <option value="economy">Economy</option>
                    <option value="health">Health</option>
                    <option value="politics">Politics</option>
                    <option value="security">Security</option>
                  </select>
                </div>
              </div>

              {/* post content */}
              <div className="flex flex-col sm:flex-row gap-3 relative w-full border-none">
                <p className="text-xs bg-white font-semibold absolute -top-2 px-1 flex items-center gap-[2px]">
                  Post Content
                  <span className="text-red-600 font-bold ml-1">*</span>
                </p>
                {/* <textarea
                value={formData.postContent}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    postContent: e.target.value,
                  })
                }
                rows={20}
                placeholder="Enter post content as it should appear when published"
                className="w-full sm:w-1/4 pl-2 pr-3 py-2 border-b border-b-gray-700 placeholder-gray-400 transition duration-200 flex-1 text-xs outline-none ring-0 focus:ring-0 focus:outline-none focus:border-transparent focus:border-b-2 focus:border-b-red-700 border-transparent"
              /> */}
                <ReactQuill
                  theme="snow"
                  modules={modules}
                  placeholder="Enter post content here ..."
                  className="h-96 mb-12 w-full"
                  required
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
                    <span className="pl-3">Publishing ...</span>
                  </>
                ) : (
                  <>
                    <MdOutlinePublishedWithChanges size={20} className="mr-1" />{" "}
                    Publish
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
