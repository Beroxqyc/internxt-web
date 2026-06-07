import type { FileItem } from "../types/file";
import { Trash } from "lucide-react";

interface FileCardProps {
  file: FileItem;
  onDelete: (id: string, name: string) => void;
}

export default function FileTable({ files, onDelete }: { files: FileItem[]; onDelete: (id: string, name: string) => void }) {
  return (
    <div className="overflow-x-auto">
      <table
        className="
          w-full
          bg-white dark:bg-gray-800
          text-sm
          rounded-lg
          overflow-hidden
        "
      >
        {/* HEADER */}
        <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
          <tr>
            <th className="text-left p-4">Nombre</th>
            <th className="text-left p-4">Tamaño</th>
            <th className="text-left p-4">Fecha de Subida</th>
            <th className="p-4"></th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {files.map((file) => (
            <tr
              key={file.id}
              className="
                border-t border-gray-200 dark:border-gray-700
                hover:bg-gray-50 dark:hover:bg-gray-700
              "
            >
              <td className="p-4 font-medium text-gray-900 dark:text-white">
                {file.name}
              </td>

              <td className="p-4 text-gray-600 dark:text-gray-300">
                {file.size}
              </td>

              <td className="p-4 text-gray-500 dark:text-gray-400">
                {file.createdAt}
              </td>
              <td className="p-4" >
                <button
                  onClick={() => onDelete(file.id, file.name)}
                  className="p-2 text-gray-400 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                >
                  <Trash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}