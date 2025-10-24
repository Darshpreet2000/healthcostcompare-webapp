import Image from "next/image";
import SearchBar from "../components/SearchBar";
import TypingEffect from "../components/TypingEffect";
import Footer from "../components/Footer";

export default function Home() {
  const phrases = [
    "Compare medical costs instantly.",
    "Find affordable healthcare options.",
    "Get transparent pricing for procedures.",
    "Make informed healthcare decisions.",
  ];

  return (
    <div className="relative flex flex-col min-h-screen bg-background text-gray-900">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/hospital_image.png"
          alt="Hospital Background"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-blue-900/40 to-transparent"></div>
      </div>

      {/* Hero Section Content */}
      <main className="relative z-10 flex-grow flex items-center justify-center p-4 sm:p-8 text-white">
        <div className="flex flex-col items-center space-y-12 text-center max-w-6xl w-full mx-auto">
          <h1 className="text-7xl sm:text-8xl font-extrabold text-white leading-tight tracking-tight drop-shadow-lg">
            MediCompare AI
          </h1>
          <p className="text-3xl sm:text-4xl text-white font-bold leading-snug mt-4 drop-shadow-md">
            "Discover the real cost of your medical procedure"
          </p>
          <TypingEffect phrases={phrases} />

          {/* Search Bar */}
          <div className="w-full mt-10">
            <SearchBar />
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
