import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchResultsClient from "@/components/SearchResultsClient"; // Import the new client component

export default function ResultsPage() {
  return (
    <div className="min-h-screen bg-background text-gray-900 flex flex-col">
      <Header />
      <Suspense fallback={<div className="flex-grow container mx-auto px-6 py-10 sm:px-8 sm:py-12 space-y-10 text-center text-xl">Loading results...</div>}>
        <SearchResultsClient />
      </Suspense>
      <Footer />
    </div>
  );
}
