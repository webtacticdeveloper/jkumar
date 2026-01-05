"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error("APP ERROR:", error);
  }, [error]);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-background text-white px-6 text-center">
      {/* Decorative Title Block */}
      <div className="flex items-center gap-4 mb-6">
        <div className="h-[2px] w-12 bg-yellow-400/50" />
        <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight text-yellow-400 drop-shadow-md">
          Error
        </h1>
        <div className="h-[2px] w-12 bg-yellow-400/50" />
      </div>

      {/* Headline */}
      <h2 className="text-2xl md:text-3xl font-semibold mb-3">
        Something Went Wrong
      </h2>

      {/* Description */}
      <p className="text-muted-foreground max-w-lg mb-10 leading-relaxed">
        An unexpected error occurred while loading this page.  
        Don’t worry — you can retry or return to the homepage.
      </p>

      {/* Buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        {/* Try Again */}
        <button
          onClick={() => reset()}
          className="
            px-6 py-3 rounded-full cursor-pointer
            bg-yellow-400 text-black
            border border-yellow-400
            hover:bg-yellow-300
            transition font-medium
          "
        >
          Try Again
        </button>

        {/* Home */}
        <Link
          href="/"
          className="
            px-6 py-3 rounded-full cursor-pointer
            border border-yellow-400 text-yellow-400
            hover:bg-yellow-400 hover:text-black
            transition font-medium
          "
        >
          Go Home
        </Link>
      </div>
    </section>
  );
}
