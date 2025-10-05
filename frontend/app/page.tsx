"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ImageUpload from "@/components/images_upload";
import ShimmerText from "@/components/kokonutui/shimmer-text";
import Toolbar from "@/components/kokonutui/toolbar";
import ToolSettings from "@/components/tool-settings";

import {
  CopyMinus,
  Crop,
  FileInput,
  Rocket,
  Waves,
} from "lucide-react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

export default function ImageUploadWrapper() {
  const [images, setImages] = useState<File[]>([]);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const handleImageChange = (files: File[]) => {
    setImages(files);
  };

  const toolbarTools = [
    { id: "convert", title: "Конвертация", icon: FileInput },
    { id: "compress", title: "Сжатие", icon: CopyMinus },
    { id: "crop", title: "Обрезка", icon: Crop },
    { id: "watermark", title: "Водяной знак", icon: Waves },
  ];
  // const toolbarFilters = [
  //   { id: "move", title: "Move", icon: Move },
  //   { id: "shapes", title: "Shapes", icon: Shapes },
  //   { id: "layers", title: "Layers", icon: Layers },
  //   { id: "frame", title: "Frame", icon: Frame },
  //   { id: "properties", title: "Properties", icon: SlidersHorizontal },
  //   { id: "export", title: "Export", icon: FileDown },
  //   { id: "share", title: "Share", icon: Share2 },
  //   { id: "notifications", title: "Notifications", icon: Bell },
  //   { id: "profile", title: "Profile", icon: CircleUserRound },
  //   { id: "appearance", title: "Appearance", icon: Palette },
  // ];

  return (
    <div>
      <ShimmerText text="Куй свои изображения как хочешь" />
      <div className="flex flex-col gap-4 items-center">
        <ImageUpload onChange={handleImageChange} />

        <div className="space-y-1">
          <div className="text-sm text-muted-foreground">
            {selectedTool ?
              <span>Выбранный инструмент: {selectedTool}</span>
              : <span>Выбери инструмент</span>}
          </div>
          <Toolbar
            items={toolbarTools}
            selected={selectedTool}
            onSelect={setSelectedTool}
            className="text-nowrap"
          />
        </div>
        <HoverBorderGradient
          containerClassName="rounded-full"
          as="button"
          className="dark:bg-secondary bg-white text-black dark:text-white flex items-center space-x-2"
        >
          <Rocket />
          <span>Начать обработку</span>
        </HoverBorderGradient>

        {/* Tool Settings Section with Animation */}
        {selectedTool && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md p-4 border rounded-lg bg-muted"
          >
            <h3 className="text-lg font-medium mb-2">Настройки инструмента: {selectedTool}</h3>
            <ToolSettings selectedTool={selectedTool} />
          </motion.div>
        )}

        {/* <div> */}
        {/*   <div className="text-sm text-muted-foreground"> */}
        {/*     {selectedFilter ? */}
        {/*       <span>Выбранный фильтр: {selectedFilter}</span> */}
        {/*       : <span>Фильтры</span>} */}
        {/*   </div> */}
        {/*   <Toolbar */}
        {/*     items={toolbarFilters} */}
        {/*     selected={selectedFilter} */}
        {/*     onSelect={setSelectedFilter} */}
        {/*   /> */}
        {/* </div> */}


      </div >
    </div>
  )
}
