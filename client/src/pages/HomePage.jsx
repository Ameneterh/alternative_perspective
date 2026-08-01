import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { formatDate } from "../../../server/utils/date";
import MainLayout from "../layout/MainLayout";
import HeroComponent from "../components/HeroComponent";
import { editorial } from "../assets/static_assets";

export default function HomePage() {
  const { user, logout, isLoading } = useAuthStore();

  const [ratings, setRatings] = useState([]);

  // const slicedNews = news.slice(0, 8);

  const handleLogout = () => {
    logout();
  };

  return (
    <MainLayout>
      <HeroComponent />
      <div className="flex items-center justify-center bg-slate-100 w-full h-40">
        Advert Section
      </div>

      <div className=" mx-4 md:mx-auto max-w-6xl flex flex-col gap-4 mt-4 md:mt-16">
        <p className="text-2xl font-extrabold">Features</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {editorial?.slice(0, 4).map((editorial, id) => (
            <div key={id} className="flex items-start gap-2 w-full">
              <img src={editorial.image} className="w-20 h-20 rounded" />
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
      </div>

      <div className=" mx-4 md:mx-auto max-w-6xl flex flex-col gap-4 my-4 md:my-16 pt-4 md:pt-10 border-t-2 border-t-red-800">
        <p className="text-2xl font-extrabold">Guest Columns</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {editorial?.slice(0, 4).map((editorial, id) => (
            <div key={id} className="flex items-start gap-2 w-full">
              <img src={editorial.image} className="w-20 h-20 rounded" />
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
      </div>
    </MainLayout>
  );
}
