import type { MouseEvent } from "react";
import { useState, useEffect } from "react";
import type { AnimationProps } from "framer-motion";
import { motion, useAnimation } from "framer-motion";

const commonFlexDirectionValues: Array<React.CSSProperties["flexDirection"]> = [
  "column",
  "column-reverse",
  "row",
  "row-reverse",
];

interface StarProps {
  i: number;
  isHoveringWrapper: boolean;
  isClicked: boolean;
  onDoubleClickHandler: (e: MouseEvent<SVGSVGElement>) => void;
  iconType: "heart" | "star";
  dotSize: number;
  itemSize: number;
  transition: AnimationProps["transition"];
}

const Star = ({ isHoveringWrapper, i, isClicked, onDoubleClickHandler, iconType, transition, itemSize, dotSize }: StarProps): JSX.Element => {
  const [isHovering, setIsHovering] = useState(false);
  const starControls = useAnimation();
  const backgroundControls = useAnimation();

  useEffect(() => {
    void (async function () {
      if (isClicked && isHovering) {
        await starControls.start("hovered");
      } else if (isClicked) {
        await starControls.start("animate");
      } else {
        await starControls.start("exit");
      }
    })();
  }, [isClicked, isHovering]);

  useEffect(() => {
    void (async function () {
      if (isHoveringWrapper) {
        await backgroundControls.start({ background: "#ffd700" });
      } else {
        await backgroundControls.start({ background: "#aaaaaa" });
      }
    })();
  }, [isHoveringWrapper]);

  const IconMap = {
    heart: {
      path: <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />,
      viewBox: "0 0 542 512",
    },
    star: {
      path: <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />,
      viewBox: "0 0 576 512",
    },
  };

  return (
    <>
      <motion.div
        className="rounded-lg cursor-pointer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        style={{
          width: dotSize,
          height: dotSize,
        }}
        initial={{ background: "#aaaaaa" }}
        animate={backgroundControls}
      />
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        height={itemSize}
        width={itemSize}
        viewBox={IconMap[iconType].viewBox}
        className="relative z-10 cursor-pointer"
        onMouseOver={() => setIsHovering(true)}
        onDoubleClick={onDoubleClickHandler}
        onMouseOut={() => setIsHovering(false)}
        variants={{
          initial: {
            opacity: 0,
            translateX: -10,
            rotate: 0,
            scale: 0,
          },
          animate: (i: number) => ({
            scale: 1,
            opacity: 1,
            translateX: 0,
            rotate: 360,
            transition: {
              delay: i * 0.04,
              ...transition,
            },
          }),
          exit: (i: number) => ({
            opacity: 0,
            translateX: -10,
            scale: 0,
            rotate: 0,
            transition: {
              duration: 0.25,
              delay: 0.2 - i * 0.04,
            },
          }),
          hovered: {
            // scale: 1.1,
            transition: {
              duration: 0.2,
            },
          },
        }}
        initial="initial"
        animate={starControls}
        custom={i}
        fill={"gold"}
      >
        {IconMap[iconType].path}
      </motion.svg>
    </>
  );
};

export const StarRateV1 = ({ countStars = 1, isChangeable = true, itemSize = 20 }: { itemSize: number; countStars: number; isChangeable: boolean; }): JSX.Element => {
  const [countStarsTotal, setCountStars] = useState(5);
  const [isClicked, setIsClicked] = useState(countStars);
  const [isHovering, setIsHovering] = useState(0);
  const [flexDirection, setFlexDirection] = useState<React.CSSProperties["flexDirection"]>(commonFlexDirectionValues[2]);
  const [iconType, setIconType] = useState<"heart" | "star">("star");
  const [transition, setTransition] = useState<(AnimationProps["transition"])>({
    type: "spring",
    stiffness: 500,
    damping: 30,
    duration: 0.1,
    mass: 0.1,
  });
  //   const [itemSize, setItemSize] = useState(10);
  const [dotSize, setDotSize] = useState(itemSize / 4);

  return (
    <div className="flex">

      <section
        className="flex justify-center bg-green-30 h-max gap-1"
        style={{
          flexDirection,
        }}
      >
        {Array.from({ length: countStarsTotal }).map((_, i) => (
          <motion.div
            layout
            className="relative bg-red-30 w-max"
            onMouseOver={() => isChangeable && setIsHovering(i)}
            onClick={() => isChangeable && setIsClicked(i)}
            key={i}
          >
            <Star
              i={i}
              isHoveringWrapper={isHovering >= i}
              isClicked={isClicked >= i}
              onDoubleClickHandler={() => {
                //
              }}
              iconType={iconType}
              transition={transition}
              itemSize={itemSize}
              dotSize={dotSize}
            />
          </motion.div>
        ))}
      </section>

    </div>
  );
};
