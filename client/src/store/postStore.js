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
  savePost: async ({
    postTitle,
    postImage,
    category,
    subCategory,
    postContent,
    writer,
    comments,
  }) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/save-post`, {
        postTitle,
        postImage,
        category,
        subCategory,
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
  commentReport: async ({ comment, reportId, commentBy }) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.put(`${API_URL}/send-comment`, {
        comment,
        reportId,
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

  // get weekly report
  generateWeeklyReports: async ({ startDate, endDate }) => {
    set({
      loading: true,
      error: null,
    });

    try {
      const response = await axios.get(`${API_URL}/summary`, {
        params: {
          startDate,
          endDate,
        },
      });

      const { data, files } = response.data;

      set({
        summary: data,
        // excelFile: `${process.env.SERVER_URL}/exports/${files.excel}`,
        // wordFile: `${process.env.SERVER_URL}/exports/${files.word}`,

        excelFile: `${DOC_URL}/${files.excel}`,
        wordFile: `http://localhost:5000/${files.word}`,

        loading: false,
      });
    } catch (error) {
      set({
        loading: false,

        error: error.response?.data?.message || error.message,
      });
    }
  },

  // get report fields
  getReportFields: async ({ startDate, endDate, fields }) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/report-fields`, {
        params: {
          startDate,
          endDate,
          fields: fields.join(","), // ["interventions","remarks"]
        },
      });

      set({ isLoading: false });
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error fetching fields",
        isLoading: false,
      });
      throw error;
    }
  },
}));
