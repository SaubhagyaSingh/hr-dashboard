"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import ImageCarousel from "@/components/ImageCarousel";

const images = [
  "/assets/banner/img1.png",
  "/assets/banner/img2.png",
  "/assets/banner/img3.png",
];

export default function Home() {
  return (
    <div className="bg-white text-zinc-900 min-h-screen">
      <Navbar />

      <main className="w-full px-4 md:px-6 py-36 flex flex-col md:flex-row items-center justify-center gap-12">
        {/* Carousel Left */}
        <div className="w-full md:w-1/2">
          <ImageCarousel images={images} />
        </div>

        {/* Text Right */}
        <div className="w-full md:w-1/2 max-w-xl space-y-6 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-peach">
            Welcome to Core HR Platform
          </h1>
          <p className="text-gray-warm text-base leading-relaxed">
            Streamline your company’s human resource management with intuitive dashboards, employee tracking,
            and actionable analytics designed to make your operations smoother, more efficient, and more
            insightful.
          </p>

          <div className="text-black flex sm:flex-row items-center sm:justify-start gap-4 p-4 m-4">
            <Link
              href="/login"
              className="px-5 py-2 rounded-md bg-accent-rose text-black border-2 border-black font-medium hover:bg-gray-300 transition"
            >
              Sign Up
            </Link>
            <Link
              href="/login"
              className="px-5 py-2 rounded-md bg-accent-rose text-black border-2 border-black font-medium hover:bg-gray-300 transition"
            >
              Login
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
