"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { LogOut, User } from "lucide-react";

interface UserData {
  name: string;
  email: string;
}

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/auth/me");
      if (data.success) {
        setUser(data.data.user);
      }
    } catch (error) {
      console.log("Failed to fetch user");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      router.push("/auth/login");
    } catch (error) {
      console.log("Logout failed");
    }
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 print:hidden">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/resume" className="font-bold text-xl text-violet-600 flex items-center gap-2">
          AI Resume Builder
        </Link>

        {user && (
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm text-slate-600 font-medium bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
              <User size={16} />
              {user.name}
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium transition"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
