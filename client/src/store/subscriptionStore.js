import { create } from "zustand";
import axios from "axios";

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/server/subscription"
    : "/server/subscription";

axios.defaults.withCredentials = true;

export const useSubscriptionStore = create((set) => ({
  subscription: null,
  error: null,
  isLoading: false,
  message: null,

  //   send new message
  subscribe: async ({ subscriber, email, acceptance }) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/subscribe`, {
        subscriber,
        email,
        acceptance,
      });
      set({
        subscription: response.data.subscription,
        isLoading: false,
      });
    } catch (error) {
      set({
        error:
          error.response?.data?.message || error.message || "Error subscribing",
        isLoading: false,
      });
      throw error;
    }
  },

  // 1. get all messages
  getAllSubscriptions: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/get-subscriptions`);
      set({
        subscriptions: response.data.subscriptions,
        isLoading: false,
      });
      return response.data;
    } catch (error) {
      set({
        error: error.response.data.message || "Error getting Subscriptions",
        isLoading: false,
      });
      throw error;
    }
  },

  //   read a message
  unsubscribe: async ({ email }) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.put(`${API_URL}/unsubscribe`, {
        email,
      });
      set({
        // contact: response.data.contact,
        isLoading: false,
      });
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          error.message ||
          "Error reading message",
        isLoading: false,
      });
      throw error;
    }
  },
}));
