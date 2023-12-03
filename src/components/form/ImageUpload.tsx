"use client";

import { postEventImageApi } from "@/api/events";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { IoTrash } from "react-icons/io5";
import { getCookie } from "../../util/authCookie";
import Button from "../../components/button/Button";
import Image from "next/image";

type Image = {
  setThumbNailUrl: (url: string) => void;
  setImageUrls: (urls: string[]) => void;
};

interface FileWithPreview extends File {
  preview: string;
}
type Preview = {
  url: string;
  name: string;
  size: number;
};

export const ImageUpload = ({ setThumbNailUrl, setImageUrls }: Image) => {
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<Preview | null>(
    null
  );
  const [images, setImages] = useState<File[]>([]);
  const [imagesPreview, setImagesPreview] = useState<FileWithPreview[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);

  const [atk, setAtk] = useState("");

  useEffect(() => {
    setAtk(getCookie("ticket-atk"));
  }, []);

  const onDropThumbnail = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const fileURL = URL.createObjectURL(acceptedFiles[0]);
    setThumbnailPreview({ url: fileURL, name: file.name, size: file.size });
    setThumbnail(file);
  }, []);

  const onDropImages = useCallback((acceptedFiles: File[]) => {
    const mappedFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setImagesPreview((prevImages) => [...prevImages, ...mappedFiles]);
    setImages((prevImages) => [...prevImages, ...acceptedFiles]);
  }, []);

  const removeFile = (fileToRemove: FileWithPreview | Preview) => {
    if ("preview" in fileToRemove && imagesPreview) {
      setImagesPreview((prevFiles) =>
        prevFiles.filter((file) => file.preview !== fileToRemove.preview)
      );
      URL.revokeObjectURL(fileToRemove.preview);
    } else if (thumbnailPreview && "url" in fileToRemove) {
      setThumbnailPreview(null);
      setThumbnail(null);
      URL.revokeObjectURL(fileToRemove.url);
    }
  };

  const {
    getRootProps: getThumbnailRootProps,
    getInputProps: getThumbnailInputProps,
  } = useDropzone({
    onDrop: onDropThumbnail,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
    maxFiles: 1,
  });

  const {
    getRootProps: getImagesRootProps,
    getInputProps: getImagesInputProps,
  } = useDropzone({
    onDrop: onDropImages,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
  });
  const uploadFiles = async (e: any) => {
    e.stopPropagation();
    try {
      if (!thumbnail) {
        alert("썸네일을 추가해주세요.");
        return;
      }
      setUploading(true);

      const formDataValues = {
        atk: atk,
        thumbNailImage: thumbnail,
        eventImages: images,
      };

      const response = await postEventImageApi(formDataValues);
      setThumbNailUrl(response.data.thumbNailImageUrl);
      setImageUrls(response.data.imageUrls);
      setUploading(false);
    } catch (error) {
      console.error("이미지 업로드 중 에러 발생:", error);
    }
  };

  return (
    <div className="flex flex-col gap-22">
      <div
        {...getThumbnailRootProps()}
        className="flex flex-col items-center justify-center py-5 border-2 border-gray-400 border-dashed cursor-pointer "
      >
        <p>썸네일 이미지를 드래그하거나 클릭하여 선택하세요.</p>
        <input
          id="hidden-file-input"
          type="file"
          className="hidden"
          {...getThumbnailInputProps()}
        />
      </div>
      <div className="">
        {thumbnailPreview && (
          <div className="relative flex w-full h-100">
            <Image
              src={thumbnailPreview.url}
              alt="썸네일 이미지"
              fill
              objectFit="contain"
            />
            <div className="flex flex-col justify-between">
              <span className="text-xs break-words">
                {`${thumbnailPreview.name} (${thumbnailPreview.size} bytes)`}
              </span>
              <button
                className="absolute bottom-0 right-0 p-1 bg-opacity-75 rounded-md hover:bg-red-600"
                onClick={() => removeFile(thumbnailPreview)}
              >
                <IoTrash />
              </button>
            </div>
          </div>
        )}
      </div>
      <div
        {...getImagesRootProps()}
        className="flex flex-col items-center justify-center py-5 border-2 border-gray-400 border-dashed cursor-pointer"
      >
        <input {...getImagesInputProps()} />
        <p>업로드할 이미지 파일들을 드래그하거나 클릭하여 선택하세요.</p>
      </div>
      <ul className="flex flex-row gap-12 ">
        {imagesPreview.map((file, index) => (
          <li key={index} className="flex flex-row p-1 ">
            <div className="relative p-2 border rounded-md group w-92 h-92">
              <Image
                src={file.preview}
                alt={file.name}
                width={368}
                height={368}
                className="object-cover"
              />
              <div className="absolute top-0 bottom-0 left-0 right-0 flex flex-col justify-between p-2 text-transparent hover:text-white group-hover:bg-black group-hover:bg-opacity-50">
                <span className="text-xs break-words">{file.name}</span>
                <span className="text-xs">
                  {(file.size / 1024).toFixed(2)} KB
                </span>
                <button
                  className="absolute bottom-0 right-0 p-1 bg-opacity-75 rounded-md hover:bg-red-600"
                  onClick={() => removeFile(file)}
                >
                  <IoTrash />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <Button type="button" onClick={uploadFiles} disabled={uploading}>
        {uploading ? "업로드 중..." : "이미지 업로드"}
      </Button>
    </div>
  );
};
