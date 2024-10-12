import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Magnetic from "../utils/magnetic";

const NavbarWithBackground = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState({
    isActive: false,
    index: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (path) => {
    // Close the menu and reset selected link state
    setSelectedLink({ isActive: false, index: 0 });
    
    // Navigate to the new path immediately
    navigate(path);
  
    // Start the black screen animation after the page changes
    setTimeout(() => {
      setIsMenuOpen(false); // Close the menu
    }, 600); // Adjust the timing as needed
  };


  const links = [
    { title: "Home", path: "/" },
    { title: "About Us", path: "/aboutUs" },
    { title: "Projects", path: "/projects" },
    { title: "Contact Us", path: "/contact" },
  ];

  const linkVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div>
      <AnimatePresence mode="wait">
          <motion.div
            className="fixed top-0 left-0 w-full bg-navbar-second-color-white text-black shadow-md z-50"
            initial={{ height: 0 }}
            animate={{ height: "65px" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="flex justify-between items-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-2xl font-bold">Tyler Karu</h1>
              <div className="hidden lg:flex space-x-4 gap-7">
                {links.map((link, index) => (
                  <Magnetic>
                    <div>
                    <Link
                      key={index}
                      to={link.path}
                      className="text-lg font-medium hover:transform hover:scale-105 transition-transform duration-300"
                    >
                      {link.title}
                    </Link>
                    </div>
                  </Magnetic>
                ))}
              </div>
              <div className="lg:hidden flex items-center">
                <button
                  onClick={toggleMenu}
                  className="text-lg font-medium focus:outline-none"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                </button>
              </div>

              <div className="hidden lg:flex">
                <h2 className="text-xl font-semibold">Menu</h2>
              </div>
            </motion.div>
          </motion.div>
          </AnimatePresence>
      
      <motion.div
        initial={{ height: "0%" }}
        animate={{ height: isMenuOpen ? "100vh" : "0%" }}
        transition={{
          duration: 0.5,
          ease: [0.76, 0, 0.24, 1],
          delay: isMenuOpen ? 0 : 0.6,
        }}
        className="lg:hidden fixed top-0 left-0 w-full bg-black text-white flex flex-col justify-center items-center overflow-hidden z-50"
      >
        <motion.nav
          initial="hidden"
          animate={isMenuOpen ? "visible" : "hidden"}
          variants={{
            visible: {
              transition: { staggerChildren: 0.1, delayChildren: 0.6 },
            },
            hidden: {
              transition: { staggerChildren: 0.1, staggerDirection: -1 },
            },
          }}
        >
          {links.map((link, index) => (
            <motion.p
              key={index}
              onClick={() => handleNavigation(link.path)}
              onMouseOver={() => setSelectedLink({ isActive: true, index })}
              onMouseLeave={() => setSelectedLink({ isActive: false, index })}
              variants={linkVariants}
              className="cursor-pointer text-2xl my-5"
            >
              {link.title}
            </motion.p>
          ))}
        </motion.nav>
      </motion.div>
    </div>
  );
};

export default NavbarWithBackground;