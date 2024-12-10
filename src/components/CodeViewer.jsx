import React from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/hljs";

const CodeViewer = ({ content, language, fileName, downloadUrl }) => {
  const isImage = /\.(jpg|jpeg|png|gif|svg|webp)$/i.test(fileName);

  const handleDownload = async () => {
    if (downloadUrl) {
      try {
        const response = await fetch(downloadUrl);
        console.log(response);
        const blob = await response.blob();
        console.log(blob);
        const url = window.URL.createObjectURL(blob);
        console.log(url);
        const a = document.createElement("a");
        a.href = url;
        console.log(a);
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } catch (error) {
        console.log("Download Failed:" + error);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
    >
      <div className="flex justify-between items-center px-4 py-2 bg-gray-100 dark:bg-gray-700">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {fileName}
        </span>
        {downloadUrl && (
          <button
            className="flex items-center px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
            onClick={handleDownload}
          >
            <Download className="w-4 h-4 mr-1" />
            Download
          </button>
        )}
      </div>
      <div className="p-4 overflow-x-auto">
        {isImage ? (
          <div className="flex justify-center">
            <img
              src={downloadUrl}
              alt={fileName}
              className="max-w-full h-auto rounded-lg"
              style={{ maxHeight: "600px" }}
            />
          </div>
        ) : (
          <SyntaxHighlighter
            language={language}
            style={tomorrow}
            customStyle={{
              margin: 0,
              borderRadius: "0.5rem",
              fontSize: "14px",
              backgroundColor: "transparent",
            }}
          >
            {content}
          </SyntaxHighlighter>
        )}
      </div>
    </motion.div>
  );
};

export default CodeViewer;
