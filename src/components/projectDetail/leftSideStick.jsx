import React, { useRef, useEffect, useState, useCallback } from "react";
import {
  useAnimation,
  useInView,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import "./leftSideStick.css";

const WorkStage = ({ stage, isActive, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const backgroundVariants = {
    initial: { opacity: 0 },
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  return (
    <motion.div
      className={`relative py-4 px-4 border-y border-black cursor-pointer overflow-hidden ${
        isActive ? "bg-[#D8D2C2] text-black" : ""
      }`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => onClick(stage)}
    >
      <span className="relative z-10">{stage}</span>
      <motion.div
        className="absolute inset-0 bg-[#D8D2C2]"
        initial="initial"
        animate={isHovered || isActive ? "visible" : "hidden"}
        variants={backgroundVariants}
        transition={{ duration: 0.6 }}
      />
    </motion.div>
  );
};


const Story = ({project}) => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const exploreProjectsRef = useRef(null);
  const repeatedTextRef = useRef(null);

  const inspirationRef = useRef(null);
  const planningRef = useRef(null);
  const executionRef = useRef(null);
  const transformationRef = useRef(null);

  const [activeStage, setActiveStage] = useState("INSPIRATION");

  const controls = useAnimation();
  const exploreProjectsControls = useAnimation();

  const isSectionInView = useInView(sectionRef, { once: true });
  const isExploreProjectsInView = useInView(exploreProjectsRef, {
    threshold: 0.5,
  });
  const isRepeatedTextInView = useInView(repeatedTextRef, { threshold: 0.1 });

  const [isHoveredTitle, setIsHoveredTitle] = useState(false);

  useEffect(() => {
    if (isSectionInView) {
      controls.start("visible");
    }
  }, [isSectionInView, controls]);

  useEffect(() => {
    // Get the current screen width
    const screenWidth = window.innerWidth;

    if (isRepeatedTextInView && screenWidth >= 935) {
      // Adjusted logic here
      exploreProjectsControls.start({
        opacity: 0,
        transition: { duration: 0.5 },
      });
    } else {
      exploreProjectsControls.start({
        opacity: 1,
        transition: { duration: 0.5 },
      });
    }
  }, [isRepeatedTextInView, exploreProjectsControls]);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;

    if (!section || !title) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          title.classList.add("stickys");
        } else {
          title.classList.remove("stickys");
        }
      },
      { threshold: 0.1, rootMargin: `-${section.offsetHeight}px 0px 0px 0px` }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const textVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  // const x = useMotionValue(0);
  // const y = useMotionValue(0);

  // const mouseXSpring = useSpring(x);
  // const mouseYSpring = useSpring(y);

  // const rotateX = useTransform(
  //   mouseYSpring,
  //   [-0.5, 0.5],
  //   ["17.5deg", "-17.5deg"]
  // );

  // const handleMouseMove = (e) => {
  //   const rect = e.target.getBoundingClientRect(); // Correct method name
  //   const width = rect.width;
  //   const height = rect.height;

  //   const mouseX = e.clientX - rect.left;
  //   const mouseY = e.clientY - rect.top;

  //   const xPct = mouseX / width - 0.5;
  //   const yPct = mouseY / height - 0.5;

  //   x.set(xPct);
  //   y.set(yPct);

  //   console.log(xPct);
  // };

  const [isHovered, setIsHovered] = useState(false);

  // Create motion values for mouse position
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Define transformations based on mouse position
  const rotateX = useTransform(mouseY, [0, 1], [15, -15]);
  const rotateY = useTransform(mouseX, [0, 1], [-15, 15]);

  // Create smooth spring transition for hover effect
  const springRotateX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 150, damping: 20 });

  // Mouse move handler to update motion values
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleStageClick = useCallback((stage) => {
    setActiveStage(stage);
    const refs = {
      INSPIRATION: inspirationRef,
      PLANNING: planningRef,
      EXECUTION: executionRef,
      TRANSFORMATION: transformationRef,
    };

    const ref = refs[stage];
    if (ref && ref.current) {
      // Use scrollIntoView with smooth behavior
      ref.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest'
      });
      
      // Adjust scroll position to account for any fixed headers
      setTimeout(() => {
        const yOffset = -90; // Adjust this value based on your header height
        const y = ref.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }, 100); // Small delay to ensure scrollIntoView has completed
    }
  }, [inspirationRef, planningRef, executionRef, transformationRef]);

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY + 100; // Adjust for offset
    const sections = [
      { ref: inspirationRef, stage: "INSPIRATION" },
      { ref: planningRef, stage: "PLANNING" },
      { ref: executionRef, stage: "EXECUTION" },
      { ref: transformationRef, stage: "TRANSFORMATION" },
    ];

    for (let i = sections.length - 1; i >= 0; i--) {
      const { ref, stage } = sections[i];
      if (ref.current && scrollPosition >= ref.current.offsetTop) {
        setActiveStage(stage);
        break;
      }
    }
  }, [inspirationRef, planningRef, executionRef, transformationRef]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);


  return (
    <div
      className="container max-w-7xl mx-auto px-4 py-8 lg:py-16 lg:px-16 flex items-center justify-center"
      ref={sectionRef}
    >
      <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-8">
      {/* Left Side (Text Section) */}
      <motion.div
          className="w-full lg:w-1/3 flex flex-col justify-start"
          initial="hidden"
          ref={titleRef}
          animate={controls}
          variants={textVariants}
        >
          <h2 className="text-lg mb-8">WORK STAGES</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-1 gap-x-4">
            {["INSPIRATION", "PLANNING", "EXECUTION", "TRANSFORMATION"].map((stage) => (
              <WorkStage
                key={stage}
                stage={stage}
                isActive={activeStage === stage}
                onClick={handleStageClick}
              />
            ))}
          </div>
          <div className="space-y-4 mt-12 sm:mt-14">
            {[
              { label: "Client", value: "House Magazine" },
              { label: "Date", value: "June, 2022" },
              { label: "Services", value: "Interior Design" },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between">
                <span className="font-semibold text-black">{label}</span>
                <span className="text-gray-700">{value}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center space-x-6 mt-6">
            {["X", "F", "@"].map((icon) => (
              <button key={icon} className="w-10 h-10 flex items-center justify-center border border-black rounded-full">
                <span className="text-lg">{icon}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Right Side (Image Section) */}
        <div className="w-full lg:w-2/3 mt-8 lg:mt-0 flex flex-col px-2 sm:px-4 justify-center">
          <h2 className="text-base sm:text-lg font-medium mb-4" ref={inspirationRef}>
            INSPIRATION BEHIND OUR INTERIOR DESIGN CONCEPT
          </h2>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Transforming Visions Into Reality
          </h1>
          <p className="text-base sm:text-lg mb-4">
            Our design process begins with understanding the inspiration that
            drives each project. At Decor, we recognize that every space tells a
            story, and it's our job to bring that story to life. In this phase,
            our designers collaborate closely with you to capture your ideas,
            aesthetic preferences, and lifestyle needs. Through mood boards,
            color palettes, and material selections, we ensure that the final
            design not only reflects your personality but also creates a
            cohesive and inviting environment.
          </p>
          <motion.div
            className="relative h-96 w-full mb-16"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
              setIsHovered(false);
              mouseX.set(0.5);
              mouseY.set(0.5);
            }}
            style={{
              perspective: "1000px",
              transformStyle: "preserve-3d",
            }}
          >
            <motion.div
              className="w-full h-full"
              style={{
                rotateX: springRotateX,
                rotateY: springRotateY,
              }}
            >
              <motion.img
                src={project?.firstImage}
                alt="Interior Design Example"
                className="w-full h-full object-cover rounded-lg"
                style={{
                  aspectRatio: "1 / 1", // Ensure the image is square
                }}
              />
              <motion.div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50 pointer-events-none rounded-lg" />
            </motion.div>
          </motion.div>

          <div ref={planningRef}>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              Modern Living Spaces - Interior Design Planning
            </h1>

            <p className="text-base sm:text-lg mb-4">
            In the "Modern Living Spaces" project, our planning phase was
              crucial to laying the groundwork for a successful design. We began
              by thoroughly understanding the client’s vision and lifestyle
              requirements. Our team conducted comprehensive site analyses to
              assess the existing space and identify opportunities for
              enhancement. Utilizing our expertise, we developed detailed
              layouts that maximized both functionality and aesthetics, ensuring
              a seamless flow between rooms.
            </p>

            <p className="text-base sm:text-lg mb-4">
            Our planning process included creating mood boards and selecting
              materials that resonate with the client's style. We ensured that
              every element contributed to a cohesive design narrative,
              balancing modern aesthetics with the practicality of everyday
              living. The result is a thoughtfully designed space that not only
              looks stunning but also enhances the overall living experience for
              the client.
            </p>

            {/* Two images side by side */}
            <div className="flex flex-col md:flex-row gap-4 mb-16">
              <img
                src={project?.secondImage}
                alt="Planning Example 1"
                className="w-full md:w-1/2 h-64 object-cover rounded-lg"
              />
              <img
                src={project?.thirdImage}
                alt="Planning Example 2"
                className="w-full md:w-1/2 h-64 object-cover rounded-lg"
              />
            </div>

            {/* Execution Design Section */}
            <div className="mb-20" ref={executionRef}>
              <h2 className="text-base sm:text-lg font-medium mb-4" >
                EXECUTION OF OUR INTERIOR DESIGN PROJECT
              </h2>
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                Bringing Designs to Life
              </h1>
              <p className="text-base sm:text-lg mb-4">
                The execution phase is where our carefully crafted designs take
                shape and become a reality. At Decor, we pride ourselves on our
                meticulous attention to detail and commitment to quality
                throughout the entire execution process. Our team of skilled
                craftsmen and contractors work collaboratively to ensure that
                every aspect of the design is implemented to perfection.
              </p>
              <p className="text-base sm:text-lg mb-4">
                During this phase, we manage all logistical aspects, from
                sourcing materials to coordinating timelines. We maintain
                constant communication with our clients, providing updates and
                ensuring that their vision is realized accurately. By focusing
                on precision and quality, we aim to deliver spaces that not only
                meet but exceed expectations.
              </p>
              <motion.div
                className="relative h-96 w-full mb-4"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => {
                  setIsHovered(false);
                  mouseX.set(0.5);
                  mouseY.set(0.5);
                }}
                style={{
                  perspective: "1000px",
                  transformStyle: "preserve-3d",
                }}
              >
                <motion.div
                  className="w-full h-full"
                  style={{
                    rotateX: springRotateX,
                    rotateY: springRotateY,
                  }}
                >
                  <motion.img
                    src={project?.fourthImage}
                    alt="Interior Design Execution Example"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <motion.div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50 pointer-events-none rounded-lg" />
                </motion.div>
              </motion.div>
            </div>


            <div>
              <h2 className="text-base sm:text-lg font-medium mb-4" ref={transformationRef}>
              FINAL TRANSFORMATION OF YOUR INTERIOR SPACE
              </h2>
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              Turning Concepts Into a Stunning Reality
              </h1>
              <p className="text-base sm:text-lg mb-4">
              In the final stage of our design process, the vision that has guided us from the start is transformed into a fully realized space. At Decor, we believe that every detail matters. This is where your ideas, style preferences, and functional needs come together in perfect harmony. From the installation of custom furnishings to the final touches of decor, we ensure that the result not only matches but exceeds your expectations. The completed design reflects the journey we’ve taken together—transforming your vision into a breathtaking reality that you can truly call home.

              </p>
              <p className="text-base sm:text-lg mb-6">
                During this phase, we manage all logistical aspects, from
                sourcing materials to coordinating timelines. We maintain
                constant communication with our clients, providing updates and
                ensuring that their vision is realized accurately. By focusing
                on precision and quality, we aim to deliver spaces that not only
                meet but exceed expectations.
              </p>
              <motion.div
                className="relative h-96 w-full mb-6"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => {
                  setIsHovered(false);
                  mouseX.set(0.5);
                  mouseY.set(0.5);
                }}
                style={{
                  perspective: "1000px",
                  transformStyle: "preserve-3d",
                }}
              >
                <motion.div
                  className="w-full h-full"
                  style={{
                    rotateX: springRotateX,
                    rotateY: springRotateY,
                  }}
                >
                  <motion.img
                    src={project?.fifthImage}
                    alt="Interior Design Execution Example"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <motion.div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50 pointer-events-none rounded-lg" />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Story;
