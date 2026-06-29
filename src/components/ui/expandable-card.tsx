import React, { useEffect, useId, useRef, useState, createContext } from "react";
import Image from "next/image";
import Link from "next/link";
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
            className="fixed inset-0 bg-black/60 backdrop-blur-md h-full w-full z-50"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 z-[60] overflow-y-auto py-6 sm:py-10 px-4 sm:px-6">
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-5xl mx-auto bg-bg-card sm:rounded-2xl overflow-hidden my-auto shadow-elevated border border-border-subtle"
            >
              <div className="relative">
                <motion.div layoutId={`image-${active.title}-${id}`} className="relative h-48 md:h-56 w-full">
                  <Image
                    priority
                    fill
                    src={active.src}
                    alt={active.title}
                    className="object-cover object-top"
                  />
                </motion.div>
                <button
                  className="absolute top-4 right-4 h-10 w-10 bg-bg-dark-secondary/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/10 transition-all z-50 border border-border-subtle"
                  onClick={() => setActive(null)}
                >
                  <IconX className="h-6 w-6 text-text-white" />
                </button>
              </div>
              <div className="p-4 md:p-10 max-h-[calc(100vh-80px)] overflow-y-auto">
                <motion.h3
                  layoutId={`title-${active.title}-${id}`}
                  className="text-2xl md:text-4xl font-display text-text-white mt-2"
                >
                  {active.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${active.description}-${id}`}
                  className="text-text-light text-base mt-3"
                >
                  {active.description}
                </motion.p>
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-text-light text-base mt-8"
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
        className="flex w-full overflow-x-auto overscroll-x-contain py-8 sm:py-10 md:py-20 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory"
        ref={carouselRef}
        onScroll={checkScrollability}
      >
        <div className={cn("absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l from-transparent to-bg-dark")}></div>
        <div className={cn("flex flex-row justify-start gap-4 sm:gap-6 pl-0 sm:pl-4 pr-4 sm:pr-0", "max-w-7xl mx-auto")}>
          {items.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 * index, ease: "easeOut" }}
              key={`card-${index}`}
              className="snap-start shrink-0 last:pr-4 md:last:pr-[33%]"
              whileHover={{ scale: 1.02 }}
            >
              {item}
            </motion.div>
          ))}
        </div>
      </div>
      <div className="flex justify-center sm:justify-end gap-3 mt-2 sm:mt-0 sm:mr-10">
        <button
          className="relative z-40 h-10 w-10 rounded-lg bg-bg-card border border-border-subtle flex items-center justify-center disabled:opacity-40 hover:border-border hover:bg-white/[0.04] transition-all"
          onClick={scrollLeft}
          disabled={!canScrollLeft}
        >
          <IconArrowNarrowLeft className="h-6 w-6 text-primary-green" />
        </button>
        <button
          className="relative z-40 h-10 w-10 rounded-lg bg-bg-card border border-border-subtle flex items-center justify-center disabled:opacity-40 hover:border-border hover:bg-white/[0.04] transition-all"
          onClick={scrollRight}
          disabled={!canScrollRight}
        >
          <IconArrowNarrowRight className="h-6 w-6 text-primary-green" />
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
        className="rounded-xl bg-bg-card h-auto w-[min(85vw,280px)] sm:w-72 md:w-96 overflow-hidden flex flex-col items-start justify-start relative z-10 cursor-pointer border border-border-subtle hover:border-border transition-all duration-200 group snap-start shrink-0"
        whileHover={{ y: -2 }}
      >
        <motion.div 
          layoutId={`image-${card.title}-${id}`} 
          className="w-full h-48 sm:h-72 md:h-96 relative overflow-hidden"
        >
          <Image
            src={card.src}
            alt={card.title}
            fill
            className={cn(
              card.imageFit === "contain"
                ? "object-contain p-6 bg-bg-dark-secondary group-hover:scale-105 transition-transform duration-300"
                : "object-cover group-hover:scale-110 transition-transform duration-300"
            )}
          />
        </motion.div>
        <div className="p-5">
          <motion.h3
            layoutId={`title-${card.title}-${id}`}
            className="text-lg md:text-xl font-bold text-text-white group-hover:text-primary-green transition-colors"
          >
            {card.title}
          </motion.h3>
          <motion.p
            layoutId={`description-${card.title}-${id}`}
            className="text-sm md:text-base text-text-light mt-2"
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
      title: "SabiYarn-125M",
      src: "/sabiyarn_ai.png",
      imageFit: "cover" as const,
      content: () => (
        <>
          <p className="text-text-light leading-relaxed">
            SabiYarn is a foundational AI language model tailored for Nigerian languages, offering translation, sentiment analysis, topic classification and text generation for 8 indigenous languages.
          </p>
          <p className="text-text-white mt-4"><strong className="text-primary-green">Key Features:</strong></p>
          <ul className="list-disc list-inside space-y-2 text-text-light mt-2">
            <li>Supports Yoruba, Hausa, Igbo, Pidgin, and more.</li>
            <li>Multitask capabilities in translation, sentiment analysis, and text generation.</li>
            <li>Localized solutions for businesses engaging Nigerian audiences.</li>
          </ul>
          <Link href="/products/sabiyarn" className="inline-block mt-6 btn btn-primary text-sm">
            Try SabiYarn Models
          </Link>
        </>
      ),
    },
    {
      description: "Medical Education",
      title: "STUD",
      src: "/stud.png",
      imageFit: "contain" as const,
      content: () => (
        <>
          <p className="text-text-light leading-relaxed">
            STUD is a gamified medical education platform — clinical adventures that help the next generation of clinicians master medicine through interactive, scenario-based learning.
          </p>
          <p className="text-text-white mt-4"><strong className="text-primary-green">Key Features:</strong></p>
          <ul className="list-disc list-inside space-y-2 text-text-light mt-2">
            <li>Scenario-based clinical simulations and case studies.</li>
            <li>Gamified progression to reinforce medical knowledge.</li>
            <li>Built for students, residents, and continuing education.</li>
          </ul>
          <Link href="/jeffreyotoibhi?tab=portfolio" className="inline-block mt-6 btn btn-text text-primary-green">
            View in portfolio →
          </Link>
        </>
      ),
    },
];