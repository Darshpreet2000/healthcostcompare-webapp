import React from "react";
import { Brain, Lightbulb } from "lucide-react"; // Assuming lucide-react for icons
import GradientText from "./GradientText";
import ReactMarkdown from "react-markdown"; // Import react-markdown

interface InsightsCardProps {
  title: string;
  summary: string;
  costVariation: string;
  patientQuestions: string[];
  fullInsightsMarkdown: string; // New prop for full markdown content
  onRegenerate?: () => void;
}

const InsightsCard: React.FC<InsightsCardProps> = ({
  title,
  summary,
  costVariation,
  patientQuestions,
  fullInsightsMarkdown,
  onRegenerate,
}) => {
  return (
    <div className="bg-card rounded-2xl shadow-xl p-8 border border-blue-100 transform transition-all duration-300 ease-in-out hover:scale-[1.01]">
      <h2 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3 mb-5">
        <Brain size={28} className="text-primary" /> <GradientText text={`AI Insights:`} />
      </h2>
      {/* Render full markdown content */}
      <div className="prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl max-w-none text-gray-800 leading-relaxed mb-6">
        <ReactMarkdown>{fullInsightsMarkdown}</ReactMarkdown>
      </div>

      {/* Reintroducing specific sections for clarity and visual emphasis */}
      <div className="space-y-6 mt-8">
        <div>
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Lightbulb size={22} className="text-accent" /> Why costs vary:
          </h3>
          <p className="text-gray-700 mt-2 leading-relaxed">{costVariation}</p>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Lightbulb size={22} className="text-accent" /> Patient questions to ask your provider:
          </h3>
          <ul className="list-disc list-inside text-gray-700 mt-2 space-y-2 pl-4">
            {patientQuestions.map((question, index) => (
              <li key={index}>{question}</li>
            ))}
          </ul>
        </div>
      </div>

      <p className="text-sm text-gray-600 italic mt-6">
        Generated using Vertex AI from real CMS & BigQuery data.
      </p>
    </div>
  );
};

export default InsightsCard;
