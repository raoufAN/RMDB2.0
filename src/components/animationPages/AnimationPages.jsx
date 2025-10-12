import { motion as Motion } from "motion/react";
const AnimationPages = ({ children }) => {
  return (
    <Motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="w-full h-full">
      {children}
    </Motion.div>
  );
};

export default AnimationPages;
