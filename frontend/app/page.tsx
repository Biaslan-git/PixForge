"use client";

import { useState } from "react";
import ImageUpload from "@/components/images_upload";
import Toolbar from "@/components/kokonutui/toolbar";
import ShimmerText from "@/components/kokonutui/shimmer-text";

export default function ImageUploadWrapper() {
  const [images, setImages] = useState<File[]>([]); // переменная для хранения файлов

  const handleImageChange = (files: File[]) => {
    setImages(files); // сохраняем файлы в state
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <ImageUpload onChange={handleImageChange} />
    </div>
  );
}
