import React from "react";
import { motion } from "framer-motion";
import MainLayout from "../layout/MainLayout";
import founder_image from "../assets/founder_image.jpeg";
import { Link } from "react-router-dom";
import { MdOutlineWhatsapp } from "react-icons/md";
import { FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";
import { posts } from "../assets/static_assets";
import PostThumbComponent from "../components/PostThumbComponent";

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

export default function EditorialPage() {
  return (
    <MainLayout>
      <motion.section
        className="min-h-screen w-full max-w-6xl mx-auto bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl flex flex-col md:mt-20 p-4 text-sm md:text-md"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
      >
        <h1 className="text-red-950 font-bold text-xl md:text-3xl mt-4 md:mt-20 border-l-[6px] border-l-orange-600 pl-3 mb-6">
          Editorials
        </h1>
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="w-full mx-auto flex flex-col md:flex-row gap-10"
        >
          {/* left side */}
          <motion.div className="w-full">
            <motion.div className="mt-6 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
              {posts?.map((post, index) => (
                <PostThumbComponent key={index} post={post} />
              ))}
            </motion.div>
          </motion.div>
        </motion.section>
      </motion.section>
    </MainLayout>
  );
}
