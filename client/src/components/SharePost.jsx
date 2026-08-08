import { useState } from "react";
import { FaWhatsapp, FaShareAlt, FaCopy } from "react-icons/fa";

export default function SharePost({ post }) {
  const [copied, setCopied] = useState(false);

  const postUrl = `${window.location.origin}/post/${post.slug}`;

  const generateShareText = () => {
    const snippet = post.postContent
      ?.replace(/<[^>]+>/g, "") // remove HTML
      ?.slice(0, 140);

    return `*${post.postTitle}*

${snippet}...

Read more: ${postUrl}

Please share this with others who may benefit.`;
  };

  // Copy
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generateShareText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed");
    }
  };

  // Native Share
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.postTitle,
          text: generateShareText(),
          url: postUrl,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      handleCopy();
    }
  };

  // WhatsApp
  const handleWhatsApp = () => {
    const text = encodeURIComponent(generateShareText());
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  return (
    <div className="flex items-center gap-1 md:gap-3 text-sm">
      {/* Copy */}
      <button
        onClick={handleCopy}
        className="flex items-center gap-2 px-1 md:px-3 py-2 bg-white md:bg-gray-800 md:text-white rounded-lg hover:bg-gray-700 transition"
      >
        <FaCopy className="text-xl md:text-lg" />
        <span className="hidden md:inline">{copied ? "Copied!" : "Copy"}</span>
      </button>

      {/* Native Share */}
      <button
        onClick={handleNativeShare}
        className="flex items-center gap-2 px-1 md:px-3 py-2 bg-white md:bg-blue-600 text-blue-700 md:text-white rounded-lg hover:bg-blue-500 transition"
      >
        <FaShareAlt className="text-xl md:text-lg" />
        <span className="hidden md:inline">Share</span>
      </button>

      {/* WhatsApp */}
      <button
        onClick={handleWhatsApp}
        className="flex items-center gap-2 px-1 md:px-3 py-2 bg-white md:bg-green-600 text-green-700 md:text-white rounded-lg hover:bg-green-500 transition"
      >
        <FaWhatsapp className="text-xl md:text-lg" />
        <span className="hidden md:inline">WhatsApp</span>
      </button>
    </div>
  );
}
