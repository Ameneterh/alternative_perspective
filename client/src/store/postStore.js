import { create } from "zustand";
import axios from "axios";

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/server/post"
    : "/server/post";

const DOC_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000"
    : "https://pharmreports.onrender.com";

axios.defaults.withCredentials = true;

export const usePostStore = create((set) => ({
  post: null,
  error: null,
  isLoading: false,
  message: null,

  //   send new message
  savePost: async ({ postTitle, postContent, writer, comments }) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/save-post`, {
        postTitle,
        postContent,
        writer,
        comments,
      });
      set({
        post: response.data.post,
        isLoading: false,
      });
    } catch (error) {
      set({
        error:
          error.response?.data?.message || error.message || "Error saving post",
        isLoading: false,
      });
      throw error;
    }
  },

  //   read post
  readArticle: async (slug) => {
    try {
      const res = await axios.put(`${API_URL}/read/${slug}`);

      set((state) => ({
        readCount: {
          ...state.readCount,
          [slug]: res.data.readCount,
        },
      }));
    } catch (error) {
      console.error("Error updating reads:", error);
    }
  },

  // get all posts
  getAllPosts: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/get-posts`);
      set({
        posts: response.data.posts,
        isLoading: false,
      });
      return response.data;
    } catch (error) {
      set({
        error: error.response.data.message || "Error getting posts",
        isLoading: false,
      });
      throw error;
    }
  },

  //   send comment
  commentReport: async ({ comment, postId, commentBy }) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.put(`${API_URL}/send-comment`, {
        comment,
        postId,
        commentBy,
      });
      set({
        comment: response.data.comment,
        isLoading: false,
      });
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          error.message ||
          "Error sending comment",
        isLoading: false,
      });
      throw error;
    }
  },
}));
