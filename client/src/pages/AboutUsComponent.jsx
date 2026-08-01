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

export default function AboutUsComponent() {
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
          <motion.div className="w-full max-w-lg">
            <motion.div className="mt-6 w-full rounded-md font-extralight">
              <div className="w-full flex flex-col items-center justify-center mb-4 py-4 bg-white/10 rounded-md">
                <img
                  src={founder_image}
                  alt="founder image"
                  width={200}
                  className="rounded-full self-center mx-auto mb-2 bg-black/10 shadow-xl"
                />
                <div className="flex flex-col text-center">
                  <h2 className="text-lg font-bold text-red-950">
                    Pharm BAGUGU Mohammed
                  </h2>
                  <p className="text-xs text-gray-800 -mt-1">
                    Founder/Managing Partner, Alternative Perspectives
                  </p>
                </div>

                <div className="flex items-center justify-center gap-2 mt-3">
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
              </div>

              <p className="text-sm mb-3">
                Bagudu Mohammed is a freelance writer and socio-political
                commentator known for reframing public debate in Nigeria and
                beyond. His work offers alternative perspectives that challenge
                groupthink, test popular assumptions, and invite readers to
                think beyond convenient narratives. The goal is not to tell
                people what to think, but to give them better material to think
                with.
              </p>
              <p className="text-sm mb-3">
                He combines flair in writing with deep research and reflection.
                Much of his material is drawn from the pulse of social media
                conversations, where he identifies trending national issues and
                subjects them to rigorous analysis. The result is commentary
                that is balanced, fact-driven, and unafraid to question
                consensus, while still engaging, thoughtful, and accessible.
              </p>
              <p className="text-sm mb-3">
                Bagudu has earned a reputation as one of the leading voices
                shaping opinion on both national and international issues. His
                writing spans politics, governance, social trends, and
                relationships, and it is valued for its clarity, intellectual
                honesty, and the ability to hold both conviction and nuance in
                the same space.
              </p>
              <p className="text-sm mb-3">
                By professional training, Bagudu Mohammed is a pharmacist. He is
                also an alumnus of the University of Jos and the University of
                Abuja, where he earned a BSc in Public Administration and
                graduated as the best student in his set. In addition to
                writing, he works as a project manager and serves as Public
                Relations consultant to several distinguished personalities.
              </p>
              <p className="text-sm mb-3">
                His articles are widely sought after by print and online media
                platforms for their distinctive voice: incisive, reflective, and
                rooted in a search for truth in a marketplace of competing
                ideas.
              </p>
            </motion.div>
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
                Why Our Mission Matters
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

            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="font-extralight md:mb-6"
            >
              <hr className="border-t border-gray-100" />

              {/* What Makes Different */}
              <h2 className="text-2xl font-semibold my-4">
                What Makes Our Approach Different
              </h2>
              <p className="mt-4">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Possimus optio praesentium a vitae voluptate, sequi laborum
                consequuntur! Neque, recusandae hic repellat ullam nobis
                architecto sed explicabo cumque quae deleniti rerum?
              </p>
              <p className="mt-3">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Possimus optio praesentium a vitae voluptate, sequi laborum
                consequuntur! Neque, recusandae hic repellat ullam nobis
                architecto sed explicabo cumque quae deleniti rerum?
              </p>
            </motion.p>

            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="font-extralight md:mb-6"
            >
              <hr className="border-t border-gray-100 my-4" />

              {/* Values & Promise */}
              <h2 className="text-2xl font-semibold">
                The Values That Guide Our Work
              </h2>
              <ul className="mt-4 space-y-2">
                <li>
                  <strong>Authenticity:</strong> Lorem ipsum dolor, sit amet
                  consectetur adipisicing elit. Possimus optio praesentium a
                  vitae voluptate, sequi laborum consequuntur! Neque, recusandae
                  hic repellat ullam nobis architecto sed explicabo cumque quae
                  deleniti rerum?.
                </li>
                <li>
                  <strong>Truthfulness:</strong> Lorem ipsum dolor, sit amet
                  consectetur adipisicing elit. Possimus optio praesentium a
                  vitae voluptate, sequi laborum consequuntur! Neque, recusandae
                  hic repellat ullam nobis architecto sed explicabo cumque quae
                  deleniti rerum?
                </li>
                <li>
                  <strong>Reliability:</strong> Lorem ipsum dolor, sit amet
                  consectetur adipisicing elit. Possimus optio praesentium a
                  vitae voluptate, sequi laborum consequuntur! Neque, recusandae
                  hic repellat ullam nobis architecto sed explicabo cumque quae
                  deleniti rerum?
                </li>
              </ul>
            </motion.p>
          </motion.div>
        </motion.section>
      </motion.section>
    </MainLayout>
  );
}
