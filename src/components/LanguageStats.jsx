import React from "react";
import {motion} from "framer-motion"

const LanguageStats = ({languages})=>{
return (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
      Languages
    </h3>
    <div className="space-y-3">
      {languages.map((lang, index) => (
        <motion.div
          key={lang.name}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="relative"
        >
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {lang.name}
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {lang.percentage.toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <motion.div
              className="h-2.5 rounded-full"
              style={{ backgroundColor: lang.color }}
              initial={{ width: 0 }}
              animate={{ width: `${lang.percentage}%` }}
              transition={{ duration: 1, delay: index * 0.1 }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);
}

export default LanguageStats