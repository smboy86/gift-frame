"use client";
// components/ImageUpload.tsx
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

export function ImageUpload() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
    multiple: false,
  });

  return (
    <Card className="w-full max-w-md mx-auto relative min-h-[400px] bg-gray-50">
      {/* 배경 시연 이미지 */}
      <div className="absolute inset-0 opacity-10">
        <Image
          src="/demo-frame.jpg"
          alt="Demo Frame"
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div
        {...getRootProps()}
        className="relative min-h-[400px] p-4 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg hover:border-primary transition-colors"
      >
        <input {...getInputProps()} className="hidden" />

        {uploadedImage ? (
          <div className="relative w-full h-full min-h-[300px]">
            <Image
              src={uploadedImage}
              alt="Uploaded preview"
              layout="fill"
              objectFit="contain"
              className="rounded-lg"
            />
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setUploadedImage(null);
              }}
              variant="outline"
              className="absolute top-2 right-2"
            >
              삭제
            </Button>
          </div>
        ) : (
          <div className="text-center">
            <div className="mb-4">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex flex-col items-center text-sm text-gray-600">
              <p className="font-semibold">
                {isDragActive ? "여기에 놓아주세요" : "이미지를 선택하세요"}
              </p>
              <p className="mt-1">또는 클릭하여 업로드</p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
