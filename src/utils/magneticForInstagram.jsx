import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const MagneticForInstagram = ({ children }) => {
  const magnetic = useRef(null);

  useEffect(() => {
    // Use GSAP's quickTo for smoother transitions
    const xTo = gsap.quickTo(magnetic.current, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(magnetic.current, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    magnetic.current.addEventListener("mousemove", (e) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = magnetic.current.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);

      // Apply effect to the whole image area
      xTo(x * 2); // Adjust these values for finer control
      yTo(y * 2);
    });

    magnetic.current.addEventListener("mouseleave", () => {
      xTo(0);
      yTo(0);
    });
  }, []);

  // Ensure the wrapper component (motion.div) gets the ref
  return <div ref={magnetic}>{children}</div>;
};

export default MagneticForInstagram;