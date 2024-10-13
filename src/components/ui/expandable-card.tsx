import React, { useEffect, useId, useRef, useState, createContext } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { IconArrowNarrowLeft, IconArrowNarrowRight, IconX } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({
  onCardClose: () => {},
  currentIndex: 0,
});

export function ExpandableCardDemo() {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(null);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  const handleCardClose = (index: number) => {
    setActive(null);
    setCurrentIndex(index);
  };

  return (
    <CarouselContext.Provider value={{ onCardClose: handleCardClose, currentIndex }}>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-lg h-full w-full z-50"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 grid place-items-center z-[60] overflow-y-auto py-10">
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-5xl bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden my-auto"
            >
              <div className="relative">
                {/* <motion.div layoutId={`image-${active.title}-${id}`}>
                  <Image
                    priority
                    width={200}
                    height={200}
                    src={active.src}
                    alt={active.title}
                    className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                  />
                </motion.div> */}
                <button
                  className="absolute top-4 right-4 h-8 w-8 bg-black/50 dark:bg-white/50 rounded-full flex items-center justify-center"
                  onClick={() => setActive(null)}
                >
                  <IconX className="h-6 w-6 text-white dark:text-black" />
                </button>
              </div>
              <div className="p-4 md:p-10 max-h-[calc(100vh-80px)] overflow-y-auto">
                <motion.h3
                  layoutId={`title-${active.title}-${id}`}
                  className="text-2xl md:text-5xl font-semibold text-neutral-700 dark:text-white"
                >
                  {active.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${active.description}-${id}`}
                  className="text-neutral-600 dark:text-neutral-400 text-base mt-2"
                >
                  {active.description}
                </motion.p>
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-neutral-600 dark:text-neutral-400 text-base mt-8"
                >
                  {typeof active.content === "function" ? active.content() : active.content}
                </motion.div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      <Carousel
        items={cards.map((card, index) => (
          <Card key={card.title} card={card} index={index} setActive={setActive} id={id} />
        ))}
      />
    </CarouselContext.Provider>
  );
}

const Carousel = ({ items }: { items: JSX.Element[] }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full">
      <div
        className="flex w-full overflow-x-scroll overscroll-x-auto py-10 md:py-20 scroll-smooth [scrollbar-width:none]"
        ref={carouselRef}
        onScroll={checkScrollability}
      >
        <div className={cn("absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l")}></div>
        <div className={cn("flex flex-row justify-start gap-4 pl-4", "max-w-7xl mx-auto")}>
          {items.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 * index, ease: "easeOut" }}
              key={`card-${index}`}
              className="last:pr-[5%] md:last:pr-[33%] rounded-3xl"
            >
              {item}
            </motion.div>
          ))}
        </div>
      </div>
      <div className="flex justify-end gap-2 mr-10">
        <button
          className="relative z-40 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50"
          onClick={scrollLeft}
          disabled={!canScrollLeft}
        >
          <IconArrowNarrowLeft className="h-6 w-6 text-gray-500" />
        </button>
        <button
          className="relative z-40 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50"
          onClick={scrollRight}
          disabled={!canScrollRight}
        >
          <IconArrowNarrowRight className="h-6 w-6 text-gray-500" />
        </button>
      </div>
    </div>
  );
};

const Card = ({ card, setActive, id }: { card: (typeof cards)[number]; index: number; setActive: React.Dispatch<React.SetStateAction<(typeof cards)[number] | boolean | null>>; id: string }) => {
    return (
      <motion.div
        layoutId={`card-${card.title}-${id}`}
        onClick={() => setActive(card)}
        className="rounded-3xl bg-white dark:bg-neutral-900 h-auto w-56 md:w-96 overflow-hidden flex flex-col items-start justify-start relative z-10 shadow-md cursor-pointer"
      >
        <motion.div layoutId={`image-${card.title}-${id}`} className="w-full h-72 md:h-96 relative">
          <Image
            src={card.src}
            alt={card.title}
            fill
            className="object-cover"
          />
        </motion.div>
        <div className="p-4">
          <motion.h3
            layoutId={`title-${card.title}-${id}`}
            className="text-lg md:text-xl font-semibold text-neutral-800 dark:text-white"
          >
            {card.title}
          </motion.h3>
          <motion.p
            layoutId={`description-${card.title}-${id}`}
            className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 mt-1"
          >
            {card.description}
          </motion.p>
        </div>
      </motion.div>
    );
  };
  
const cards = [
    {
      description: "Principal, Global Health",
      title: "Daniel Okpare",
      src: "https://synergygroupcf.com/daniel-okpare.png",
      ctaText: "Visit",
      ctaLink: "https://ui.aceternity.com/templates",
      content: () => {
        return (
            <>
            <p>Daniel Okpare is a passionate global health professional with over 10 years of experience strengthening healthcare systems and expanding access to quality care across Africa and North America. He specializes in policy development, advocacy, strategies, data utilization, and program implementation.</p><br />

            <p>His career began as a research project manager at the Hospital for Special Surgery. Daniel currently works as a Community Healthcare Specialist at the NYC Department of Health (NYCDOH), where he supports research and policy planning on healthcare delivery, primary care and FQHC landscape, safety net access to healthcare services, preventive care, and other critical health services that address social determinants of health.</p><br />

            <p>Daniel is currently a member of the Strategy & Policy AI workgroup under the AI Taskforce at the NYCDOH. Prior to this, he co-coordinated the city's comprehensive health and operational strategy to provide critical services and support to newly-arrived asylum seekers.</p><br />

            <p>He also co-authored groundbreaking research illuminating trends and disparities in diabetes prevalence, outcomes, and care across NYC and spearheaded the planning of the health agency's mobile health clinic program to bring essential primary and preventive care services directly to NYC's most vulnerable communities.</p><br />

            <p>Daniel holds a Master of Public Health from New York University and a Bachelor's degree in Psychology from Hunter College in New York. He is a dedicated champion for the health and rights of marginalized communities.</p>

            </>
        );
      },
    },
    {
      description: "Senior Associate",
      title: "Dr. Adjoa Bucknor",
      src: "https://synergygroupcf.com/adjoa-bucknor.png",
      ctaText: "Visit",
      ctaLink: "https://ui.aceternity.com/templates",
      content: () => {
        return (
            <>
            <p>Dr. Adjoa Bucknor is a clinician and gynecologist by practice. Adjoa received her medical degree from the Albert Einstein College of Medicine, New York, and was a front-line worker during the COVID-19 pandemic.</p>
            <br />
            <p>Additionally, she completed her residency in Obstetrics and Gynecology from Mount Sinai Hospital, New York, where she previously served as an Assistant Program Director. With more than 7 years of diverse experience in Obstetrics/Gynecology, Dr. Adjoa Bucknor affiliates with Mount Sinai Hospital and cooperates with many other doctors and specialists in various medical groups, including Mount Sinai, Lenox Hill Hospital, and East Harlem Council for Human Services Inc.</p>
            <br />
            <p>As a Global Health Associate at Synergy Consulting, Adjoa supports clients by building their capabilities in several areas, including women’s health market access, due diligence/feasibility assessments, and stakeholder engagement. Her recommendations inform market launches for diagnostic and therapeutic products in Africa and New York.</p>
            <br />
            <p>Prior to joining Synergy Consulting, Adjoa garnered significant experience in working in various facets of the healthcare industry, both as a clinician and as a healthcare instructor. Her experience includes working as a Clinical Instructor in Obstetrics and Gynecology at the Mount Sinai Health System and as a resident gynecologist at Cohen Medical Practice in New York.</p>
            </>
        );
      },
    },
    {
      description: "Principal, Global Health",
      title: "Najim Pedro, MD",
      src: "https://synergygroupcf.com/najim-pedro.png",
      ctaText: "Visit",
      ctaLink: "https://ui.aceternity.com/templates",
      content: () => {
        return (
        <>
        <p>Najim Pedro, MD, MPH is an Associate Director of Regulatory Affairs & Accreditation in the Office of Quality and Safety at NYC Health and Hospitals | Kings County. He earned his medical degree from Lagos State University in Nigeria, followed by his MPH degree at New York University (NYU).</p>
        <br />
        <p>Najim co-founded OneDokita Healthcare Limited with the aim of increasing access to healthcare by staffing mobile clinics in remote areas in Nigeria. He then spent six years working in healthcare transformation and innovation in the ambulatory care setting in the US.</p>
        <br />
        <p>He currently serves as the Assistant Director of Ambulatory Care at Kings County Hospital and as the Interim Pediatric Program Lead for the integration of Community Health Worker Intervention into the ambulatory clinical wing of New York City Health & Hospitals, the nation’s largest municipal health system.</p>
        <br />
        <p>His passion for growth and leadership in both clinical operation and patient safety, along with his deep belief in healthcare innovation, led Najim to pursue a Master’s in Clinical Service Operation at Harvard Medical School.</p>

        </>
        );
      },
    },
    {
      description: "Managing Partners",
      title: "Will Jeudy",
      src: "https://synergygroupcf.com/will-jeudy.png",
      ctaText: "Visit",
      ctaLink: "https://ui.aceternity.com/templates",
      content: () => {
        return (
        <><p>Will Jeudy is an entrepreneur and a seasoned healthcare leader with expertise spanning financial planning and analysis, forecasting, GTM (Go-to-Market) strategy and planning, operations, performance improvement, and healthcare informatics. His track record showcases a consistent ability to achieve objectives within designated timeframes.</p>
        <br />
        <p>Furthermore, he boasts a strong grasp of healthcare applications and is proficient in utilizing technology. Prior to this, Will occupied significant roles, including serving as a senior financial and analytics manager at Memorial Sloan Kettering Cancer Center and working as a management consultant at Cope Health Solutions.</p>
        <br />
        <p>In these capacities, he has been instrumental in propelling growth and innovation by introducing high-caliber systems and processes, offering thought leadership, and establishing a world-class finance organization.</p>
        </>    
        );
      },
    },
   
    {
      description: "Managing Partners",
      title: "Benjamin Ogundele",
      src: "https://synergygroupcf.com/benjamin-ogundele.png",
      ctaText: "Visit",
      ctaLink: "https://ui.aceternity.com/templates",
      content: () => {
        return (
        <><p>Benjamin Ogundele is a seasoned public health professional with over five years of experience in healthcare data. He earned his Bachelor's degree in Biology from Montclair State University and holds a Master's in Public Health with a concentration in Epidemiology from St. George’s University.</p>
        <br />
        <p>Passionate about uplifting vulnerable communities, he dedicates his expertise to addressing health disparities and improving healthcare systems in the US and Africa. Benjamin's commitment is evident in his role at the New York State Department of Health's Office of Aging and Long-Term Care Services, where he employs evidence-based strategies to shape programs in Population and Environmental Health.</p>
        <br />
        <p>His diverse interests span Chronic Diseases, Microbiology, Epigenetics, Aging, Real Estate, Urban Development, and Lifestyle Medicine, providing a holistic approach to health initiatives.</p>
        </>
        );
      },
    },
];