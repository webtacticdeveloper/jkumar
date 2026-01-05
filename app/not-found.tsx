"use client";

import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <section className="min-h-[100vh] flex flex-col items-center justify-center bg-background text-background px-6 text-center">
      {/* Decorative Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="h-[2px] w-12 bg-yellow-400/50" />
        <h1 className="text-5xl font-bold tracking-tight text-yellow-400">
          404
        </h1>
        <div className="h-[2px] w-12 bg-yellow-400/50" />
      </div>

      {/* Title + Description */}
      <h2 className="text-2xl md:text-3xl font-semibold mb-4">
        Page Not Found
      </h2>
      <p className="text-muted-foreground max-w-md mb-8 leading-relaxed">
        The page you’re looking for doesn’t exist or may have been moved.
        Please check the URL or return to the homepage.
      </p>

      {/* Buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        <button
          onClick={() => router.back()}
          className="px-6 cursor-pointer py-3 rounded-full border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-forecolor transition font-medium"
        >
          Go Back
        </button>
        <button
          onClick={() => router.push("/")}
          className="px-6 cursor-pointer py-3 rounded-full border border-yellow-400 text-white bg-yellow-400 hover:bg-yellow-400/90 hover:text-forecolor transition font-medium"
        >
          Home Page 
        </button>
      </div>
    </section>
  );
}
