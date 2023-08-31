"use client";

import { X } from "lucide-react";
import Image from "next/image";

import { UploadDropzone } from "@/lib/uploadthing";

import "@uploadthing/react/styles.css";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "serverImage";
  className?: string;
}

export default function FileUploader({
  onChange,
  value,
  endpoint,
  className,
}: FileUploadProps) {
  if (value) {
    return (
      <div className={cn("relative h-24 w-24", className)}>
        <Image
          fill
          src={value}
          alt="Upload"
          className="rounded-full object-cover"
        />
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
    />
  );
}
