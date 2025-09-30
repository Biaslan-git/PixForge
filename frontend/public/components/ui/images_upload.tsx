import React, { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ImageUpload() {
  const [files, setFiles] = useState < File[] > ([])

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
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
          }`}
      >
        <input {...getInputProps()} />
        <p className="text-gray-500">Перетащи файлы или нажми для выбора</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {files.map((file, idx) => (
          <Card key={idx} className="relative overflow-hidden">
            <CardContent className="p-0">
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="w-full h-32 object-cover"
              />
              <Button
                size="sm"
                variant="destructive"
                className="absolute top-2 right-2"
                onClick={() => removeFile(file)}
              >
                Удалить
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
