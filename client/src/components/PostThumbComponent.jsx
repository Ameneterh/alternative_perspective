import React from "react";
import { motion } from "framer-motion";
import MainLayout from "../layout/MainLayout";
import founder_image from "../assets/founder_image.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineWhatsapp } from "react-icons/md";
import { FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";
import image from "../assets/founder_image.jpeg";
import { usePostStore } from "../store/postStore";

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
      className=" max-h-96 w-full mx-auto bg-white hover:bg-red-100 hover:shadow-lg transition-all duration-300 rounded-md flex flex-col overflow-clip border-2 border-red-600"
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
    >
      <Link
        // onClick={() => readArticle(post.slug)}
        to={`/post/${post.slug}`}
        className="w-full h-full group flex flex-col cursor-pointer"
      >
        {/* <img
          src={image}
          alt="Bagudu Mohammed"
          className="w-full h-40 object-cover overflow-hidden"
        /> */}
        <motion.div className="w-full h-full flex flex-col flex-1 justify-between">
          <h1 className="w-full md:text-sm font-bold line-clamp-3 py-2 px-2">
            {post.postTitle}
          </h1>
          <div className="flex items-center justify-between mt-1 bg-red-600 p-2">
            <p className="text-xs text-white">
              {new Date(post?.createdAt).toLocaleString("en-GB")}
            </p>
            <p className="text-xs text-yellow-400">Read by {post.readCount}</p>
          </div>
        </motion.div>
      </Link>
    </motion.section>
  );
}
