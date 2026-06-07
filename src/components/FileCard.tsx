import type { FileItem } from "../types/file";
import { 
  Trash,
  Image, 
  FileText, 
  Video, 
  Music, 
  Code2, 
  Folder, 
  File,
  Sheet
 } from "lucide-react";


const getFileIcon = (fileType: string) => {
  const type = fileType.toLowerCase();

  // Imágenes
  if (type.startsWith("image/")) {
    return {
      icon: <Image className="w-6 h-6" />,
      bgClass: "bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400"
    };
  }
  // Vídeos
  if (type.startsWith("video/")) {
    return {
      icon: <Video className="w-6 h-6" />,
      bgClass: "bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400"
    };
  }
  // Audio
  if (type.startsWith("audio/")) {
    return {
      icon: <Music className="w-6 h-6" />,
      bgClass: "bg-pink-50 dark:bg-pink-950/40 text-pink-600 dark:text-pink-400"
    };
  }
  // PDFs
  if (type === "application/pdf" || type.includes("text")) {
    return {
      icon: <FileText className="w-6 h-6" />,
      bgClass: "bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400"
    };
  }
  // Documentos de texto / Word / Excel / Presentaciones
  if ( type.includes("document") || type.includes("sheet") || type.includes("msword")) {
    return {
      icon: <Sheet className="w-6 h-6" />,
      bgClass: "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400"
    };
  }
  // Archivos de código (js, ts, html, css, json...)
  if (type.includes("javascript") || type.includes("typescript") || type.includes("json") || type.includes("html") || type.includes("css")) {
    return {
      icon: <Code2 className="w-6 h-6" />,
      bgClass: "bg-yellow-50 dark:bg-yellow-950/40 text-yellow-600 dark:text-yellow-400"
    };
  }
  // Carpetas (por si en tus datos iniciales simulas directorios)
  if (type === "folder") {
    return {
      icon: <Folder className="w-6 h-6" />,
      bgClass: "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400"
    };
  }

  // Icono por defecto (Para cualquier otro tipo de archivo desconocido)
  return {
    icon: <File className="w-6 h-6" />,
    bgClass: "bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
  };

}

export default function FileCard({ file, onDelete }: { file: FileItem; onDelete: () => void }) {

  const { icon} = getFileIcon(file.type);
  
  return (
    <div
      className="
        relative
        bg-white dark:bg-gray-800
        hover:bg-gray-200
        border border-gray-200 dark:border-gray-700
        rounded-xl p-4
        transition dark:hover:bg-gray-700
      "
    >
      <div
        className="
          w-12 h-12
          flex items-center justify-center
          rounded-lg mb-3 dark:hover:bg-gray-700
          ${bgClass}
        "
      >
        {icon}
      </div>

      <h3 className="font-semibold text-gray-900 dark:text-white pr-8 truncate">
        {file.name}
      </h3>

      <p className="text-sm text-gray-500 dark:text-gray-300">
        {file.size}
      </p>

      <p className="text-xs text-gray-400 dark:text-gray-400">
        {file.createdAt}
      </p>

      <button
        onClick={onDelete}
        className="
          absolute bottom-4 right-4
          p-2 rounded-lg
          text-gray-400 hover:text-red-600
          dark:text-gray-400 dark:hover:text-red-400
          hover:bg-gray-100 dark:hover:bg-gray-700
          transition-colors duration-150
          cursor-pointer
        "
      >
        <Trash />
      </button>
    </div>
  );
}