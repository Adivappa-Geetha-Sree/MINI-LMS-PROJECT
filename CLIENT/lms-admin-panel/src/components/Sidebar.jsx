"use client";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Sidebar() {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const menuItems = [
    { title: "Courses", base: "/courses" },
    { title: "Users", base: "/users" },
    { title: "Teachers", base: "/teachers" },
    { title: "About", base: "/about" },
  ];

  return (
    <nav className="space-y-4 text-white">
      {/* Dashboard */}
      <Link
        href="/dashboard"
        className="block px-2 py-2 rounded hover:bg-blue-700 font-semibold"
      >
        📊 Dashboard
      </Link>

      {/* Dropdown Menus */}
      {menuItems.map((item) => (
        <div key={item.title} className="bg-blue-700 rounded">
          <button
            onClick={() => toggleMenu(item.title)}
            className="w-full flex items-center justify-between px-4 py-2 hover:bg-blue-600 font-semibold"
          >
            <span>{item.title}</span>
            <span
              className={`transition-transform ${
                openMenu === item.title ? "rotate-180" : ""
              }`}
            >
              {openMenu === item.title ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </span>
          </button>

          {openMenu === item.title && (
            <div className="bg-blue-800 text-sm space-y-1 px-6 py-2">
              {/* Only show Add link if not Users */}
              {item.title !== "Users" && (
                <Link href={`${item.base}/add`} className="block hover:underline">
                  ➕ Add {item.title}
                </Link>
              )}
              <Link href={`${item.base}/view`} className="block hover:underline">
                👁️ View {item.title}
              </Link>
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}
