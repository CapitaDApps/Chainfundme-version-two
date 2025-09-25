import { X } from "lucide-react";
import { FaFilePdf, FaFileWord, FaFileExcel, FaFileAlt } from "react-icons/fa";
type SupportingDocType = {
  docFile?: File;
  docUrl?: string;
};

export default function UploadDocuments({
  documents,
  onRemove,
}: {
  documents: SupportingDocType[];
  onRemove(i: number): void;
}) {
  const getIcon = (name: string) => {
    if (name.endsWith(".pdf"))
      return <FaFilePdf className="text-red-500 w-6 h-6" />;
    if (name.endsWith(".doc") || name.endsWith(".docx"))
      return <FaFileWord className="text-blue-500 w-6 h-6" />;
    if (name.endsWith(".xls") || name.endsWith(".xlsx"))
      return <FaFileExcel className="text-green-600 w-6 h-6" />;
    return <FaFileAlt className="text-gray-600 w-6 h-6" />;
  };

  return (
    <div className="flex items-center flex-wrap gap-3 mt-3">
      {documents.map((file, index) => {
        const name =
          file.docFile?.name || file.docUrl?.split("/").pop() || "document";

        return (
          <div
            key={index}
            className="relative flex items-cente  w-full max-w-[150px] border rounded-md p-2 group"
          >
            <div className="flex items-center gap-2">
              {getIcon(name.toLowerCase())}
              {file.docUrl ? (
                <a
                  href={file.docUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 underline truncate max-w-[80px]"
                >
                  {name}
                </a>
              ) : (
                <span className="text-sm truncate max-w-[80px]">{name}</span>
              )}
            </div>
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="absolute top-1 right-1 cursor-pointer bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
