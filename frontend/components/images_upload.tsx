"use client"

import React, { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export default function ImageUploadForm() {
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

  const handleSubmit = async () => {
    const formData = new FormData()
    files.forEach(file => formData.append("files", file))

    await fetch("/api/upload", {
      method: "POST",
      body: formData,
    })
  }

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle className="text-lg font-medium">
          Загрузка изображений
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Dropzone */}
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition",
            "bg-background border-border text-muted-foreground",
            isDragActive && "border-primary/50 bg-primary/5"
          )}
        >
          <input {...getInputProps()} />
          <p className="text-sm">
            Перетащи сюда файлы или <span className="text-primary">нажми</span>{" "}
            для выбора
          </p>
        </div>

        {/* Список файлов */}
        {files.length > 0 && (
          <div className="space-y-2">
            {files.map((file, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between rounded-lg border border-border bg-card px-3 py-2 shadow-sm"
              >
                {/* Левая часть */}
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

                {/* Кнопка удалить */}
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
        )}

        {/* Кнопка отправки */}
        {files.length > 0 && (
          <div className="flex justify-end pt-2">
            <Button onClick={handleSubmit}>Загрузить все</Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
