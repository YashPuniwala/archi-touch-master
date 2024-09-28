import { motion, useMotionValue } from "framer-motion";
import "./plusSignCursor.css";
import { useEffect, useState } from "react";

const PlusSignCursor = () => {
  const cursorSize = 20;

  // State to manage the delayed mouse position
  const [delayedMouse, setDelayedMouse] = useState({ x: 0, y: 0 });

  // Motion values for smooth animation
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const manageMouseMove = (e) => {
    const { clientX, clientY } = e;

    // Use requestAnimationFrame for smoother updates
    requestAnimationFrame(() => {
      setDelayedMouse({
        x: clientX - cursorSize / 2,
        y: clientY - cursorSize / 2
      });
    });
  };

  useEffect(() => {
    window.addEventListener("mousemove", manageMouseMove);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("mousemove", manageMouseMove);
    };
  }, []);

  // Update the motion values when delayedMouse changes
  useEffect(() => {
    mouseX.set(delayedMouse.x);
    mouseY.set(delayedMouse.y);
  }, [delayedMouse.x, delayedMouse.y, mouseX, mouseY]);

  return (
    <motion.div
      className="cursor"
      style={{
        left: mouseX,
        top: mouseY
      }}
    >
      <span className="plus-sign text-4xl">+</span>
    </motion.div>
  );
};

export default PlusSignCursor;
