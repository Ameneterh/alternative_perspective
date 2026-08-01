import { motion } from "framer-motion";
import {
  CircleUserRound,
  Mail,
  Headset,
  MapPinHouse,
  FilePenLine,
  Loader,
} from "lucide-react";
import { useState } from "react";
import heroImage from "../assets/hero_image.jpeg";
import { posts } from "../assets/static_assets";

import { Link } from "react-router-dom";
import { MdStars } from "react-icons/md";

export default function HeroComponent() {
  const [isLoading, setIsLoading] = useState(false);

  const mostReadPost = posts.reduce((max, post) => {
    return post.readCount > max.readCount ? post : max;
  }, posts[0]);

  console.log(mostReadPost);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="pt-20 flex items-start flex-col md:flex-row gap-6 mt-10 md:mt-20 px-4 md:px-20 mb-6"
    >
      {/* left pane */}
      <div className="w-full md:w-72">
        <div className="flex items-center gap-1">
          <div className="h-4 w-4 bg-red-600"></div>
          <p className="text-nowrap font-bold">Top News</p>
        </div>
        <div className="w-full h-[2px] bg-black my-3"></div>
        {posts
          ?.filter((post) => post.category === "News")
          .slice(0, 5)
          .map((news, id) => (
            <div key={id} className="flex items-start gap-1 w-full mb-3">
              <MdStars className="text-red-600" size={16} />
              <div className="flex flex-1 flex-col items-start -mt-1">
                <div className="flex gap-1 items-center">
                  <Link
                    to={`/post/${news.slug}`}
                    className="font-bold leading-tight"
                  >
                    {news.title}
                  </Link>
                </div>
                <p className="text-xs text-red-600 mt-1">{news.time}</p>
              </div>
            </div>
          ))}
      </div>

      {/* middle pane */}
      <div className="h-full flex-1">
        <div className="flex flex-col items-center w-full">
          <div
            className="relative h-96 w-full bg-cover bg-top bg-no-repeat text-black bg-blue-950 rounded-md"
            style={{
              backgroundImage: `url(${mostReadPost.image})`,
            }}
          ></div>
          <div className="text-black text-center">
            <Link
              to={`/post/${mostReadPost.slug}`}
              className="text-2xl font-extrabold line-clamp-1"
            >
              {mostReadPost.title}
            </Link>
            <p className="text-sm font-extralight line-clamp-2">
              {mostReadPost.content}
            </p>
          </div>
        </div>
      </div>

      {/* right pane */}
      <div className="w-full md:w-72">
        <div className="flex items-center gap-1">
          <div className="h-4 w-4 bg-red-600 rounded-full"></div>
          <p className="text-nowrap font-bold">Editorial</p>
        </div>
        <div className="w-full h-[2px] bg-black my-3"></div>
        {posts
          ?.filter((post) => post.category === "Editorials")
          .slice(0, 5)
          .map((editorial, id) => (
            <div key={id} className="flex items-start gap-1 w-full mb-3">
              <div className="flex flex-1 flex-col items-start -mt-1">
                <div className="flex gap-1 items-center">
                  <Link
                    to={`/post/${editorial.slug}`}
                    className="font-bold leading-tight"
                  >
                    {editorial.title}
                  </Link>
                </div>
                <p className="text-xs text-red-600 mt-1 uppercase">
                  {editorial.subCategory}
                </p>
              </div>
            </div>
          ))}
      </div>
    </motion.div>
  );
}
