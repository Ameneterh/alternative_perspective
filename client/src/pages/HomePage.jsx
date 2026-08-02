import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { formatDate } from "../../../server/utils/date";
import MainLayout from "../layout/MainLayout";
import HeroComponent from "../components/HeroComponent";
import { usePostStore } from "../store/postStore";
import { useParams } from "react-router-dom";

export default function HomePage() {
  const { error, isLoading, logout, user } = useAuthStore();
  const { getAllPosts } = usePostStore();
  const { slug } = useParams();
  const [comment, setComment] = useState("");
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      const { posts } = await getAllPosts();
      setPosts(posts);

      return posts;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  useEffect(() => {
    getPosts();
  }, [user?._id]);

  const handleLogout = () => {
    logout();
  };

  const features = posts.filter((post) => post.category === "features");
  const editorials = posts.filter((post) => post.category === "editorials");
  const columns = posts.filter((post) => post.category === "columns");

  return (
    <MainLayout>
      <HeroComponent posts={posts} />
      <div className="flex items-center justify-center bg-slate-100 w-full h-40">
        Advert Section
      </div>

      {/* show columns if any */}
      {columns.length > 0 ? (
        <div className=" mx-4 md:mx-auto max-w-6xl flex flex-col gap-4 mt-4 md:mt-16">
          <p className="text-2xl font-extrabold">Guest Columns</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {columns?.slice(0, 4).map((post, id) => (
              <div key={id} className="flex items-start gap-2 w-full">
                <img src={post.postImage} className="w-20 h-20 rounded" />
                <div className="flex flex-1 flex-col items-start -mt-1">
                  <div className="flex gap-1 items-center">
                    <span className="font-bold leading-tight">
                      {post.postTitle}
                    </span>
                  </div>
                  <p className="text-xs text-red-600 mt-1 uppercase">
                    {post.category}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}

      {/* show editorials if any */}
      {editorials.length > 0 ? (
        <div className=" mx-4 md:mx-auto max-w-6xl flex flex-col gap-4 mt-4 md:mt-16">
          <p className="text-2xl font-extrabold">Features</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {editorials?.slice(0, 4).map((post, id) => (
              <div key={id} className="flex items-start gap-2 w-full">
                <img src={post.postImage} className="w-20 h-20 rounded" />
                <div className="flex flex-1 flex-col items-start -mt-1">
                  <div className="flex gap-1 items-center">
                    <span className="font-bold leading-tight">
                      {post.postTitle}
                    </span>
                  </div>
                  <p className="text-xs text-red-600 mt-1 uppercase">
                    {post.category}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}

      {/* show features if any */}
      {features.length > 0 ? (
        <div className=" mx-4 md:mx-auto max-w-6xl flex flex-col gap-4 mt-4 md:mt-16">
          <p className="text-2xl font-extrabold">Features</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {features?.slice(0, 4).map((post, id) => (
              <div key={id} className="flex items-start gap-2 w-full">
                <img src={post.postImage} className="w-20 h-20 rounded" />
                <div className="flex flex-1 flex-col items-start -mt-1">
                  <div className="flex gap-1 items-center">
                    <span className="font-bold leading-tight">
                      {post.postTitle}
                    </span>
                  </div>
                  <p className="text-xs text-red-600 mt-1 uppercase">
                    {post.category}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </MainLayout>
  );
}
