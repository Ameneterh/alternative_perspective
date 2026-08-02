import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Spinner from "./components/Spinner";
import FloatingShapes from "./components/FloatingShapes";
import HeaderComponent from "./components/HeaderComponent";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage.jsx";
import PasswordResetPage from "./pages/PasswordResetPage";
import toast, { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore.js";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import UserDashboard from "./pages/UserDashboard.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import { useLocation } from "react-router-dom";
import RegisterUser from "./pages/RegisterUser.jsx";
import PostDisplayPage from "./pages/PostDisplayPage.jsx";
import AboutUsComponent from "./pages/AboutUsComponent.jsx";
import NewsPage from "./pages/NewsPage.jsx";
import FeaturesPage from "./pages/FeaturesPage.jsx";
import EditorialPage from "./pages/EditorialPage.jsx";
import ColumnsPage from "./pages/ColumnsPage.jsx";
import FreqAskedQuestions from "./pages/FreqAskedQuestions.jsx";
import TermsofUsePage from "./pages/TermsofUsePage.jsx";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage.jsx";

// protected routes
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user, justLoggedOut, setJustLoggedOut } =
    useAuthStore();

  useEffect(() => {
    if (!isAuthenticated && !justLoggedOut) {
      toast.error("You need to log in to access this page");
    }
  }, [isAuthenticated, justLoggedOut, setJustLoggedOut]);

  if (!isAuthenticated) {
    return <Navigate to="/user-login" replace />;
  }

  if (user?.status !== "active") {
    return <Navigate to="/verify-handler" replace />;
  }

  return children;
};

// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user?.status === "active") {
    return <Navigate to="/user-dashboard?tab=dash" replace />;
  }

  return children;
};

function App() {
  const contentRef = useRef();
  const reactToPrintFn = useReactToPrint({ contentRef });

  const { isCheckingAuth, checkAuth, isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <Spinner />;

  return (
    <div className="min-h-screen bg-gradient-to-tr bg-white flex relative overflow-hidden">
      {/* routes */}
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated && user?.status === "active" ? (
              <Navigate to="/user-dashboard?tab=dash" replace />
            ) : (
              <HomePage />
            )
          }
        />
        <Route
          path="/login"
          element={
            isAuthenticated && user?.status === "active" ? (
              <Navigate to="/user-dashboard?tab=dash" replace />
            ) : (
              <LoginPage />
            )
          }
        />
        {/* protected routes */}
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        {/* private routes for only authenticated users */}

        <Route
          path="/reset-password"
          element={
            <RedirectAuthenticatedUser>
              <PasswordResetPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/register"
          element={
            <RedirectAuthenticatedUser>
              <RegisterUser />
            </RedirectAuthenticatedUser>
          }
        />

        <Route
          path="/user-login"
          element={
            <RedirectAuthenticatedUser>
              <LoginPage />
            </RedirectAuthenticatedUser>
          }
        />

        {/* unprotected routes */}
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<AboutUsComponent />} />
        <Route path="/post/:slug" element={<PostDisplayPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/editorial" element={<EditorialPage />} />
        <Route path="/columns" element={<ColumnsPage />} />
        <Route path="/faqs" element={<FreqAskedQuestions />} />
        <Route path="/terms-of-use" element={<TermsofUsePage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
