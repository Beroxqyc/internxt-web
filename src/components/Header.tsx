import { useState, useEffect } from "react";
import UserMenu from "./UserMenu";
import {
  Upload,
  LayoutGrid,
  List,
  ArrowUpDown,
  Sun,
  Moon
} from "lucide-react";

type ViewMode = "grid" | "list";

interface Props {
  view: ViewMode;
  setView: (v: ViewMode) => void;
  onMenuClick: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onUpload: (file: File) => void;
  sortBy: "name" | "date" | "size";
  setSortBy: (field: "name" | "date" | "size") => void;
}



export default function Header({ view, setView, onMenuClick, searchQuery, setSearchQuery, onUpload, sortBy, setSortBy }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [sortMenuOpen, setSortMenuOpen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
      e.target.value = "";
    }
  };

  useEffect(() => {
      if (dark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }, [dark]);

  return (
    <header className="dark:bg-gray-900 dark:border-gray-700 h-auto sm:h-16 bg-white border-b 
    flex flex-wrap sm:flex-nowrap items-center gap-3
    sm:gap-0 justify-between px-4 sm:px-6 py-3 sm:py-0" >
      <div>
        <button
        onClick={onMenuClick}
        className="md:hidden p-2 text-2xl
            text-gray-700 dark:text-gray-200"
      >
        ☰
      </button>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-72 md:w-96
            px-3 py-2
            border rounded-lg
            focus:ring-2 focus:ring-blue-500
            min-w-0
            dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
          placeholder="Buscar archivos..."
        />
      </div>
      

      <div className="flex items-center gap-3">
        
        <label 
        htmlFor="upload-input"
        className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-sm">
          <Upload />
        </label>
        <input 
          id="upload-input" 
          type="file" 
          multiple
          onChange={handleFileChange} 
          className="hidden" 
        />

        <button
          onClick={() => setView(view === "grid" ? "list" : "grid")}
          className="border px-3 py-2 rounded-lg hover:bg-gray-100
          dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
        >
          {view === "grid" ? (<List />) : (<LayoutGrid />)}
        </button>

        <div className="relative">
      <button
        onClick={() => setSortMenuOpen(!sortMenuOpen)}
        className={`border px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors
        dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 cursor-pointer
        ${sortMenuOpen ? "bg-gray-100 dark:bg-gray-700" : ""}`}
        title="Ordenar archivos"
      >
        <ArrowUpDown className="w-5 h-5" />
      </button>

      {/* Menú desplegable de ordenación */}
      {sortMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden z-50">
          <div className="px-3 py-1.5 text-xs font-semibold text-gray-400 border-b border-gray-100 dark:border-gray-700">
            Ordenar por:
          </div>
          <button
            onClick={() => { setSortBy("name"); setSortMenuOpen(false); }}
            className={`w-full px-4 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white flex justify-between ${sortBy === "name" ? "font-bold text-blue-600 dark:text-blue-400" : ""}`}
          >
            Nombre {sortBy === "name" && "✓"}
          </button>
          <button
            onClick={() => { setSortBy("date"); setSortMenuOpen(false); }}
            className={`w-full px-4 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white flex justify-between ${sortBy === "date" ? "font-bold text-blue-600 dark:text-blue-400" : ""}`}
          >
            Fecha {sortBy === "date" && "✓"}
          </button>
          <button
            onClick={() => { setSortBy("size"); setSortMenuOpen(false); }}
            className={`w-full px-4 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white flex justify-between ${sortBy === "size" ? "font-bold text-blue-600 dark:text-blue-400" : ""}`}
          >
            Tamaño {sortBy === "size" && "✓"}
          </button>
        </div>
      )}
      </div>

        <button
          onClick={() => setDark(!dark)} 
          className="border px-3 py-2 rounded-lg hover:bg-gray-100
          dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700">
            {dark ? (<Sun />) : (<Moon />)}
        </button>

        {/* Avatar */}
        <div className="relative">
          <div
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center cursor-pointer"
          >
            AW
          </div>

          {menuOpen && <UserMenu />}
        </div>
      </div>
    </header>
  );
}