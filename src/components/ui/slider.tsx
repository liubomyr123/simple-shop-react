import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
// import * as Tooltip from "@radix-ui/react-tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip";

import { cn } from "@/lib/utils";

interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  value: number[];
  onValueChange: (value: number[]) => void;
}

const Slider = React.forwardRef<
React.ElementRef<typeof SliderPrimitive.Root>,
SliderProps
>(({ className, value, onValueChange, ...props }, ref) => {
  return (
    <TooltipProvider>
      <SliderPrimitive.Root
        ref={ref}
        className={cn(
          "relative flex w-full touch-none select-none items-center",
          className,
        )}
        value={value}
        onValueChange={onValueChange}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
          <SliderPrimitive.Range className="absolute h-full bg-primary" />
        </SliderPrimitive.Track>
        {value.map((_val, index) => (
          <SliderPrimitive.Thumb
            key={index}
            className="block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            {/* <Tooltip.Root delayDuration={0} open={true}>
              <Tooltip.Trigger>
                <div className="absolute inset-0" />
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content
                  className="bg-black text-white text-xs rounded px-2 py-1"
                  style={{ zIndex: 100, transform: "translateY(-17px)" }}
                >
                  {val}
                  <Tooltip.Arrow className="fill-black" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root> */}
          </SliderPrimitive.Thumb>
        ))}
      </SliderPrimitive.Root>
    </TooltipProvider>
  );
});
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
