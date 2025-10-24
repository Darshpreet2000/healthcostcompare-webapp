"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header: React.FC = () => {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-20 w-full bg-card/90 backdrop-blur-md shadow-lg">
      <div className="container mx-auto py-4 px-6 flex items-center justify-between">
        <Link href="/" className="text-3xl font-extrabold text-primary tracking-tight">
          MediCompare AI
        </Link>
        <button
          onClick={() => router.push("/")}
          className="bg-primary text-white px-5 py-2.5 rounded-full hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors duration-300 font-semibold shadow-md"
        >
          New Search
        </button>
      </div>
    </header>
  );
};

export default Header;
