import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { formatDate } from "../../../server/utils/date";
import MainLayout from "../layout/MainLayout";
import HeroComponent from "../components/HeroComponent";
import { usePostStore } from "../store/postStore";
import { useParams } from "react-router-dom";
import PostThumbComponent from "../components/PostThumbComponent";

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

  return (
    <MainLayout>
      <HeroComponent posts={posts} />
      <div className="flex items-center justify-center bg-slate-100 w-full h-40">
        Advert Section
      </div>

      {/* show features if any */}
      {posts.length > 0 ? (
        <div className=" mx-4 md:mx-auto max-w-6xl flex flex-col gap-4 mt-4 md:mt-16">
          <p className="text-2xl font-extrabold">Recent Articles</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {posts?.slice(0, 4).map((post, index) => (
              <PostThumbComponent key={index} post={post} />
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </MainLayout>
  );
}
