import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { githubApi } from "../store/services/githubApi";
import { motion } from "framer-motion";
import FileExplorer from "../components/FileExplorer";
import CodeViewer from "../components/CodeViewer";
import LanguageStats from "../components/LanguageStats";
import { getLanguageColor } from "../utils/languageColors";

const RepoDetails = () => {
  const { owner, name } = useParams();
  const [currentPath, setCurrentPath] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  //Get Single Repo
  const { data: repo } = githubApi.useGetRepositoryQuery(`${owner}/${name}`);
  console.log(repo);

  //Get Repo Content
  const { data: contents } = githubApi.useGetContentsQuery(
    { owner, repo: name, path: currentPath },
    { skip: !owner || !name }
  );
  console.log(contents);

  //Get File Content
  const { data: fileContent } = githubApi.useGetFileContentQuery(
    { owner, repo: name, path: selectedFile?.path || "" },
    { skip: !selectedFile }
  );
  console.log(fileContent);

  //Get Repo Lanugages
  const { data: languages } = githubApi.useGetLanguagesQuery(
    { owner, repo: name },
    { skip: !owner || !name }
  );
  console.log(languages);

  const handleFileClick = (file) => {
    setSelectedFile(file);
  };

  const handleFolderClick = (path) => {
    setCurrentPath(path);
    setSelectedFile(null);
  };

  if (!repo || !contents) return null;

  const languageStats = languages
    ? Object.entries(languages)
        .map(([name, bytes]) => ({
          name,
          percentage:
            (bytes / Object.values(languages).reduce((a, b) => a + b, 0)) * 100,
          color: getLanguageColor(name),
        }))
        .sort((a, b) => b.percentage - a.percentage)
    : [];
  console.log(languageStats);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {repo.full_name}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">{repo.description}</p>
      </motion.div>

      {languageStats.length > 0 && (
        <div className="mb-8">
          <LanguageStats languages={languageStats} />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <FileExplorer
          files={contents}
          currentPath={currentPath}
          onFileClick={handleFileClick}
          onFolderClick={handleFolderClick}
        />

        {selectedFile && fileContent && (
          <CodeViewer
            content={atob(fileContent.content || "")}
            language={selectedFile.name.split(".").pop() || "text"}
            fileName={selectedFile.name}
            downloadUrl={selectedFile.download_url}
          />
        )}
      </div>
    </motion.div>
  );
};

export default RepoDetails;
