import React from "react";
import { Folder, File, ChevronRight, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const FileExplorer = ({ files, currentPath, onFileClick, onFolderClick }) => {
  const navigate = useNavigate();
  const sortedFiles = [...files].sort((a, b) => {
    if (a.type === b.type) return a.name.localeCompare(b.name);
    return a.type === "dir" ? -1 : 1;
  });

  const handleBack = () => {
    if (currentPath) {
      const newPath = currentPath.split("/").slice(0, -1).join("/");
      onFolderClick(newPath);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
      <div className="mb-4">
        <button
          onClick={handleBack}
          className="flex items-center text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 mb-2"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back
        </button>
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <span>Path: </span>
          {currentPath.split("/").map((part, index, array) => (
            <React.Fragment key={index}>
              {index > 0 && <ChevronRight className="w-4 h-4 mx-1" />}
              <button
                onClick={() =>
                  onFolderClick(array.slice(0, index + 1).join("/"))
                }
                className="hover:text-blue-500 dark:hover:text-blue-400"
              >
                {part || "root"}
              </button>
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        {sortedFiles.map((file) => (
          <motion.div
            key={file.path}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ x: 10 }}
            className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
            onClick={() =>
              file.type === "dir" ? onFolderClick(file.path) : onFileClick(file)
            }
          >
            {file.type === "dir" ? (
              <Folder className="w-5 h-5 mr-2 text-yellow-500" />
            ) : (
              <File className="w-5 h-5 mr-2 text-blue-500" />
            )}
            <span className="text-gray-700 dark:text-gray-300">
              {file.name}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FileExplorer;
