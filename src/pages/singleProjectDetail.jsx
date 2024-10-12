import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Facebook, Twitter } from "lucide-react";
import { useParams } from "react-router-dom";
import { singleProjectsData } from "../data/singleProjectsData";
import LeftSideStick from "../components/projectDetail/leftSideStick";

const ScandiSerenity = () => {
  const { id } = useParams(); // Get project ID from the URL
  const [project, setProject] = useState(null);

  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredTitle, setIsHoveredTitle] = useState(false);
  const [randomProject, setRandomProject] = useState(null);

  useEffect(() => {
    // Simulate API call by finding the project based on ID
    const foundProject = singleProjectsData.find((p) => p.id === parseInt(id));
    setProject(foundProject);
    
    // Get a random project that is not the current one
    const availableProjects = singleProjectsData.filter(p => p.id !== foundProject.id);
    const randomIndex = Math.floor(Math.random() * availableProjects.length);
    setRandomProject(availableProjects[randomIndex]);
  }, [id]);

  console.log(project?.title, "singleProjectsData.id");

  return (
    <div className="relative mb-[3rem]">
      <div
        className="relative w-full mx-auto h-[70vh] sm:[150vh] md:h-[75vh] lg:h-[85vh] bg-cover bg-bottom"
        style={{
          backgroundImage:
            `url(${project?.mainHeaderImage})`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </div>

      {/* Consultation Section */}
      <div className="relative w-[95%] lg:w-[90%] mx-auto bg-white py-10 px-4 sm:px-8 rounded-lg border border-gray-300 -mt-32 z-10 sm:-mt-40 lg:-mt-40 custom-singleProjectDetail-rightImage:w-[85%]">
        <div className="px-0 py-0 md:px-6 md:py-2">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Left content */}
            <div className="lg:w-2/3 flex flex-col justify-between h-full">
              {/* Top: ART DECO and Date */}
              <div>
                <div className="flex items-center mb-4">
                  <span className="text-base font-semibold text-gray-500">
                    ARCHI TOUCH
                  </span>
                  <span className="mx-6 text-gray-300">—</span>
                  <span className="text-base text-gray-500">
                    APRIL 15, 2022
                  </span>
                </div>

                {/* Title and content */}
                <motion.h1
                  className="text-4xl sm:text-5xl font-bold mb-6"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  {project?.title}
                </motion.h1>
                <motion.p
                  className="text-gray-600 mb-8"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  {project?.description}
                </motion.p>
              </div>

              {/* Bottom: Share Section */}
              <div className="flex justify-between items-center mt-4 sm:mt-12">
                <span className="font-semibold text-base">SHARE ON:</span>
                <div className="flex space-x-4">
                  <motion.button
                    className="p-2 bg-black rounded-full"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Facebook size={25} color="white" />
                  </motion.button>
                  <motion.button
                    className="p-2 bg-black rounded-full"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <Twitter size={25} color="white" />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Side Image and "You May Also Like" section */}
            <div
              className="lg:w-[53.333333%] flex flex-col"
              onMouseEnter={() => setIsHoveredTitle(true)}
              onMouseLeave={() => setIsHoveredTitle(false)}
            >
              <div className="flex-grow relative h-full overflow-hidden hover:cursor-pointer">
                {/* Image */}
                <motion.img
                  src="https://cdn.prod.website-files.com/66680ca683883f060b42340f/666ff036c42c74da3f142332_Banner-9.jpg"
                  alt="Modern Elegance"
                  className="w-full h-[300px] sm:h-[500px] lg:h-full object-cover rounded-lg shadow-lg"
                  whileHover={{ scale: 1.1 }} // Increase the scale slightly
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />

                {/* Overlay Box with Text */}
                <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg p-4 flex justify-between items-center">
                  <div className="w-full">
                    <span className="text-xs text-gray-500 font-semibold block">
                      YOU MAY ALSO LIKE IT
                    </span>

                    <div className="relative overflow-hidden h-[30px] w-full">
                      {/* Title - First instance */}
                      <h2
                        className="text-xl md:text-xl lg:text-xl font-bold absolute w-full text-left transition-transform duration-500 ease-in-out"
                        style={{
                          transform: isHoveredTitle
                            ? "translateY(-140%)"
                            : "translateY(0)",
                        }}
                      >
                        {randomProject?.title} {/* Display random project title */}
                      </h2>

                      {/* Title - Second instance */}
                      <h2
                        className="text-xl md:text-xl lg:text-xl font-bold absolute w-full text-left transition-transform duration-500 ease-in-out"
                        style={{
                          transform: isHoveredTitle
                            ? "translateY(0)"
                            : "translateY(140%)",
                        }}
                      >
                        {randomProject?.title} {/* Display random project title */}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 md:mt-10">
        <LeftSideStick project={project}/>
      </div>
    </div>
  );
};

export default ScandiSerenity;
