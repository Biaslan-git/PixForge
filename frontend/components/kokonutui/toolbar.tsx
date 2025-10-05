"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface ToolbarItem {
  id: string;
  title: string;
  icon: LucideIcon;
}

interface ToolbarProps {
  className?: string;
  activeColor?: string;
  items: ToolbarItem[];                     // список кнопок извне
  selected?: string | null;                 // выбранный инструмент
  onSelect?: (id: string | null) => void;   // колбэк выбора
}

const buttonVariants = {
  initial: {
    gap: 0,
    paddingLeft: ".5rem",
    paddingRight: ".5rem",
  },
  animate: (isSelected: boolean) => ({
    gap: isSelected ? ".5rem" : 0,
    paddingLeft: isSelected ? "1rem" : ".5rem",
    paddingRight: isSelected ? "1rem" : ".5rem",
  }),
};

const spanVariants = {
  initial: { width: 0, opacity: 0 },
  animate: { width: "auto", opacity: 1 },
  exit: { width: 0, opacity: 0 },
};

const notificationVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: -10 },
  exit: { opacity: 0, y: -20 },
};

const transition = { type: "spring", bounce: 0, duration: 0.4 };

export function Toolbar({
  className,
  activeColor = "text-primary",
  items,
  selected,
  onSelect,
}: ToolbarProps) {
  const [activeNotification, setActiveNotification] = React.useState<string | null>(null);

  const handleItemClick = (itemId: string) => {
    const newSelected = selected === itemId ? null : itemId;
    onSelect?.(newSelected);
    setActiveNotification(itemId);
    setTimeout(() => setActiveNotification(null), 1500);
  };

  return (
    <div className="space-y-2">
      <div
        className={cn(
          "flex items-center gap-3 p-2 relative",
          "bg-background border rounded-xl transition-all duration-200",
          className
        )}
      >
        <AnimatePresence>
          {activeNotification && (
            <motion.div
              variants={notificationVariants as any}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-50"
            >
              <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs">
                {items.find((i) => i.id === activeNotification)?.title} clicked!
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-2">
          {items.map((item) => (
            <motion.button
              key={item.id}
              variants={buttonVariants as any}
              initial={false}
              animate="animate"
              custom={selected === item.id}
              onClick={() => handleItemClick(item.id)}
              transition={transition as any}
              className={cn(
                "relative flex items-center rounded-none px-3 py-2",
                "text-sm font-medium transition-colors duration-300",
                selected === item.id
                  ? "bg-[#1F9CFE] text-white rounded-lg"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon
                size={16}
                className={cn(selected === item.id && "text-white")}
              />
              <AnimatePresence initial={false}>
                {selected === item.id && (
                  <motion.span
                    variants={spanVariants as any}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={transition as any}
                    className="overflow-hidden"
                  >
                    {item.title}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Toolbar;
