import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
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
import { FaCloudDownloadAlt, FaRegEdit } from "react-icons/fa";

import {
  MdAddBusiness,
  MdLockReset,
  MdOutlineCreateNewFolder,
  MdOutlinePublishedWithChanges,
} from "react-icons/md";
import { usePostStore } from "../store/postStore.js";
import ReactQuill from "react-quill";
import { modules } from "../modules.js";
import "react-quill/dist/quill.snow.css";
import { Loader } from "lucide-react";

export default function EditAboutPage() {
  const { user, getAboutContent, editAbout } = useAuthStore();
  const { savePost, isLoading } = usePostStore();
  const [about, setAbout] = useState(null);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    aboutTitle: "",
    aboutContent: "",
    missionTitle: "",
    missionContent: "",
  });

  useEffect(() => {
    getAbout();
  }, [user._id]);

  const getAbout = async () => {
    try {
      const res = await getAboutContent();
      setAbout(res?.[0] || null);
    } catch (error) {
      console.log(error);
    }
  };

  const initialized = useRef(false);

  useEffect(() => {
    if (about && !initialized.current) {
      setFormData({
        aboutTitle: about.aboutTitle || "",
        aboutContent: about.aboutContent || "",
        missionTitle: about.missionTitle || "",
        missionContent: about.missionContent || "",
      });

      initialized.current = true;
    }
  }, [about]);

  // save editions
  const saveAboutPageEdit = async (e) => {
    e.preventDefault();

    try {
      await editAbout(about._id, {
        aboutTitle: formData.aboutTitle,
        aboutContent: formData.aboutContent,

        missionTitle: formData.missionTitle,
        missionContent: formData.missionContent,

        lastUpdatedBy: user._id,
      });

      toast.success("About Page Successfully Edited!");
      navigate("/about");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <MainLayout>
      <div className="md:px-10 mt-20 md:mt-32 w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen max-w-7xl w-full mx-auto mt-2 mb-10 p-4 bg-white"
        >
          <p className="flex items-center gap-1 text-xl font-extrabold mb-6 text-blue-950 text-center border-b-2 border-b-red-900 pb-2">
            <FaRegEdit size={20} />
            Edit About Page
          </p>

          <form onSubmit={saveAboutPageEdit}>
            <div className="flex flex-col justify-center gap-y-5">
              <article className="flex flex-col gap-5">
                {/* post title */}
                <div className="flex flex-col sm:flex-row gap-3 relative w-full border-none">
                  <p className="text-xs bg-white font-semibold absolute -top-2 px-1 flex items-center gap-[2px]">
                    About Title
                    <span className="text-red-600 font-bold ml-1">*</span>
                  </p>

                  <input
                    value={formData.aboutTitle || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        aboutTitle: e.target.value,
                      }))
                    }
                    placeholder="Enter post title as it should appear when published"
                    className="w-full sm:w-1/4 pl-2 pr-3 py-2 border-b border-b-gray-700 placeholder-gray-400 transition duration-200 flex-1 text-xs outline-none ring-0 focus:ring-0 focus:outline-none focus:border-transparent focus:border-b-2 focus:border-b-red-700 border-transparent"
                  />
                </div>

                {/* post content */}
                <div className="flex flex-col sm:flex-row gap-3 relative w-full border-none">
                  <p className="text-xs bg-white font-semibold absolute -top-2 px-1 flex items-center gap-[2px]">
                    About Content
                    <span className="text-red-600 font-bold ml-1">*</span>
                  </p>

                  <ReactQuill
                    theme="snow"
                    modules={modules}
                    placeholder="Enter post content here ..."
                    className="h-60 mb-12 w-full"
                    required
                    value={formData.aboutContent || ""}
                    onChange={(value) => {
                      const cleanValue = value === "<p><br></p>" ? "" : value;

                      setFormData((prev) => ({
                        ...prev,
                        aboutContent: cleanValue,
                      }));
                    }}
                  />
                </div>
              </article>

              <article className="flex flex-col gap-5">
                <div className="flex flex-col sm:flex-row gap-3 relative w-full border-none">
                  <p className="text-xs bg-white font-semibold absolute -top-2 px-1 flex items-center gap-[2px]">
                    Mission Title
                    <span className="text-red-600 font-bold ml-1">*</span>
                  </p>
                  <input
                    value={formData.missionTitle || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        missionTitle: e.target.value,
                      }))
                    }
                    placeholder="Enter post title as it should appear when published"
                    className="w-full sm:w-1/4 pl-2 pr-3 py-2 border-b border-b-gray-700 placeholder-gray-400 transition duration-200 flex-1 text-xs outline-none ring-0 focus:ring-0 focus:outline-none focus:border-transparent focus:border-b-2 focus:border-b-red-700 border-transparent"
                  />
                </div>

                {/* post content */}
                <div className="flex flex-col sm:flex-row gap-3 relative w-full border-none">
                  <p className="text-xs bg-white font-semibold absolute -top-2 px-1 flex items-center gap-[2px]">
                    Mission Content
                    <span className="text-red-600 font-bold ml-1">*</span>
                  </p>

                  <ReactQuill
                    theme="snow"
                    modules={modules}
                    placeholder="Enter post content here ..."
                    className="h-32 mb-12 w-full"
                    required
                    value={formData.missionContent || ""}
                    onChange={(value) => {
                      const cleanValue = value === "<p><br></p>" ? "" : value;

                      setFormData((prev) => ({
                        ...prev,
                        missionContent: cleanValue,
                      }));
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
                      <MdOutlinePublishedWithChanges
                        size={20}
                        className="mr-1"
                      />{" "}
                      Save Editions
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </MainLayout>
  );
}
