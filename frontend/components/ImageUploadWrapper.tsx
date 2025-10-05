"use client";

import ImageUpload from "@/components/images_upload";

export default function ImageUploadWrapper() {
  const handleImageChange = (files: File[]) => { };

  return <ImageUpload onChange={handleImageChange} />;
}

