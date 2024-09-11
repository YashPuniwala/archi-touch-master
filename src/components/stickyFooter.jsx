import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Magnetic from "../utils/magnetic";
import Content from "./content";

// Texts that will cycle through
const textArray = [
  "Interior Design",
  "Amazing Residential",
  "City Marks",
  "NEW DESIGN?",
];

const BoxItem = ({ text, widths, heights }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      className="box-item-wrapper"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div
        className={`relative flex justify-center items-center overflow-hidden rounded-full border transition-all duration-500 ${
          isHovered
            ? "bg-white text-black border-black"
            : "bg-transparent text-white border-white"
        } ${widths} ${heights}`}
      >
        {/* First Text Animation */}
        <button
          className="absolute flex items-center justify-center text-base sm:text-base md:text-lg lg:text-lg transition-transform duration-500"
          style={{
            transform: isHovered ? "translateY(-100%)" : "translateY(0)",
          }}
        >
          {text}
        </button>
        {/* Second Text Animation */}
        <button
          className="absolute flex items-center justify-center text-base sm:text-base md:text-lg lg:text-lg transition-transform duration-500"
          style={{
            transform: isHovered ? "translateY(0)" : "translateY(100%)",
          }}
        >
          {text}
        </button>
      </div>
    </motion.div>
  );
};

const StickyFooter = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    // Typing effect logic
    if (isTyping) {
      const currentText = textArray[currentIndex];
      const typingInterval = setInterval(() => {
        setDisplayText((prev) => {
          if (prev.length < currentText.length) {
            return currentText.slice(0, prev.length + 1);
          } else {
            clearInterval(typingInterval);
            return currentText;
          }
        });
      }, 100);

      return () => clearInterval(typingInterval);
    } else {
      const eraseInterval = setInterval(() => {
        setDisplayText((prev) => {
          if (prev.length > 0) {
            return prev.slice(0, prev.length - 1);
          } else {
            clearInterval(eraseInterval);
            setIsTyping(true);
            return "";
          }
        });
      }, 50);

      return () => clearInterval(eraseInterval);
    }
  }, [isTyping, currentIndex]);

  useEffect(() => {
    const changeTextInterval = setInterval(() => {
      setIsTyping(false);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % textArray.length);
    }, 5000);

    return () => clearInterval(changeTextInterval);
  }, []);

  return (
    <div
      className="relative h-[800px]"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="relative h-[calc(100vh+800px)] -top-[100vh]">
        <div className="h-[800px] sticky top-[calc(100vh-800px)]">
          <Content />
        </div>
      </div>
    </div>
  );
};

export default StickyFooter;
