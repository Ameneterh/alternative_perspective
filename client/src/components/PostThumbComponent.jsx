import React from "react";
import { motion } from "framer-motion";
import MainLayout from "../layout/MainLayout";
import founder_image from "../assets/founder_image.jpeg";
import { Link } from "react-router-dom";
import { MdOutlineWhatsapp } from "react-icons/md";
import { FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";

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

export default function PostThumbComponent({ post }) {
  return (
    <motion.section
      className=" max-h-96 w-full mx-auto bg-slate-100 hover:bg-slate-200 hover:shadow-lg transition-all duration-300 rounded-md flex flex-col overflow-clip"
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
    >
      <Link to={`/post/${post.slug}`} className="w-full h-full group">
        <img
          src={post.postImage}
          alt={post.postTitle}
          className="w-full h-40 object-cover overflow-hidden"
        />
        <motion.div className="w-full flex flex-col">
          <h1 className="w-full text-lg md:text-xl font-bold line-clamp-3 py-2 px-2">
            {post.postTitle}
          </h1>
          <div className="flex items-center justify-between mt-1 bg-red-100 p-2">
            <p className="text-xs text-gray-600">
              {new Date(post?.createdAt).toLocaleString("en-GB")}
            </p>
            <p className="text-xs text-gray-800">Read by {post.readCount}</p>
          </div>
        </motion.div>
      </Link>
    </motion.section>
  );
}
