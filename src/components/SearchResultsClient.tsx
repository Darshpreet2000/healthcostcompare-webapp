"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import InsightsCard from "@/components/InsightsCard";
import CompareCard from "@/components/CompareCard";
import HospitalGrid from "@/components/HospitalGrid";
import GradientText from "@/components/GradientText";
import { Loader2 } from "lucide-react"; // For spinner icon

interface HospitalData {
  id: string;
  name: string;
  rating: number;
  avgTotalPayment: number;
  medicarePayment: number;
  location: string;
  distance_miles: number | null;
}

interface ApiResponse {
  query: string;
  insights: string;
  why_costs_vary: string;
  questions_to_ask: string[];
  hospital_comparison: HospitalData[];
}

const loadingMessages = [
  "Fetching relevant medical data...",
  "Analyzing hospital cost variations...",
  "Generating AI-powered insights...",
  "Compiling patient questions...",
  "Comparing top medical facilities...",
];

export default function SearchResultsClient() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const [apiData, setApiData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentLoadingMessage, setCurrentLoadingMessage] = useState(loadingMessages[0]);

  useEffect(() => {
    let messageInterval: NodeJS.Timeout;

    const fetchData = async () => {
      if (!query) {
        setError("No query provided.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      setCurrentLoadingMessage(loadingMessages[0]);

      // Cycle through loading messages
      messageInterval = setInterval(() => {
        setCurrentLoadingMessage((prevMessage) => {
          const currentIndex = loadingMessages.indexOf(prevMessage);
          const nextIndex = (currentIndex + 1) % loadingMessages.length;
          return loadingMessages[nextIndex];
        });
      }, 3000); // Change message every 3 seconds

      try {
        const response = await fetch(`/api/search?query=${query}`); // Use the proxy route
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }
        const data: ApiResponse = await response.json();
        setApiData(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
        clearInterval(messageInterval); // Stop cycling messages
      }
    };

    fetchData();

    return () => {
      clearInterval(messageInterval); // Cleanup interval on unmount
    };
  }, [query]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-gray-900 flex flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-xl text-center">{currentLoadingMessage}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background text-gray-900 flex flex-col items-center justify-center">
        <p className="text-xl text-red-600">Error: {error}</p>
        <p className="text-lg">Please try again with a valid query.</p>
      </div>
    );
  }

  if (!apiData) {
    return (
      <div className="min-h-screen bg-background text-gray-900 flex flex-col items-center justify-center">
        <p className="text-xl">No data found for "{query}".</p>
      </div>
    );
  }

  // Extract summary from insights markdown (first paragraph)
  const insightsSummary = apiData.insights.split("\n\n")[0] || "";

  // Prepare data for InsightsCard
  const insightsCardProps = {
    title: `Results for: ${apiData.query}`,
    summary: insightsSummary,
    costVariation: apiData.why_costs_vary,
    patientQuestions: apiData.questions_to_ask,
    fullInsightsMarkdown: apiData.insights, // Pass the full markdown
  };

  // Prepare data for HospitalGrid
  const hospitalsForGrid = apiData.hospital_comparison.map((hospital) => ({
    id: hospital.name, // Using name as ID for now
    name: hospital.name,
    rating: hospital.rating,
    avgTotalPayment: hospital.avgTotalPayment,
    medicarePayment: hospital.medicarePayment,
    location: hospital.location,
    distance_miles: hospital.distance_miles,
  }));

  // For CompareCard, we'll take the first two hospitals from the comparison if available
  const hospitalA = hospitalsForGrid[0] || null;
  const hospitalB = hospitalsForGrid[1] || null;

  return (
    <main className="flex-grow container mx-auto px-6 py-10 sm:px-8 sm:py-12 space-y-10">
      <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 text-center leading-tight tracking-tight mb-6">
        <GradientText text={`Results for: ${apiData.query}`} />
      </h1>

      <InsightsCard {...insightsCardProps} />

      {hospitalA && hospitalB && (
        <CompareCard
          hospitalA={hospitalA}
          hospitalB={hospitalB}
          summary="Comparing the top two hospitals based on your search." // This summary could be more dynamic
        />
      )}

      {hospitalsForGrid.length > 0 && (
        <HospitalGrid hospitals={hospitalsForGrid} />
      )}
    </main>
  );
}
