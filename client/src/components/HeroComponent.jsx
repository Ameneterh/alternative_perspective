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
import { top_news, editorial } from "../assets/static_assets";

import { Link } from "react-router-dom";
import { MdStars } from "react-icons/md";

export default function HeroComponent() {
  const [isLoading, setIsLoading] = useState(false);

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
        {top_news?.slice(0, 5).map((news, id) => (
          <div key={id} className="flex items-start gap-1 w-full mb-3">
            <MdStars className="text-red-600" size={16} />
            <div className="flex flex-1 flex-col items-start -mt-1">
              <div className="flex gap-1 items-center">
                <span className="font-bold leading-tight">{news.title}</span>
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
              backgroundImage: `url(${heroImage})`,
            }}
          ></div>
          <div className="text-black text-center">
            <p className="text-2xl font-extrabold line-clamp-1">
              JAMB Registrar bows out after a meritorious service
            </p>
            <p className="text-sm font-extralight line-clamp-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequatur, dolorum excepturi incidunt commodi sunt illo dolorem.
              Est obcaecati ducimus dolores tempore possimus voluptatem? Fuga
              cupiditate voluptate id quae, temporibus architecto.
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
        {editorial?.slice(0, 5).map((editorial, id) => (
          <div key={id} className="flex items-start gap-1 w-full mb-3">
            <div className="flex flex-1 flex-col items-start -mt-1">
              <div className="flex gap-1 items-center">
                <span className="font-bold leading-tight">
                  {editorial.title}
                </span>
              </div>
              <p className="text-xs text-red-600 mt-1 uppercase">
                {editorial.category}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
