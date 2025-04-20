import { FaGithub, FaLinkedin, FaGlobeAmericas } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      className="w-full py-6 px-4 md:px-[5rem] dark:bg-Dark-Mode-Elements bg-White shadow-inner mt-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <FaGlobeAmericas className="text-blue-500" />
          <p className="text-sm dark:text-gray-300">
            Created by <span className="font-semibold">Bhuvnesh Upadhyay</span> | Frontend
            Mentor Challenge
          </p>
        </div>

        <div className="flex gap-4">
          <motion.a
            href="https://github.com/bhuvi819381"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            aria-label="GitHub"
          >
            <FaGithub size={20} />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/bhuvi819381"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            whileHover={{ scale: 1.2, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
            aria-label="LinkedIn"
          >
            <FaLinkedin size={20} />
          </motion.a>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
