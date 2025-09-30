"use client"

import React, { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils" // если у тебя есть утилита cn (обычно в shadcn проектах)

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
        className={cn(
          "border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition",
          "bg-background border-border text-muted-foreground",
          isDragActive && "border-primary/50 bg-primary/5"
        )}
      >
        <input {...getInputProps()} />
        <p className="text-sm">Перетащи файлы или нажми для выбора</p>
      </div>

      {/* Список файлов */}
      <div className="space-y-2">
        {files.map((file, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between rounded-lg border border-border bg-card px-3 py-2 shadow-sm"
          >
            {/* Левая часть: превью + имя */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="w-8 h-8 object-cover rounded"
              />
              <span className="text-sm text-card-foreground truncate">
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
