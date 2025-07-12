"use client";

import Image from "next/image";
import Ripple from "@/components/ripple/ripple";

export function Hero() {
  return (
    <section className="relative min-h-screen py-20 flex items-center px-4">
      <div className="absolute inset-0 z-10">
        <Image
          src="https://cdn.pixabay.com/photo/2022/03/20/15/40/nature-7081138_1280.jpg"
          alt="Hero background"
          fill
          className="object-cover opacity-30"
          priority
          style={{
            transform: "translateZ(0)",
            backfaceVisibility: "hidden",
            perspective: "1000px",
            willChange: "transform",
          }}
        />
        <div className="absolute inset-0" style={{ height: "100vh" }}>
          <Ripple />
        </div>
      </div>
      <div className="relative z-20 max-w-3xl mx-auto ml-4 md:ml-20">
        <h2 className="text-2xl mb-4">Creative Web Solutions</h2>
        <h1 className="text-5xl font-bold pb-2 mb-6 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-500 text-transparent bg-clip-text">
          Bringing Your Vision to Life
        </h1>
        <p className="text-muted-foreground mb-8 max-w-2xl">
          We support your business growth with cutting-edge technology and creative design that transforms your ideas into exceptional digital experiences.
        </p>
        <button className="bg-pink-500 text-white px-8 py-3 rounded-full hover:bg-pink-600 transition-colors">
          GET STARTED
        </button>
      </div>
    </section>
  );
}