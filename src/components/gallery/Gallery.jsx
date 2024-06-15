import { useRef, useEffect } from "react";
import "./gallery.css";
import Transition from "../../components/transition/Transition";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import Marquee from "react-fast-marquee";
import MagneticButton from "../../components/magneticbutton/MagneticButton";

import ProjectImg1 from "../../assets/images/projects/project-1.jpg";
import ProjectImg2 from "../../assets/images/projects/project-2.jpg";
import ProjectImg3 from "../../assets/images/projects/project-3.jpg";
import ProjectImg4 from "../../assets/images/projects/project-4.jpg";
import ProjectImg5 from "../../assets/images/projects/project-5.jpg";

const Gallery = () => {
  const workCopyReveal = useRef();
  // 4 Text Effect => workCopyReveal
  useEffect(() => {
    workCopyReveal.current = gsap.timeline({ paused: true }).to("h1", {
      top: "0",
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      delay: 0.35,
    });

    workCopyReveal.current.play();
  }, []);

  const projectPreivewImages = [
    ProjectImg1,
    ProjectImg2,
    ProjectImg3,
    ProjectImg4,
    ProjectImg5,
  ];

  let lastHoveredIndex = null;
  const projectPreviewContainer = document.querySelector(".project-preview");

  const handleResetPreivew = () => {
    const projectPreviewContainer = document.querySelector(".project-preview");

    gsap.to(".project-preview img", {
      opacity: 0,
      duration: 0,
      onComplete: () => {
        lastHoveredIndex = -1;
      },
    });
  };

  const handleMouseOver = (index) => {
    const projectPreviewContainer = document.querySelector(".project-preview");

    if (index !== lastHoveredIndex) {
      console.log(`Hovered ${index}`);

      const img = document.createElement("img");
      img.src = projectPreivewImages[index - 1];
      projectPreviewContainer.appendChild(img);

      gsap.to(img, {
        opacity: 1,
        duration: 0.3,
        onComplete: () => {
          const allPrevImages = projectPreviewContainer.querySelectorAll("img");

          if (allPrevImages.length > 1) {
            Array.from(allPrevImages)
              .slice(0, -1)
              .forEach((img) => {
                setTimeout(() => {
                  img.remove();
                }, 1000);
              });
          }
        },
      });

      lastHoveredIndex = index;
    }
  };

  useEffect(() => {
    const projectPreviewContainer = document.querySelector(".project-preview");
    const projectItems = document.querySelectorAll(".project-item");

    projectItems.forEach((projectItem, index) => {
      projectItem.addEventListener("mouseover", () =>
        handleMouseOver(index + 1)
      );
    });

    return () => {
      projectItems.forEach((projectItem) => {
        projectItem.removeEventListener("mouseover", () =>
          handleMouseOver(index + 1)
        );
      });
    };
  }, []);

  return (
    <>
      <div className="works-page">
        <div className="project-preview"></div>
        <div className="container">
          <section
            className="works-hero"
            onMouseOver={() => {
              handleResetPreivew();
            }}
          >
            <div className="work-copy-wrapper">
              <h1>Edith/Lover</h1>
            </div>
            <div className="work-copy-wrapper">
              <h3>2018 • 2021</h3>
            </div>
          </section>

          <section className="project-list">
            <div className="project-list-row">
              <div className="project-list-col">
                <div
                  className="project-item"
                  onMouseOver={() => handleMouseOver(1)}
                >
                  <div className="project-img">
                    <Link to="/sample-project">
                      <img src={ProjectImg1} alt="" />
                    </Link>
                  </div>
                  <div className="project-copy copy-pos-right">
                    <h2>Blisscove '24</h2>
                  </div>
                </div>
              </div>
              <div className="project-list-col whitespace-col"></div>
            </div>
          </section>

          <div
            className="works-marquee"
            onMouseOver={() => {
              handleResetPreivew();
            }}
          >
            <Marquee>
              <h1>
                test1 test1 test1, test1 test1 test1 adipisicing elit. Vitae,
              </h1>
            </Marquee>
          </div>
        </div>
      </div>
    </>
  );
};

export default Gallery;
