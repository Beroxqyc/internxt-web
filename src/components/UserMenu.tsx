export default function UserMenu() {
  return (
    <div className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-lg overflow-hidden z-50">
      <button className="w-full px-4 py-2 hover:bg-gray-100 text-left dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white">
        Perfil
      </button>
      <button className="w-full px-4 py-2 hover:bg-gray-100 text-left dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white">
        Cerrar sesión
      </button>
    </div>
  );
}