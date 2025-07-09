"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { usePathname } from "next/navigation";

export default function ClientLayout({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const checkLoginStatus = () => {
      const status = localStorage.getItem("adminLoggedIn") === "true";
      setIsLoggedIn(status);
    };

    checkLoginStatus();

    // Listen for changes across tabs
    window.addEventListener("storage", checkLoginStatus);
    return () => window.removeEventListener("storage", checkLoginStatus);
  }, [pathname]);

  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row min-h-screen">
        {isLoggedIn && (
          <aside className="w-full md:w-[15%] min-w-[200px] bg-gray-800 text-white p-4">
            <Sidebar />
          </aside>
        )}
        <main className="flex-1 p-6 bg-gray-100">{children}</main>
      </div>
    </>
  );
}
