import Image from "next/image";
import { useDropzone } from "react-dropzone";
import Button from "../button/Button";
export interface FileWithPreview extends File {
  preview?: string;
}

export interface OnlyPreview {
  preview?: string;
  size?: number;
}

export type FilePreview = FileWithPreview | OnlyPreview;

type DropzoneProps = {
  onDrop?: (file: File[]) => void;
  onDelete?: (file: FilePreview) => void;
  files?: FilePreview[];
  maxFiles?: number;
};

export const Dropzone: React.FC<DropzoneProps> = ({
  onDrop,
  onDelete,
  files = [],
  maxFiles,
}) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      onDrop?.(acceptedFiles);
    },
    maxFiles: maxFiles ?? 1,
  });

  return (
    <div {...getRootProps()}>
      <div>
        <input {...getInputProps()} />
      </div>
      <ul className="flex flex-row">
        {files?.map((file, index) => (
          <li
            key={index}
            className="flex flex-row w-1/2 p-1 sm:w-1/3 md:w-1/4 "
          >
            {/* <div className="relative p-2 border rounded-md group w-92 h-92">
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
                  {(file?.size / 1024).toFixed(2)} KB
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete?.(file);
                  }}
                >
                  x
                </button>
              </div>
            </div> */}
          </li>
        ))}
      </ul>
      <Button type="button">
        <div>이미지 업로드</div>
      </Button>
    </div>
  );
};
