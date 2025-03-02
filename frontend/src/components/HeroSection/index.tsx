import { motion } from "motion/react";

const HeroSection = () => {
  return (
    <div className="h-screen w-full bg-gradient-to-br from-neutral-600/80 via-black to-neutral-950 flex flex-col justify-center items-center text-center overflow-hidden">
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <div className="absolute w-80 h-80 bg-gradient-radial from-neutral-700 to-transparent rounded-full top-1/4 left-1/4 blur-2xl opacity-50"></div>
        <div className="absolute w-96 h-96 bg-gradient-radial from-neutral-800 to-transparent rounded-full bottom-1/4 right-1/4 blur-2xl opacity-50"></div>
      </motion.div>

      <motion.h1
        className="text-8xl bg-clip-text text-transparent bg-radial from-white from-50% to-neutral-950 to-95% font-bold  mb-8"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        Welcome to GraphQL Docs
      </motion.h1>

      <motion.p
        className="text-xl text-neutral-400 mb-12"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        Learn, Build, and Master GraphQL with Ease
      </motion.p>

      <motion.button
        className="px-8 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        Get Started
      </motion.button>
    </div>
  );
};

export default HeroSection;
