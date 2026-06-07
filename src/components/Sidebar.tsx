import {
  House,
  FolderOpen,
  Users,
  Trash2,
  Settings,
  type LucideIcon,
} from "lucide-react";

type MenuItem = {
  icon: LucideIcon;
  label: string;
};

const menuItems: MenuItem[] = [
  {
    icon: House,
    label: "Inicio",
  },
  {
    icon: FolderOpen,
    label: "Mi Drive",
  },
  {
    icon: Users,
    label: "Compartidos",
  },
  {
    icon: Trash2,
    label: "Papelera",
  },
  {
    icon: Settings,
    label: "Configuración",
  },
];

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-gray-900 text-white p-5 dark:bg-black dark:text-white">
      <h1 className="text-2xl font-bold mb-8 dark:text-blue-700">
        Internxt
      </h1>

      <nav className="space-y-2">
        {menuItems.map(({ icon: Icon, label }) => (
          <button
            key={label}
            className="
              flex items-center
              w-full
              gap-3
              px-4
              py-3
              rounded-lg
              hover:bg-gray-800
              transition-colors
              text-left
            "
          >
            <Icon size={20} />
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}