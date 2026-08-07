import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MainLayout from "../layout/MainLayout";
import founder_image from "../assets/founder_image.jpeg";
import { Link } from "react-router-dom";
import { MdOutlineWhatsapp } from "react-icons/md";
import { FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";
import { useAuthStore } from "../store/authStore";

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

export default function AboutPage() {
  const { user, getAboutContent } = useAuthStore();
  const [about, setAbout] = useState(null);

  const getAbout = async () => {
    try {
      const res = await getAboutContent();
      setAbout(res?.[0] || null);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAbout();
  }, [user._id]);

  console.log(about);

  return (
    <MainLayout>
      <motion.section
        className="min-h-screen w-full max-w-6xl mx-auto bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl flex flex-col md:mt-20 p-4 text-sm md:text-md"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
      >
        <h1 className="text-lg md:text-xl mt-4 md:mt-20 font-bold border-l-[6px] border-l-orange-600 pl-3 mb-6">
          About <br />
          <span className="text-red-950 font-bold text-xl md:text-3xl ">
            Alternative <br />
            Perspectives
          </span>
        </h1>
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="max-w-6xl w-full mx-auto flex flex-col md:flex-row gap-10"
        >
          {/* left side */}
          <motion.div className="w-full max-w-3xl text-black">
            <motion.div className="mt-6 w-full rounded-md font-normal">
              <div className="w-full flex flex-col items-center justify-center mb-2 py-4 bg-white/10 rounded-md">
                <img
                  src={founder_image}
                  alt="founder image"
                  width={200}
                  className="rounded-full self-center mx-auto mb-2 bg-black/10 shadow-xl"
                />
                <div className="flex flex-col text-center">
                  <h2 className="text-lg font-bold text-red-950">
                    BAGUDU Mohammed
                  </h2>
                  <p className="text-xs text-gray-800 -mt-1">
                    Founder & Editor, Alternative Perspectives
                  </p>
                </div>

                <div className="flex items-center justify-center gap-2 mt-1">
                  <Link
                    to="#"
                    className="hover:scale-110 transition-all duration-200"
                  >
                    <FaLinkedin size={20} />
                  </Link>
                  <Link
                    to="#"
                    className="hover:scale-110 transition-all duration-200"
                  >
                    <FaTwitter size={20} />
                  </Link>
                  <Link
                    to="#"
                    className="hover:scale-110 transition-all duration-200"
                  >
                    <FaFacebook size={20} />
                  </Link>
                  <Link
                    to="#"
                    className="hover:scale-110 transition-all duration-200"
                  >
                    <MdOutlineWhatsapp size={20} />
                  </Link>
                </div>
                <div className="flex items-center mt-1">
                  {user?.role === "editor" && user?.isAdmin && (
                    <Link
                      to="/edit-about"
                      className="px-2 py-1 text-blue-700 hover:text-blue-800 hover:underline underline-offset-2 transition-all duration-300"
                    >
                      Edit About Page
                    </Link>
                  )}
                </div>
              </div>
              <h2
                id="mission"
                className="text-2xl font-semibold pt-4 mb-3 border-t-2 border-t-red-800"
              >
                {about?.aboutTitle}
              </h2>

              <div
                className="text-sm mb-3"
                dangerouslySetInnerHTML={{ __html: about?.aboutContent }}
              ></div>
            </motion.div>
            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="font-normal mb-6"
            >
              <h2
                id="mission"
                className="text-2xl font-semibold mt-6 pt-4 mb-3 border-t-2 border-t-red-800"
              >
                {about?.missionTitle}
              </h2>
              <div
                className="mt-2 text-black"
                dangerouslySetInnerHTML={{ __html: about?.missionContent }}
              ></div>
            </motion.p>
          </motion.div>

          {/* right */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="flex-1"
          >
            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="font-extralight mb-6"
            >
              <h2 id="mission" className="text-2xl font-semibold">
                Advert Placement
              </h2>
              <p className="mt-4">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab
                amet labore dolore sed debitis soluta, veritatis facilis vel
                sapiente hic facere! Unde dolore laborum perferendis vel cumque?
                Neque, voluptates excepturi!
              </p>
              <p className="mt-3">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo
                quidem, consequatur sit quisquam atque assumenda! Cum sit
                numquam ipsam sed sapiente excepturi porro et incidunt, saepe
                pariatur magni ut aperiam.
              </p>
            </motion.p>
          </motion.div>
        </motion.section>
      </motion.section>
    </MainLayout>
  );
}
