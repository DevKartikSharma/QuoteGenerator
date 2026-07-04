import Link from "next/link";
export default function Home() {
  
  return (
    <section className="min-h-screen flex items-center justify-center bg-black text-white px-6">
  <div className="max-w-5xl text-center">

    <p className="inline-block mb-6 rounded-full border border-white/20 bg-white/5 px-5 py-2 text-sm tracking-[0.25em] uppercase text-gray-400 backdrop-blur">
      ✦ Daily Inspiration
    </p>

    <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-tight tracking-tight">
      <span className="text-white">Speak Less.</span>
      <br />
      <span className="bg-linear-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
        Inspire More.
      </span>
    </h1>

    <p className="mt-8 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
      Thousands of timeless quotes from the world's greatest minds.
      Discover motivation, wisdom, and inspiration with a single click.
    </p>

    <div className="mt-10">
      <Link href={'/quote'} className="rounded-full border border-white bg-white px-8 py-4 text-lg font-semibold text-black transition-all duration-300 hover:scale-105 hover:bg-gray-200 hover:shadow-[0_0_35px_rgba(255,255,255,0.35)]">
        Generate Quote →
      </Link>
    </div>

  </div>
</section>
  );
}
