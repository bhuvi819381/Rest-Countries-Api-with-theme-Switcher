import { motion } from "framer-motion";

const shimmer = {
  hidden: { backgroundPosition: "-200% 0" },
  visible: {
    backgroundPosition: "200% 0",
    transition: {
      repeat: Infinity,
      duration: 1.5,
      ease: "linear",
    },
  },
};

const SkeletonCard = () => {
  return (
    <motion.div
      className="w-full max-w-[280px] h-[380px] dark:bg-Dark-Mode-Elements bg-White rounded-lg overflow-hidden shadow-md relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Shimmer overlay */}
      <motion.div
        className="absolute inset-0 z-10 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        variants={shimmer}
        initial="hidden"
        animate="visible"
      />

      {/* Card content */}
      <div className="h-[160px] bg-gray-200 dark:bg-gray-700" />
      <div className="p-6">
        <div className="h-7 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
        <div className="space-y-3">
          <div className="h-5 w-full bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-5 w-2/3 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-5 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
        <div className="mt-6 flex justify-center">
          <div className="h-6 w-1/2 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      </div>
    </motion.div>
  );
};

export default SkeletonCard;
