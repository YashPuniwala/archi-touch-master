"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { FaInstagram } from "react-icons/fa";
import ImageSlider from "./imageSlider";
import "./followUs.css";
import Footer from "../footer";
import MagneticFramer from "../../utils/magneticFramer";
import Magnetic from "../../utils/magnetic";
import StickyFooter from "../stickyFooter";
import MagneticForInstagram from "../../utils/magneticForInstagram";

function FollowUs() {
  const firstText = useRef(null);
  const secondText = useRef(null);
  const slider = useRef(null);
  const imageRefs = useRef([]);
  const container = useRef(null);
  let xPercent = 0;

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const height = useTransform(scrollYProgress, [0, 0.9], [150, 0]);

  useEffect(() => {
    if (secondText.current) {
      gsap.set(secondText.current, {
        left: secondText.current.getBoundingClientRect().width,
      });
    }
    requestAnimationFrame(animate);
  }, []);

  const animate = () => {
    if (xPercent > 0) {
      xPercent = -100;
    }
    gsap.set(firstText.current, { xPercent: xPercent });
    gsap.set(secondText.current, { xPercent: xPercent });
    requestAnimationFrame(animate);
    xPercent += 0.1;
  };

  const images = [
    "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1478&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1505577058444-a3dab90d4253?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGludGVyaW9yJTIwZGVzaWdufGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1416772472542-01fdd961f986?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1673984588721-9be1d3c9d592?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1472504929007-6d7cd0ef7d50?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1429681601148-75510b2cef43?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  const handleRef = (el) => {
    if (el && !imageRefs.current.includes(el)) {
      imageRefs.current.push(el);
    }
  };

  return (
    <>
      <div ref={container} className="relative mb-[3rem]">
        {/* Header Section with Running Text */}
        <div
          className="relative w-[95%] mx-auto h-[100vh] sm:[150vh] md:h-[130vh] bg-cover bg-center rounded-lg"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative flex flex-col items-center justify-center h-full text-white text-center">
            {/* Running Text */}
            <div
              ref={slider}
              className="sliderContainer absolute bottom-10 w-full"
            >
              <div className="slider relative whitespace-nowrap overflow-hidden">
                <p
                  ref={firstText}
                  className="text-6xl sm:7xl md:text-9xl font-bold uppercase"
                >
                  Transform Your Space -
                </p>
                <p
                  ref={secondText}
                  className="text-6xl sm:7xl md:text-9xl font-bold uppercase"
                >
                  Transform Your Space -
                </p>
              </div>
            </div>

            {/* Regular Content */}
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mt-10 text-base max-w-[18rem] sm:max-w-lg"
            >
              Our expert designers provide personalized guidance to help bring
              your vision to life. We offer tailored design strategies,
              comprehensive planning, and professional advice.
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mt-8 px-6 py-3 bg-white text-black font-semibold rounded"
            >
              Contact Experts
            </motion.button>
          </div>
        </div>

        {/* <motion.div style={{ height }} className="circleContainer">
      <div className="circle"></div>
    </motion.div>
    <Footer /> */}

        {/* Consultation Section */}
        <div className="relative w-[89%] mx-auto bg-gray-50 py-10 px-4 rounded-lg border border-gray-300 -mt-16 z-10 sm:-mt-24 lg:-mt-16">
          <div className="bg-gray-50 p-0 md:p-5">
            <div className="flex flex-col md:flex-row gap-10">
              <div className="md:w-[64%]">
                <motion.h1
                  className="text-3xl sm:text-5xl lg:text-5xl font-bold mb-4"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  Unlock Your Dream Home: Free Expert Consultation!
                </motion.h1>
                <motion.p
                  className="text-gray-600"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  At Decor, we believe that every beautiful home starts with a
                  great conversation. That’s why we offer a complimentary first
                  consultation with our team of experienced interior design
                  experts. During this initial meeting, you’ll have the
                  opportunity to share your vision, preferences, and any
                  specific needs you have for your space.
                </motion.p>
              </div>
              <div className="md:w-1/3">
                <motion.h2
                  className="text-lg sm:text-lg font-semibold mb-4 heading-line"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  GET IN TOUCH
                </motion.h2>
                <form className="space-y-4">
                  <motion.button
                    className="w-full bg-black text-white py-2 px-4 rounded"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    SCHEDULE A CALL
                  </motion.button>
                  <motion.input
                    type="email"
                    placeholder="HEY.EXPERT@GMAIL.COM"
                    className="w-full border border-gray-300 p-2 rounded"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                  />
                  <motion.input
                    type="tel"
                    placeholder="+1 642 890 1519"
                    className="w-full border border-gray-300 p-2 rounded"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    viewport={{ once: true }}
                  />
                </form>
              </div>
            </div>

            {/* Follow Us Section */}
            <div className="mt-8 md:mt-20">
              <motion.h2
                className="text-lg sm:text-lg font-semibold mb-4 heading-line"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                Follow us on instagram
              </motion.h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
                {images.map((src, index) => (
                  <motion.div
                    className="relative group cursor-pointer"
                    key={index}
                    whileHover={{ scale: 1.05, rotate: 3 }}
                    transition={{ duration: 0.7 }}
                  >
                    <motion.img
                      ref={handleRef}
                      src={src}
                      alt={`Interior ${index + 1}`}
                      className="w-full h-44 object-cover rounded transition-transform duration-300 ease-in-out"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.7, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    />
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300 ease-in-out rounded"></div>
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ opacity: 0, y: 20 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7 }}
                    >
                       <MagneticForInstagram>
                      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white bg-opacity-20  border border-white">
                        <FaInstagram size={20} color="white" />
                      </div>
                    </MagneticForInstagram>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <motion.div style={{ height }} className="circleContainer">
        <div className="circle"></div>
      </motion.div>
    </>
  );
}

export default FollowUs;

// import React, { useRef, useState } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { motion } from "framer-motion";

// const images = [
//   {
//     default:
//       "https://images.unsplash.com/photo-1633174102592-33d2456834f5?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     hover:
//       "https://plus.unsplash.com/premium_photo-1661963540233-94097ba21f27?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   {
//     default:
//       "https://plus.unsplash.com/premium_photo-1661963540233-94097ba21f27?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     hover:
//       "https://plus.unsplash.com/premium_photo-1661963540233-94097ba21f27?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   // Add more images here...
// ];

// function MultipleItems() {
//   const sliderRef = useRef(null);
//   const [hoveredIndex, setHoveredIndex] = useState(null);

//   const settings = {
//     infinite: true,
//     speed: 500,
//     slidesToShow: 2.12,
//     slidesToScroll: 1,
//     arrows: false,
//     centerMode: true,
//     centerPadding: "4.5%",
//     responsive: [
//       {
//         breakpoint: 1440,
//         settings: {
//           slidesToShow: 2.12,
//           slidesToScroll: 1,
//           centerPadding: "4.5%",
//         },
//       },
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//           centerPadding: "10%",
//         },
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           centerPadding: "15%",
//         },
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           centerPadding: "5%",
//         },
//       },
//     ],
//   };

//   return (
//     <div className="slider-container mx-auto p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 bg-white">
//       <div className="mb-6 text-left px-4">
//         <p className="text-sm sm:text-base md:text-lg text-gray-500 font-semibold mb-2">
//           Transform Your Space: Expert Tips & Ideas
//         </p>
//         <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[2.8rem] text-gray-800 font-bold leading-tight">
//           Transform Your Home with Expert Advice:
//           <br className="hidden md:block" />
//           Discover Innovative Ideas and Practical Tips
//           <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-medium"></span>
//         </h1>
//       </div>
//       <div className="relative overflow-hidden">
//         <Slider ref={sliderRef} {...settings}>
//           {images.map((image, index) => (
//             <div
//               key={index}
//               className="relative flex-shrink-0 px-1 sm:px-2 md:px-3"
//               onMouseEnter={() => setHoveredIndex(index)}
//               onMouseLeave={() => setHoveredIndex(null)}
//             >
//               <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-[28rem] overflow-hidden">
//                 <motion.img
//                   src={image.default}
//                   alt={`Slide ${index}`}
//                   className="w-full h-full object-cover rounded-lg shadow-lg"
//                   // initial={{ scale: 1, translateY: 0 }}
//                   initial={{ scale: 1, transform: "translateZ(0px)", translateY: 0 }}
//                   animate={{
//                     scale: hoveredIndex === index ? 1.1 : 1,
//                     transform: hoveredIndex === index ? "translateZ(50px)" : "translateZ(0px)", translateY: hoveredIndex === index ? -10 : 0,

//                   }} // Zoom-in effect on hover
//                   transition={{ duration: 0.8 }}
//                 />
//                 <motion.img
//                   src={image.hover}
//                   alt={`Slide ${index}`}
//                   className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg"
//                   // initial={{ scale: 1, translateY: 100 }}
//                   initial={{ scale: 1, transform: "translateY(100%) translateZ(-50px)", translateY: 100 }}
//                   animate={{
//                     scale: hoveredIndex === index ? 1.1 : 1,
//                     transform: hoveredIndex === index ? "translateY(0%) translateZ(0px)" : "translateY(100%) translateZ(-50px)",
//                     translateY: hoveredIndex === index ? 0 : 100,
//                   }} // Zoom-out effect on hover
//                   transition={{ duration: 0.8 }}
//                 />
//               </div>
//             </div>
//           ))}
//         </Slider>
//         {/* Custom Arrow */}
//         <div className="flex justify-center mt-4 space-x-4">
//           <button
//             className="bg-white text-gray-700 border border-gray-300 p-2 sm:p-3 md:p-4 rounded-full shadow-md hover:bg-gray-100 flex items-center justify-center"
//             onClick={() => sliderRef.current.slickPrev()}
//           >
//             <span className="text-lg md:text-xl lg:text-2xl">&larr;</span>
//           </button>
//           <button
//             className="bg-white text-gray-700 border border-gray-300 p-2 sm:p-3 md:p-4 rounded-full shadow-md hover:bg-gray-100 flex items-center justify-center"
//             onClick={() => sliderRef.current.slickNext()}
//           >
//             <span className="text-lg md:text-xl lg:text-2xl">&rarr;</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MultipleItems;
