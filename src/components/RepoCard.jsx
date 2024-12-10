import React from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { motion } from "framer-motion";
import { Clock, GitFork, Star } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const RepoCard = ({ repo, index }) => {
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.2,
    rootMargin: "50px",
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={
        isVisible
          ? {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.5,
                delay: index * 0.1,
              },
            }
          : {}
      }
      whileHover={{ scale: 1.05 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors duration-200 h-full flex flex-col"
    >
      <div className="flex  items-start justify-between">
        <div className="flex items-center">
          <img
            src={repo.owner.avatar_url}
            alt={repo.owner.login}
            className="w-12 h-12 rounded-full ring-2 ring-blue-500"
          />
          <div className="ml-3">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white line-clamp-1">
              {repo.name}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              by {repo.owner.login}
            </p>
          </div>
        </div>
      </div>{" "}
      <p className="mt-4 text-gray-600 dark:text-gray-300 line-clamp-2 flex-grow">
        {repo.description || "No description available"}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {repo.topics.slice(0, 3).map((topic) => (
          <span
            key={topic}
            className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900 text-gray-800 dark:text-gray-200"
          >
            {topic}
          </span>
        ))}
        {repo.topics.length > 3 && (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
            +{repo.topics.length - 3} more
          </span>
        )}
      </div>
      <div className="mt-6 flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center text-gray-600 dark:text-gray-400">
          <Star className="w-4 h-4 mr-1" />
          <span>{repo.stargazers_count.toLocaleString()}</span>
        </div>
        <div className="flex items-center text-gray-600 dark:text-gray-400">
          <GitFork className="w-4 h-4 mr-1" />
          <span>{repo.forks_count.toLocaleString()}</span>
        </div>
        <div className="flex items-center text-gray-600 dark:text-gray-400">
          <Clock className="w-4 h-4 mr-1" />
          <span>{formatDistanceToNow(new Date(repo.updated_at))} ago</span>
        </div>
      </div>
    </motion.div>
  );
};

export default RepoCard;
