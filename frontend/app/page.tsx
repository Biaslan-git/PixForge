"use client";

import { useState } from "react";
import ImageUpload from "@/components/images_upload";
import ShimmerText from "@/components/kokonutui/shimmer-text";
import Toolbar from "@/components/kokonutui/toolbar";

import {
  MousePointer2,
  Move,
  Shapes,
  Layers,
  Frame,
  SlidersHorizontal,
  FileDown,
  Share2,
  Bell,
  CircleUserRound,
  Palette,
} from "lucide-react";

export default function ImageUploadWrapper() {
  const [images, setImages] = useState<File[]>([]);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const handleImageChange = (files: File[]) => {
    setImages(files);
  };

  const toolbarTools = [
    { id: "move", title: "Move", icon: Move },
    { id: "shapes", title: "Shapes", icon: Shapes },
    { id: "layers", title: "Layers", icon: Layers },
    { id: "frame", title: "Frame", icon: Frame },
    { id: "properties", title: "Properties", icon: SlidersHorizontal },
    { id: "export", title: "Export", icon: FileDown },
    { id: "share", title: "Share", icon: Share2 },
    { id: "notifications", title: "Notifications", icon: Bell },
    { id: "profile", title: "Profile", icon: CircleUserRound },
    { id: "appearance", title: "Appearance", icon: Palette },
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

        <div>
          <div className="text-sm text-muted-foreground">
            {selectedTool ?
              <span>Выбранный инструмент: {selectedTool}</span>
              : <span>Выбери инструмент</span>}
          </div>
          <Toolbar
            items={toolbarTools}
            selected={selectedTool}
            onSelect={setSelectedTool}
          />
        </div>
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
