"use client"

import React, { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"

export default function ImageUpload() {
  const [files, setFiles] = useState<File[]>([])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(prev => [...prev, ...acceptedFiles])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    onDrop,
    multiple: true,
  })

  const removeFile = (file: File) => {
    setFiles(prev => prev.filter(f => f !== file))
  }

  return (
    <div className="space-y-4">
      {/* Зона загрузки */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
          }`}
      >
        <input {...getInputProps()} />
        <p className="text-gray-500">Перетащи файлы или нажми для выбора</p>
      </div>

      {/* Список файлов */}
      <div className="space-y-2">
        {files.map((file, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between border rounded-xl px-3 py-2 bg-white shadow-sm"
          >
            {/* Левая часть: превью + имя */}
            <div className="flex items-center gap-3">
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="w-8 h-8 object-cover rounded"
              />
              <span className="text-sm text-gray-700 truncate max-w-[200px]">
                {file.name}
              </span>
            </div>

            {/* Правая часть: кнопка */}
            <Button
              size="sm"
              variant="destructive"
              onClick={() => removeFile(file)}
            >
              Удалить
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
