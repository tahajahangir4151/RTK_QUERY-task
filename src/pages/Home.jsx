import React from 'react'
import {motion} from "framer-motion"

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-gray-900 dark:text-white mb-4 text-center"
        >
          Explore GitHub
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-600 dark:text-gray-400 text-center mb-12"
        >
          Discover popular repositories and amazing projects
        </motion.p>
      </div>
    </div>
  );
}

export default Home
