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
      description: "Language Model",
      title: "SabiYarn v1",
      src: "",
      ctaText: "Visit",
      ctaLink: "https://huggingface.co/spaces/BeardedMonster/SabiYarn_125M",
      content: () => {
        return (
            <>
            <p>SabiYarn v1 is a foundational AI language model tailored for Nigerian languages, offering powerful capabilities in translation, sentiment analysis, topic classification and text generation for 8 indigenous languages. It was designed with an objective– to bridge communication gaps across Nigeria’s multilingual landscape, enabling people and businesses to engage with diverse audiences effectively.</p>
            <br />
            <p><ul>              
              <b>Key Features:</b>
              <li>Supports major Nigerian languages like Yoruba, Hausa, Igbo, and Pidgin.</li>
              <li>Multitask capabilities in translation, sentiment analysis, and text generation.</li>
              <li>Localized solutions for businesses/organizations to interact with Nigerian customers.</li>
            </ul></p>
            <br />
            <p><a href="https://huggingface.co/spaces/BeardedMonster/SabiYarn_125M">Check out the demo here</a></p>
            </>
        );
      },
    },
    // {
    //   description: "Language Model",
    //   title: "SabiYarn v2",
    //   src: "",
    //   ctaText: "Visit",
    //   ctaLink: "https://huggingface.co/spaces/BeardedMonster/SabiYarn_125M",
    //   content: () => {
    //     return (
    //         <>
    //         <p>SabiYarn v2 takes multilingual AI to the next level, with enhanced reasoning, inter-language translation, and advanced tasks like instruction-following and reasoning. It's being designed to support a wide range of African languages (about 30), to facilitate driving solutions for businesses and governments across the continent.</p>
    //         <br />
    //         <p><ul>              
    //           <b>Key Features:</b>
    //           <li>Multilingual support for a wider range of African languages.</li>
    //           <li>Advanced reasoning and inter-language translation.</li>
    //           <li>Suitable for sectors like governance, healthcare, and cross-border business.</li>
    //         </ul></p>
    //         </>
    //     );
    //   },
    // },
    // {
    //   description: "Hardware/Robotics",
    //   title: "MediVault",
    //   src: "",
    //   ctaText: "Visit",
    //   ctaLink: "https://huggingface.co/spaces/BeardedMonster/SabiYarn_125M",
    //   content: () => {
    //     return (
    //         <>
    //         <p>MediVault is an robot-enhanced AI device that digitizes paper-based medical records, simplifying healthcare documentation. It automates data extraction, categorization, and storage, improving workflow efficiency and ensuring compliance with data privacy regulations.</p>
    //         <br />
    //         <p><ul>              
    //           <b>Key Features:</b>
    //           <li>AI-assisted digitization of handwritten medical notes.</li>
    //           <li>AI-driven categorization, entity recognition for easy data retrieval.</li>
    //           <li>Data centralization.</li>
    //           <li>Seamless integration with healthcare systems and regulatory compliance.</li>
    //         </ul></p>
    //         </>
    //     );
    //   },
    // },
    {
      description: "Agentic System",
      title: "Ottobiz",
      src: "",
      ctaText: "Visit",
      ctaLink: "https://huggingface.co/spaces/BeardedMonster/SabiYarn_125M",
      content: () => {
        return (
            <>
            <p>Ottobiz is an AI-enhanced market platform that automates key aspects of the sales cycle, from advertising, product inquiry to payment verification and logistics. It boosts efficiency, enhances customer experience, and drives revenue through intelligent automation and data insights. This is being built in partnership with Datached.</p>
            <br />
            <p><ul>              
              <b>Key Features:</b>
              <li>Automates sales inquiries, payment verification, and logistics.</li>
              <li>Provides insights for upselling.</li>
            </ul></p>
            </>
        );
      },
    },
];