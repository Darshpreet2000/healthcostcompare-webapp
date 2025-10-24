"use client";

import { useSearchParams } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import InsightsCard from "../../components/InsightsCard";
import CompareCard from "../../components/CompareCard"; // Add CompareCard import
import GradientText from "@/components/GradientText";

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  // Dummy Data for demonstration
  const dummyInsights = {
    title: `${query || "Medical Procedure"}`,
    summary: `Based on current hospital cost data, the average ${query || "medical procedure"} cost in Boston is $18,200, with top-rated hospitals offering savings up to 25%. Below are your best options.`,
    costVariation: "Costs vary due to factors like hospital size, location, technology used, and insurance negotiations. Larger, urban hospitals often have higher overheads.",
    patientQuestions: [
      "What is the total estimated cost, including all fees?",
      "Are there any alternative procedures or treatments?",
      "What is the expected recovery time and follow-up care?",
      "Does my insurance cover this procedure at this facility?",
      "What are the credentials and experience of the medical team?",
    ],
  };

  const dummyHospitalA = {
    id: "1",
    name: "General Hospital",
    rating: 4.5,
    avgTotalPayment: 18500,
    medicarePayment: 15000,
    location: "Boston, MA",
    distance: "4.2 miles",
  };

  const dummyHospitalB = {
    id: "2",
    name: "CityCare Medical Center",
    rating: 3.9,
    avgTotalPayment: 22000,
    medicarePayment: 17800,
    location: "Cambridge, MA",
    distance: "6.8 miles",
  };

  return (
    <div className="min-h-screen bg-background text-gray-900 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-6 py-10 sm:px-8 sm:py-12 space-y-10">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 text-center leading-tight tracking-tight mb-6">
         <GradientText text={`Results for: ${query}`} />
        </h1>

        <InsightsCard {...dummyInsights} />

        <CompareCard
          hospitalA={dummyHospitalA}
          hospitalB={dummyHospitalB}
          summary="Hospital A offers ~18% lower average payment and higher quality rating — likely due to smaller facility size and lower regional overhead."
        />
      </main>
      <Footer />
    </div>
  );
}
