"use client";
import FileUploader from "@/components/FileUploader";
import MediaUploader from "@/components/MediaUploader";
import MessagePreview from "@/components/MessagePreview";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [sheetData, setSheetData] = useState<any[]>([]);
  const [template, setTemplate] = useState("Hi {{Name}}, your session is at {{Time}}.");
  const [mediaLink, setMediaLink] = useState("");

  // Animation variants for staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.main
      className="max-w-5xl mx-auto p-6 min-h-screen bg-gradient-to-b from-gray-50 to-gray-100"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1
        className="text-3xl font-bold text-center mb-8 text-gray-800 flex items-center justify-center gap-2"
        variants={itemVariants}
      >
        <span className="text-green-500">📤</span> ShoutSync - WhatsApp Bulk Sender
      </motion.h1>

      <motion.div
        className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-200"
        variants={itemVariants}
      >
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Step 1: Upload Excel File</h2>
        <FileUploader onDataLoaded={setSheetData} />
      </motion.div>

      <motion.div
        className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-200"
        variants={itemVariants}
      >
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Step 2: Message Template</h2>
        <textarea
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
          rows={4}
          value={template}
          onChange={(e) => setTemplate(e.target.value)}
          placeholder="Hi {{Name}}, your session is at {{Time}}."
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <MediaUploader onMediaLink={setMediaLink} />
      </motion.div>

      {sheetData.length > 0 && (
        <motion.div
          className="bg-white rounded-xl shadow-lg p-6 mt-6 border border-gray-200"
          variants={itemVariants}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Step 3: Preview & Send</h2>
          <MessagePreview data={sheetData} template={template} mediaLink={mediaLink} />
        </motion.div>
      )}
    </motion.main>
  );
}