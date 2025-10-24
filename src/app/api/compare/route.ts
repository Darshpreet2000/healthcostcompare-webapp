import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ error: "Query parameter is missing" }, { status: 400 });
  }

  // Simulate LLM parsing to extract procedure and location
  // In a real application, this would involve a call to Vertex AI or similar LLM
  const simulatedParsedQuery = {
    procedure: "Knee Replacement", // Default or extracted from query
    location: "Boston", // Default or extracted from query
  };

  // Simulate BigQuery call for top hospitals
  // In a real application, this would involve Fivetran + BigQuery
  const simulatedHospitals = [
    {
      id: "1",
      name: "General Hospital",
      rating: 4.5,
      avgTotalPayment: 18500,
      medicarePayment: 15000,
      location: "Boston, MA",
      distance: "4.2 miles",
    },
    {
      id: "2",
      name: "CityCare Medical Center",
      rating: 3.9,
      avgTotalPayment: 22000,
      medicarePayment: 17800,
      location: "Cambridge, MA",
      distance: "6.8 miles",
    },
    { id: "3", name: "Community Health", rating: 4.1, avgTotalPayment: 19000, location: "Newton, MA" },
    { id: "4", name: "Regional Medical", rating: 4.3, avgTotalPayment: 17500, location: "Quincy, MA" },
    { id: "5", name: "Elite Surgery Center", rating: 4.7, avgTotalPayment: 16800, location: "Brookline, MA" },
    { id: "6", name: "Northside Hospital", rating: 3.7, avgTotalPayment: 20500, location: "Salem, MA" },
  ];

  // Simulate AI-generated insights
  // In a real application, this would involve a call to Vertex AI
  const simulatedInsights = {
    title: `AI Insights for ${simulatedParsedQuery.procedure} in ${simulatedParsedQuery.location}`,
    summary: `Based on current hospital cost data, the average ${simulatedParsedQuery.procedure} cost in ${simulatedParsedQuery.location} is $18,200, with top-rated hospitals offering savings up to 25%. Below are your best options.`,
    costVariation: "Costs vary due to factors like hospital size, location, technology used, and insurance negotiations. Larger, urban hospitals often have higher overheads.",
    patientQuestions: [
      "What is the total estimated cost, including all fees?",
      "Are there any alternative procedures or treatments?",
      "What is the expected recovery time and follow-up care?",
      "Does my insurance cover this procedure at this facility?",
      "What are the credentials and experience of the medical team?",
    ],
  };

  const compareSummary = `Hospital ${simulatedHospitals[0].name} offers ~18% lower average payment and higher quality rating — likely due to smaller facility size and lower regional overhead.`;

  return NextResponse.json({
    query: query,
    parsedQuery: simulatedParsedQuery,
    insights: simulatedInsights,
    hospitals: simulatedHospitals,
    compareSummary: compareSummary,
  });
}
