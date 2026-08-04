import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MainLayout from "../layout/MainLayout";
import { posts } from "../assets/static_assets";
import { Link, useParams } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { MdOutlineAddComment } from "react-icons/md";
import { usePostStore } from "../store/postStore";
import toast from "react-hot-toast";

export default function PostDisplayPage() {
  const { error, isLoading, logout, user } = useAuthStore();
  const { getAllPosts, commentReport, readArticle } = usePostStore();
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

  const selectedPost = posts.find((post) => post.slug === slug);

  useEffect(() => {
    if (selectedPost?.slug) {
      readArticle(selectedPost.slug);
    }
  }, [selectedPost?.slug]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();

    try {
      await commentReport({
        comment,
        postId: selectedPost._id,
        commentBy: user._id,
      });
      toast.success("Comment sent successfully");
      getPosts();
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="pt-20 flex items-start flex-col md:flex-row gap-10 mt-10 md:mt-20 px-4 md:px-20 mb-6 min-h-screen mx-auto"
      >
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold">{selectedPost?.postTitle}</h1>

          <div className="flex items-center gap-4">
            <p className="text-gray-800 text-sm">
              Posted on{" "}
              {new Date(selectedPost?.createdAt).toLocaleString("en-GB")}
            </p>
            <span className="border-l-2 border-b-gray-900 pl-2 text-sm">
              Read {selectedPost?.readCount}{" "}
              {selectedPost?.readCount === 1 ? "time" : "times"}
            </span>
          </div>
          {/* <img
            src={selectedPost?.postImage}
            alt={selectedPost?.postTitle}
            className="w-full h-auto rounded-md"
          /> */}
          <div className="flex items-center justify-between">
            <p className="border-l-2 border-l-red-600 p-1">
              By {selectedPost?.writer?.fullname}
            </p>
            <p className="text-gray-600">
              {(selectedPost?.postContent?.length / 1000).toFixed(0)} mins read
            </p>
          </div>

          <div
            dangerouslySetInnerHTML={{ __html: selectedPost?.postContent }}
            className="text-gray-700 w-full max-w-5xl"
          ></div>

          {/* comments */}
          <div className="flex flex-col mt-10 border-t-2 border-t-red-900 w-full p-2 bg-slate-100">
            <p className="text-center text-red-600 font-bold mb-6 text-sm">
              DISCLAIMER!{" "}
              <span className="block text-slate-800 font-light text-sm">
                Comments are not necessarily the views of the editor or
                publisher but that of the users.
              </span>
            </p>

            <div className="flex flex-col w-full bg-white min-h-20 rounded p-2">
              <p className="text-sm font-bold flex items-center gap-1 text-red-800">
                {selectedPost?.comments.length}
                <span>
                  {selectedPost?.comments.length === 1 ? "Comment" : "Comments"}
                </span>
              </p>
              {selectedPost?.comments.length > 0 ? (
                <div className="flex flex-col">
                  {selectedPost?.comments.map((comment) => (
                    <div
                      key={comment._id}
                      className="border-b border-gray-300 p-2 flex items-start gap-2"
                    >
                      <img
                        src={comment?.commentBy.avatar}
                        alt={comment?.commentBy.fullname}
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="flex flex-col">
                        <p className="flex items-center font-bold text-sm">
                          {comment?.commentBy.fullname}{" "}
                          <Link
                            to={`mailto:${comment?.commentBy.email}`}
                            className="text-blue-700 font-light hover:underline underline-offset-2 ml-2"
                          >
                            {comment?.commentBy.email}
                          </Link>
                        </p>
                        <p className="text-gray-700 text-sm">
                          {comment?.comment}
                        </p>
                        <p className="text-gray-500 text-xs">
                          Posted on{" "}
                          {new Date(comment?.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-700 text-center">
                  No comments yet;{" "}
                  <span className="text-red-950 font-bold block">
                    you can help us change that!
                  </span>
                </p>
              )}
            </div>

            <form
              className="flex flex-col md:flex-row gap-4 w-full mt-6"
              onSubmit={handleSubmitComment}
            >
              <div className="flex flex-col w-full">
                <textarea
                  placeholder="Write your comment here..."
                  className={`border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${comment.length > 200 ? "text-red-500" : ""}`}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
                <p className="flex items-center text-xs mt-1 ml-2">
                  {comment.length}/200
                </p>
              </div>
              {user ? (
                <button
                  type="submit"
                  className="bg-red-900 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-nowrap h-fit text-sm flex items-center gap-1"
                >
                  <MdOutlineAddComment size={20} /> Submit
                </button>
              ) : (
                <Link
                  to="/login"
                  className="bg-red-900 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-nowrap h-fit text-sm flex items-center gap-1"
                >
                  Login to comment
                </Link>
              )}
            </form>
          </div>
        </div>

        <div className="flex flex-col md:max-w-96 w-full h-96 bg-gray-400"></div>
      </motion.div>
    </MainLayout>
  );
}
