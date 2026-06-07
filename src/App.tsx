import { useState } from 'react'
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import FileCard from "./components/FileCard";
import FileTable from "./components/FileTable";
import { files } from "./data/files";
import type { FileItem } from './types/file';

type ViewMode = "grid" | "list";
type SortField = "name" | "date" | "size";

function App() {
  const [view, setView] = useState<ViewMode>("grid");
  const [openSidebar, setOpenSidebar] = useState(false);
  const [fileList, setFileList] = useState<FileItem[]>(files);
  const [searchQuery, setSearchQuery] = useState("");

  const [sortBy, setSortBy] = useState<SortField>("name");

  const handleUploadFile = (selectedFile: File) => {
    const formatBytes = (bytes: number): string => {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };
    const formattedDate = new Date().toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    const newFile: FileItem = {
      id: crypto.randomUUID(),
      name: selectedFile.name,
      size: formatBytes(selectedFile.size),
      createdAt: formattedDate,
      type: selectedFile.type,
    };
    setFileList((preFiles) => [newFile, ...preFiles]);
  };

  const handleDeleteFile = (id: string, name: string) => {
    const confirmDelete = window.confirm(`¿Estás seguro de que deseas eliminar el archivo "${name}"?`);
    if (confirmDelete) {
      setFileList((preFiles) => preFiles.filter((file) => file.id !== id));
    }
  };

  const filteredFiles = fileList.filter(file => 
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getProcessedFiles = () => {
    // Primero filtramos por el buscador
    const filtered = fileList.filter(file => 
      file.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const parseSizeToBytes = (sizeStr: string): number => {
      if (sizeStr === "--" || !sizeStr) return 0;
      const num = parseFloat(sizeStr);
      if (sizeStr.includes("GB")) return num * 1024 * 1024 * 1024;
      if (sizeStr.includes("MB")) return num * 1024 * 1024;
      if (sizeStr.includes("KB")) return num * 1024;
      return num; 
    };

    return [...filtered].sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      
      if (sortBy === "date") {
        const dateA = new Date(a.createdAt).getTime() || 0;
        const dateB = new Date(b.createdAt).getTime() || 0;
        return dateA- dateB;
      }
      
      if (sortBy === "size") {
        return parseSizeToBytes(a.size) - parseSizeToBytes(b.size);
      }
      
      return 0;
    });
  };

  const processedFiles = getProcessedFiles();

  return (
    <div className="flex h-screen w-screen bg-gray-100">

      {openSidebar && (
        <div
          className="fixed inset-0 bg-black-40 z-40 md:hidden"
          onClick={() => setOpenSidebar(false)}
        />
      )}

      <div
        className={`
          fixed md:static z-50 h-full
          transform transition-transform duration-300
          ${openSidebar ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <Sidebar />
      </div>


      <div className="flex flex-col flex-1 min-w-0">
        <Header 
          view={view}
          setView={setView}
          onMenuClick={() => setOpenSidebar(!openSidebar)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onUpload={handleUploadFile}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        <main className="flex-1 p-4 min-w-0 sm:p-6 overflow-auto bg-gray-100 dark:bg-gray-900">
          {filteredFiles.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <p className="text-lg font-medium">No se encontraron archivos</p>
            </div>
          ) : view === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {processedFiles.map((file) => (
                <FileCard 
                  key={file.id} 
                  file={file} 
                  onDelete={() => handleDeleteFile(file.id, file.name)} 
                />
              ))}
            </div>
          ) : (
            <FileTable files={processedFiles} onDelete={handleDeleteFile} />
          )
          }
        </main>
      </div>
    </div>
  )
}

export default App
