"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function Header() {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = () => {
      const loggedIn =
        Cookies.get("adminLoggedIn") === "true" ||
        localStorage.getItem("adminLoggedIn") === "true";
      setIsLoggedIn(loggedIn);
    };

    checkLogin();
    window.addEventListener("storage", checkLogin);
    return () => window.removeEventListener("storage", checkLogin);
  }, []);

  const handleLogout = () => {
    Cookies.remove("adminLoggedIn");
    localStorage.setItem("adminLoggedIn", false);
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <header className="bg-blue-800 text-white px-6 py-4 flex justify-between items-center shadow">
      <h1
        className="text-2xl font-bold cursor-pointer"
        onClick={() => router.push("/dashboard")}
      >
        LMS Admin Panel
      </h1>

      <div className="relative">
        {!isLoggedIn ? (
          <button
            className="bg-blue-700 px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => router.push("/login")}
          >
            Login
          </button>
        ) : (
          <>
            <button
              className="bg-blue-700 px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => setShowMenu(!showMenu)}
            >
              Admin Details ⏷
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white text-gray-800 rounded shadow z-10">
                <div className="p-4 border-b border-gray-300">
                  <p className="font-semibold">Admin</p>
                  <p className="text-sm text-gray-500">admin@example.com</p>
                </div>

                <button
                  onClick={() => {
                    setShowMenu(false);
                    router.push("/change-password");
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Change Password
                </button>

                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-red-100 text-red-600"
                >
                  Logout
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </header>
  );
}
